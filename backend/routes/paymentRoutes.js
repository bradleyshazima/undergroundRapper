import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// ── Nodemailer Transporter ──
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Verify Payment & Send Email ──
router.post('/verify-payment', async (req, res) => {
  const { reference, email, product, shippingDetails } = req.body;

// ── Step 1: Verify with Paystack (hard fail if this fails) ──
  let paystackData;
  try {
    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );
    paystackData = paystackRes.data;
  } catch (err) {
    console.error('❌ Paystack API error:', err.message);
    return res.status(502).json({ success: false, message: 'Could not reach Paystack to verify payment.' });
  }

  if (!paystackData.status || paystackData.data.status !== 'success') {
    console.warn('⚠️ Paystack says payment not successful:', paystackData.data?.status);
    return res.status(400).json({ success: false, message: 'Payment not confirmed by Paystack.' });
  }

  const paidAmount = paystackData.data.amount / 100;
  if (paidAmount < product.price) {
    console.warn(`⚠️ Amount mismatch: paid ${paidAmount}, expected ${product.price}`);
    return res.status(400).json({ success: false, message: 'Payment amount does not match product price.' });
  }

  // ── Step 2: Save order to Supabase (hard fail — must record the sale) ──
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

  // ── Step 3: Send email (soft fail — don't block success if email breaks) ──
  let emailSent = true;
  try {
    let emailSubject = `Order Confirmation: ${product.title}`;
    let emailHtml = `
      <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 20px;">
        <h2 style="color: #d24700;">THANK YOU FOR YOUR ORDER!</h2>
        <p>Your payment for <strong>${product.title}</strong> (KES ${product.price}) was successful.</p>
        <p><strong>Transaction Reference:</strong> ${reference}</p>
        <hr style="border-color: #333;" />
    `;

    if (product.type === 'digital') {
      emailHtml += `
        <h3>Digital Download Instructions</h3>
        <p>You can access your digital download vault directly anytime using your email at our store.</p>
        <p><a href="${process.env.FRONTEND_URL}/download" style="background: #d24700; color: #fff; padding: 10px 20px; text-decoration: none; font-weight: bold;">ACCESS DIGITAL VAULT</a></p>
      `;
    } else {
      emailHtml += `
        <h3>Delivery Details</h3>
        <p><strong>County:</strong> ${shippingDetails?.county}</p>
        <p><strong>Constituency:</strong> ${shippingDetails?.constituency}</p>
        <p><strong>Street:</strong> ${shippingDetails?.street}</p>
        <p><strong>Estate:</strong> ${shippingDetails?.estate}</p>
        <p><strong>Landmark:</strong> ${shippingDetails?.description}</p>
        <p style="margin-top: 15px;">Your item will be packaged and delivered within 3 working days.</p>
      `;
    }
    emailHtml += `<hr style="border-color: #333;" /><p style="font-size: 12px; color: #888;">Questions? Contact itsacense@gmail.com</p></div>`;

    await transporter.sendMail({
      from: `"Acense Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });
    console.log(`📧 Confirmation email sent to ${email}`);
  } catch (err) {
    // Email failed but order IS saved — just log it, don't fail the response
    emailSent = false;
    console.error('⚠️ Email send failed (order still saved):', err.message);
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