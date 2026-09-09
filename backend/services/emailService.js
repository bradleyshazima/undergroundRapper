import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = `"Acense Store" <${process.env.EMAIL_FROM}>`;
// EMAIL_FROM should be your onboarded Resend domain address e.g. orders@yourdomain.com

/**
 * Sends an order confirmation email via Resend.
 * Throws on failure so the caller can handle it as a soft-fail.
 */
export const sendOrderConfirmation = async ({ email, product, reference, shippingDetails }) => {
  console.log(`📧 [EMAIL] Preparing confirmation for: ${email} | Product: ${product.title}`);

  let html = `
    <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 20px;">
      <h2 style="color: #d24700;">THANK YOU FOR YOUR ORDER!</h2>
      <p>Your payment for <strong>${product.title}</strong> (KES ${product.price.toLocaleString()}) was successful.</p>
      <p><strong>Transaction Reference:</strong> ${reference}</p>
      <hr style="border-color: #333;" />
  `;

  if (product.type === 'digital') {
    html += `
      <h3 style="color: #ffffff;">Digital Download Instructions</h3>
      <p>Access your download vault anytime using the email you purchased with.</p>
      <p>
        <a href="${process.env.FRONTEND_URL}/download"
           style="display:inline-block; background:#d24700; color:#fff; padding:10px 20px; text-decoration:none; font-weight:bold;">
          ACCESS DIGITAL VAULT
        </a>
      </p>
    `;
  } else {
    html += `
      <h3 style="color: #ffffff;">Delivery Details</h3>
      <p><strong>County:</strong> ${shippingDetails?.county ?? '—'}</p>
      <p><strong>Constituency:</strong> ${shippingDetails?.constituency ?? '—'}</p>
      <p><strong>Street:</strong> ${shippingDetails?.street ?? '—'}</p>
      <p><strong>Estate:</strong> ${shippingDetails?.estate ?? '—'}</p>
      <p><strong>Landmark:</strong> ${shippingDetails?.description ?? '—'}</p>
      <p style="margin-top:15px;">Your item will be packaged and delivered within <strong>3 working days</strong>.</p>
    `;
  }

  html += `
      <hr style="border-color: #333;" />
      <p style="font-size:12px; color:#888;">Questions? Contact itsacense@gmail.com</p>
    </div>
  `;

  console.log(`📧 [EMAIL] Sending via Resend to: ${email}`);

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: `Order Confirmation: ${product.title}`,
    html,
  });

  if (error) {
    // Log the full Resend error object for debugging
    console.error(`❌ [EMAIL] Resend rejected the send | To: ${email} | Error:`, JSON.stringify(error, null, 2));
    throw new Error(error.message || 'Resend email failed');
  }

  console.log(`✅ [EMAIL] Successfully sent | To: ${email} | Resend ID: ${data.id}`);
  return data;
};