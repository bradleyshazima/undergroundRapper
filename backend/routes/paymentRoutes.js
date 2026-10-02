import express from 'express';
import axios from 'axios';
import { supabase } from '../config/supabase.js';
import { sendOrderConfirmation } from '../services/emailService.js';

const router = express.Router();


// ── Verify Payment & Send Email ──
router.post('/verify-payment', async (req, res) => {
  const { reference, email, product, shippingDetails } = req.body;

// ── Step 1: Verify with Paystack (hard fail if this fails) ──
  let paystackData;
  let lastErr;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      console.log(`🔄 [PAYSTACK] Verification attempt ${attempt}/3 for reference: ${reference}`);
      const paystackRes = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
          timeout: 10000, // 10 second timeout per attempt
        }
      );
      paystackData = paystackRes.data;
      console.log(`✅ [PAYSTACK] Got response on attempt ${attempt}`);
      break; // success, stop retrying
    } catch (err) {
      lastErr = err;
      console.error(`❌ [PAYSTACK] Attempt ${attempt} failed: ${err.message}`);
      if (attempt < 3) await new Promise(r => setTimeout(r, 1500 * attempt)); // wait 1.5s, then 3s
    }
  }

  if (!paystackData) {
    console.error('❌ [PAYSTACK] All 3 attempts failed. Last error:', lastErr?.message);
    return res.status(502).json({ success: false, message: 'Could not reach Paystack to verify payment.' });
  }

  console.log('📦 [PAYSTACK] Raw response status:', paystackData.data?.status);

  if (!paystackData.status || paystackData.data?.status !== 'success') {
    console.warn('⚠️ [PAYSTACK] Payment not successful:', paystackData.data?.status);
    return res.status(400).json({ success: false, message: 'Payment not confirmed by Paystack.' });
  }

  console.log('✅ [PAYSTACK] Payment confirmed as successful');
  // ── Step 2: Save order to Supabase ──
  try {
    const { error: dbError } = await supabase.from('orders').insert([{
      email,
      product_id: product.id,
      product_title: product.title,
      amount: product.price,
      paystack_reference: reference,
      status: 'success',
      shipping: product.type === 'physical' ? shippingDetails : null,
    }]);
    if (dbError) throw dbError;
    console.log(`✅ Order saved for ${email} — ${product.title}`);
  } catch (err) {
    console.error('❌ Supabase order save failed:', err.message);
    return res.status(500).json({ success: false, message: 'Payment received but order could not be recorded. Contact support with reference: ' + reference });
  }
// ── Step 3: Send email (soft fail — order is already saved) ──
let emailSent = true;
try {
  await sendOrderConfirmation({ email, product, reference, shippingDetails });
} catch (err) {
  emailSent = false;
  console.error('⚠️  [EMAIL] Send failed (order still saved):', err.message);
}
  return res.status(200).json({
    success: true,
    message: emailSent
      ? 'Payment verified and confirmation email sent.'
      : 'Payment verified and order saved. Email could not be sent — contact support if needed.',
  });
});

