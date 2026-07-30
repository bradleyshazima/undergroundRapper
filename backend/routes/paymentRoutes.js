import express from 'express';
import axios from 'axios';
import nodemailer from 'nodemailer';

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

  try {
    // 1. Verify transaction with Paystack
    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = paystackRes.data;

    if (!data.status || data.data.status !== 'success') {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    // Optional: Verify amount matches expected product price (in KES subunits/cents)
    const paidAmount = data.data.amount / 100;
    if (paidAmount < product.price) {
      return res.status(400).json({ success: false, message: 'Invalid payment amount' });
    }

    // 2. Build Email content based on product type
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
        <p><strong>County:</strong> ${shippingDetails.county}</p>
        <p><strong>Constituency:</strong> ${shippingDetails.constituency}</p>
        <p><strong>Street:</strong> ${shippingDetails.street}</p>
        <p><strong>Estate:</strong> ${shippingDetails.estate}</p>
        <p><strong>Landmark / Description:</strong> ${shippingDetails.description}</p>
        <p style="margin-top: 15px;">Your item will be packaged and delivered within 3 working days.</p>
      `;
    }

    emailHtml += `
        <hr style="border-color: #333;" />
        <p style="font-size: 12px; color: #888;">If you have any questions, reply to this email or contact support at itsacense@gmail.com</p>
      </div>
    `;

    // 3. Send Email
    await transporter.sendMail({
      from: `"Acense Store" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });

    return res.status(200).json({
      success: true,
      message: 'Payment verified and confirmation email sent.',
    });

  } catch (error) {
    console.error('Payment Verification Error:', error.response?.data || error.message);
    return res.status(500).json({ success: false, message: 'Server error during verification' });
  }
});

export default router;