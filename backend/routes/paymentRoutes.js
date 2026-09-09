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
    // Find most recent successful order for this email
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('product_id, product_title')
      .eq('email', email)
      .eq('status', 'success')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (orderError || !order) {
      return res.status(404).json({ success: false, message: 'No successful order found for this email.' });
    }

    const { data: allFiles, error: filesError } = await supabase
      .from('digital_files')
      .select('*')
      .eq('product_id', order.product_id)
      .order('track_number', { ascending: true });

    if (filesError) throw filesError;

    const zip = allFiles?.find(f => f.type === 'zip');
    const files = allFiles?.filter(f => f.type !== 'zip') || [];

    return res.status(200).json({
      success: true,
      product: { id: order.product_id, title: order.product_title },
      zipUrl: zip?.file_url || null,
      files,
    });
  } catch (err) {
    console.error('Get files error:', err.message);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;