// ── Fetch purchased files by email ──
router.post('/get-files', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email required' });

  try {
    // All successful orders for this email, latest first
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('id, product_id, product_title, created_at')
      .eq('email', email)
      .eq('status', 'success')
      .order('created_at', { ascending: false });

    if (ordersError) throw ordersError;
    if (!orders || orders.length === 0) {
      return res.status(404).json({ success: false, message: 'No purchases found for this email.' });
    }

    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        // Check product type — skip physical orders
        const { data: product } = await supabase
          .from('products')
          .select('type, file_url')
          .eq('id', order.product_id)
          .single();

        if (product?.type !== 'digital') return null;

        // Get digital files — deliberately exclude file_url from select
        const { data: allFiles } = await supabase
          .from('digital_files')
          .select('id, name, size, type, track_number')
          .eq('product_id', order.product_id)
          .order('track_number', { ascending: true });

        const zip = allFiles?.find(f => f.type === 'zip') || null;
        const tracks = allFiles?.filter(f => f.type !== 'zip') || [];

        // Build file keys for download log lookup
        const isStandaloneSingle = product?.file_url && tracks.length === 0;
        const fileKeys = [
          ...tracks.map(t => `track:${t.id}`),
          ...(zip ? [`zip:${zip.id}`] : []),
          ...(isStandaloneSingle ? [`product:${order.product_id}`] : []),
        ];

        // Get download counts (batch)
        const { data: logs } = fileKeys.length > 0
          ? await supabase
              .from('download_logs')
              .select('file_key, download_count')
              .eq('email', email)
              .in('file_key', fileKeys)
          : { data: [] };

        const countMap = {};
        logs?.forEach(l => { countMap[l.file_key] = l.download_count; });

        return {
          order_id: order.id,
          product_id: order.product_id,
          product_title: order.product_title,
          created_at: order.created_at,
          files: tracks.map(t => ({
            id: t.id,
            name: t.name,
            size: t.size,
            track_number: t.track_number,
            file_key: `track:${t.id}`,
            downloads_remaining: Math.max(0, 2 - (countMap[`track:${t.id}`] || 0)),
          })),
          zip: zip ? {
            id: zip.id,
            name: zip.name,
            file_key: `zip:${zip.id}`,
            downloads_remaining: Math.max(0, 2 - (countMap[`zip:${zip.id}`] || 0)),
          } : null,
          single: isStandaloneSingle ? {
            file_key: `product:${order.product_id}`,
            downloads_remaining: Math.max(0, 2 - (countMap[`product:${order.product_id}`] || 0)),
          } : null,
        };
      })
    );

    const digitalOrders = enrichedOrders.filter(Boolean);
    if (digitalOrders.length === 0) {
      return res.status(404).json({ success: false, message: 'No digital purchases found for this email.' });
    }

    console.log(`📂 [VAULT] ${email} fetched ${digitalOrders.length} order(s)`);
    const downloadUrl = fileUrl.includes('cloudinary.com')
      ? fileUrl.replace('/upload/', '/upload/fl_attachment/')
      : fileUrl;

    return res.status(200).json({ success: true, url: downloadUrl, downloads_remaining: remaining });
  } catch (err) {
    console.error('Get files error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});


// ── Gated Download Request (validates + counts + returns URL) ──
router.post('/request-download', async (req, res) => {
  const { email, file_key, order_id } = req.body;
  if (!email || !file_key || !order_id) {
    return res.status(400).json({ success: false, message: 'Missing required fields.' });
  }

  try {
    // 1. Confirm order belongs to this email
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('id, product_id')
      .eq('id', order_id)
      .eq('email', email)
      .eq('status', 'success')
      .single();

    if (orderError || !order) {
      console.warn(`⛔ [DOWNLOAD] Unauthorized: ${email} → order ${order_id}`);
      return res.status(403).json({ success: false, message: 'No valid order found for this email.' });
    }

    // 2. Check download count
    const { data: log } = await supabase
      .from('download_logs')
      .select('download_count')
      .eq('email', email)
      .eq('file_key', file_key)
      .maybeSingle();

    const currentCount = log?.download_count || 0;
    if (currentCount >= 2) {
      console.warn(`🚫 [DOWNLOAD] Limit hit: ${email} → ${file_key}`);
      return res.status(403).json({ success: false, message: 'Download limit reached (max 2 per file).' });
    }

    // 3. Resolve file URL — also verifies file belongs to this order's product
    let fileUrl = null;
    const [type, rawId] = file_key.split(':');
    const id = parseInt(rawId);

    if (type === 'track' || type === 'zip') {
      const { data: file } = await supabase
        .from('digital_files')
        .select('file_url, product_id')
        .eq('id', id)
        .single();

      if (file?.product_id !== order.product_id) {
        return res.status(403).json({ success: false, message: 'File does not belong to this order.' });
      }
      fileUrl = file?.file_url;
    } else if (type === 'product') {
      if (id !== order.product_id) {
        return res.status(403).json({ success: false, message: 'File does not belong to this order.' });
      }
      const { data: product } = await supabase
        .from('products')
        .select('file_url')
        .eq('id', id)
        .single();
      fileUrl = product?.file_url;
    }

    if (!fileUrl) {
      return res.status(404).json({ success: false, message: 'File not found.' });
    }

    // 4. Upsert download count
    await supabase
      .from('download_logs')
      .upsert(
        { email, file_key, download_count: currentCount + 1, last_downloaded_at: new Date().toISOString() },
        { onConflict: 'email,file_key' }
      );

    const remaining = 2 - (currentCount + 1);
    console.log(`📥 [DOWNLOAD] ${email} | ${file_key} | ${currentCount + 1}/2 used | ${remaining} remaining`);

    const downloadUrl = fileUrl.replace('/upload/', '/upload/fl_attachment/');
    return res.status(200).json({ success: true, url: downloadUrl, downloads_remaining: remaining });
  } catch (err) {
    console.error('Download request error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
});


// ADD this new route:
router.get('/proxy-download', async (req, res) => {
  const { url, name } = req.query;
  if (!url) return res.status(400).send('URL required');

  const decodedUrl = decodeURIComponent(url);

  // Safety check — only proxy Cloudinary URLs
  if (!decodedUrl.includes('cloudinary.com')) {
    return res.status(400).send('Invalid source URL');
  }

  try {
    const fileRes = await fetch(decodedUrl);
    if (!fileRes.ok) throw new Error(`Cloudinary returned ${fileRes.status}`);

    const contentType = fileRes.headers.get('content-type') || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${decodeURIComponent(name || 'download')}"`);

    const buffer = await fileRes.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('[proxy-download]', err.message);
    res.status(500).send('Proxy failed');
  }
});


export default router;