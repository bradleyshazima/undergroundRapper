import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = `"Acense Store" <${process.env.EMAIL_FROM}>`;

/**
 * Sends an order confirmation email via Resend.
 * Throws on failure so the caller can handle it as a soft-fail.
 *
 * @param {object} params
 * @param {string} params.email            - Recipient email address
 * @param {string} [params.customerName]   - Customer's first name (falls back to email prefix)
 * @param {object} params.product          - { title, price, type, image? }
 * @param {string} params.reference        - Transaction / order reference
 * @param {object} [params.shippingDetails]- { county, constituency, street, estate, description }
 */
export const sendOrderConfirmation = async ({ email, customerName, product, reference, shippingDetails }) => {
  console.log(`📧 [EMAIL] Preparing confirmation for: ${email} | Product: ${product.title}`);

  const name = customerName || email.split('@')[0];
  const orderDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // ── Mint section body (differs per product type) ──────────────────────────
  let mintBody = '';
  if (product.type === 'digital') {
    mintBody = `
      <p style="margin:0 0 12px 0; font-family:Arial,sans-serif; font-size:15px; color:#444444; line-height:1.7;">
        Your digital download is ready and waiting for you.
      </p>
      <p style="margin:0 0 20px 0; font-family:Arial,sans-serif; font-size:15px; color:#444444; line-height:1.7;">
        Access your vault anytime using the email you purchased with. If you have any trouble, just let us know.
      </p>
      <a href="${process.env.FRONTEND_URL}/download"
         style="display:inline-block; background:#1a1a1a; color:#ffffff; padding:12px 32px;
                font-family:Arial,sans-serif; font-size:12px; letter-spacing:3px;
                text-decoration:none; text-transform:uppercase;">
        ACCESS DIGITAL VAULT
      </a>
    `;
  } else {
    mintBody = `
      <p style="margin:0 0 12px 0; font-family:Arial,sans-serif; font-size:15px; color:#444444; line-height:1.7;">
        Just a quick update&hellip; your order is now on its way to you.
      </p>
      <p style="margin:0 0 12px 0; font-family:Arial,sans-serif; font-size:15px; color:#444444; line-height:1.7;">
        It will be with you within <strong>3 working days</strong>. If you want to keep track of it,
        your reference is
        <a href="${process.env.FRONTEND_URL}/orders/${reference}"
           style="color:#1a1a1a; font-weight:bold; text-decoration:underline;">${reference}</a>.
      </p>
      <p style="margin:0 0 12px 0; font-family:Arial,sans-serif; font-size:15px; color:#444444; line-height:1.7;">
        In the meantime, visit
        <a href="${process.env.FRONTEND_URL}"
           style="color:#1a1a1a; font-weight:bold; text-decoration:underline;">acense.store</a>
        to see what&rsquo;s new. Go on &mdash; we will be happy to see you there.
      </p>
      <p style="margin:0; font-family:Arial,sans-serif; font-size:15px; color:#444444; line-height:1.7;">
        If there is anything else we can do, just let us know.
      </p>
    `;
  }

  // ── Order summary rows ────────────────────────────────────────────────────
  const productImageCell = product.image
    ? `<img src="${product.image}" alt="${product.title}"
             style="display:block; width:72px; height:72px; object-fit:cover; border:1px solid #e8e8e8;">`
    : `<table role="presentation" cellspacing="0" cellpadding="0" border="0"
               style="width:72px; height:72px; background:#f2f2f2;">
         <tr><td align="center" style="font-family:Arial,sans-serif; font-size:9px; color:#aaaaaa; letter-spacing:1px;">NO IMAGE</td></tr>
       </table>`;

  // Shipping detail rows only for physical products
  let shippingRows = '';
  if (product.type !== 'digital' && shippingDetails) {
    const sd = shippingDetails;
    const rows = [
      ['County',        sd.county        ?? '—'],
      ['Constituency',  sd.constituency  ?? '—'],
      ['Street',        sd.street        ?? '—'],
      ['Estate',        sd.estate        ?? '—'],
      ['Landmark',      sd.description   ?? '—'],
    ];
    shippingRows = rows.map(([label, value]) => `
      <tr>
        <td style="font-family:Arial,sans-serif; font-size:13px; color:#999999; padding:4px 0;">${label}</td>
        <td style="font-family:Arial,sans-serif; font-size:13px; color:#1a1a1a; text-align:right; padding:4px 0;">${value}</td>
      </tr>
    `).join('');
  }

  // ── Full HTML ─────────────────────────────────────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation</title>
</head>
<body style="margin:0; padding:0; background:#f2f2f2; -webkit-font-smoothing:antialiased;">

  <!-- Outer wrapper -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
         style="background:#f2f2f2; padding:24px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0"
               style="max-width:600px; width:100%; background:#ffffff;">

          <!-- ── HEADER: Logo ───────────────────────────────────────────── -->
          <tr>
            <td style="padding:32px 40px 26px; text-align:center;
                        border-bottom:1px solid #e4e4e4;">
              <span style="font-family:Georgia,'Times New Roman',serif;
                           font-size:18px; letter-spacing:8px; color:#777777;
                           font-weight:normal; text-transform:uppercase;">
                ACENSE STORE
              </span>
            </td>
          </tr>

          <!-- ── MINT SECTION: Confirmation message ────────────────────── -->
          <tr>
            <td style="background:#daeee7; padding:44px 56px; text-align:center;">
              <h2 style="margin:0 0 22px 0; font-family:Georgia,'Times New Roman',serif;
                         font-size:20px; letter-spacing:5px; font-weight:bold;
                         color:#1a1a1a; text-transform:uppercase;">
                ORDER CONFIRMATION
              </h2>
              <p style="margin:0 0 14px 0; font-family:Arial,sans-serif;
                        font-size:15px; color:#444444; line-height:1.7;">
                Hi ${name}, thank you for your order!
              </p>
              ${mintBody}
            </td>
          </tr>

          <!-- Spacer -->
          <tr><td style="height:10px;"></td></tr>

          <!-- ── ORDER SUMMARY ──────────────────────────────────────────── -->
          <tr>
            <td style="padding:30px 40px 10px;">
              <h3 style="margin:0 0 6px 0; font-family:Georgia,'Times New Roman',serif;
                         font-size:20px; font-weight:normal; color:#1a1a1a; text-align:center;">
                Order Summary
              </h3>
              <p style="margin:0 0 20px 0; font-family:Arial,sans-serif;
                        font-size:13px; color:#aaaaaa; text-align:center;">
                ${orderDate}
              </p>

              <!-- Top rule -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td style="border-top:1px solid #e4e4e4; height:1px; font-size:1px; line-height:1px;">&nbsp;</td></tr>
              </table>

              <!-- Product row -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                     style="margin-top:20px; margin-bottom:20px;">
                <tr>
                  <!-- Thumbnail -->
                  <td style="width:80px; vertical-align:top; padding-right:16px;">
                    ${productImageCell}
                  </td>
                  <!-- Details -->
                  <td style="vertical-align:top;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="font-family:Arial,sans-serif; font-size:13px; color:#999999; padding:4px 0;">Product title</td>
                        <td style="font-family:Arial,sans-serif; font-size:13px; color:#1a1a1a; text-align:right; padding:4px 0;">${product.title}</td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,sans-serif; font-size:13px; color:#999999; padding:4px 0;">Transaction ref</td>
                        <td style="font-family:Arial,sans-serif; font-size:13px; color:#1a1a1a; text-align:right; padding:4px 0;">${reference}</td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,sans-serif; font-size:13px; color:#999999; padding:4px 0; padding-top:8px;">Amount paid</td>
                        <td style="font-family:Arial,sans-serif; font-size:13px; font-weight:bold; color:#1a1a1a; text-align:right; padding:4px 0; padding-top:8px;">
                          KES ${product.price.toLocaleString()}
                        </td>
                      </tr>
                      ${shippingRows}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Bottom rule -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr><td style="border-top:1px solid #e4e4e4; height:1px; font-size:1px; line-height:1px;">&nbsp;</td></tr>
              </table>
            </td>
          </tr>

          <!-- ── FOOTER ─────────────────────────────────────────────────── -->
          <tr>
            <td style="padding:24px 40px 36px; text-align:center;">

              <!-- Help text -->
              <p style="margin:0 0 22px 0; font-family:Arial,sans-serif;
                        font-size:13px; color:#aaaaaa; line-height:1.6;">
                If you need help with anything please don&rsquo;t hesitate to drop us an email at
                <a href="mailto:itsacense@gmail.com"
                   style="color:#777777; text-decoration:underline;">itsacense@gmail.com</a>
              </p>

              <!-- Nav links -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
                     style="margin-bottom:26px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.FRONTEND_URL}"
                       style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:2px;
                              color:#888888; text-decoration:none; text-transform:uppercase; margin:0 14px;">
                      SHOP
                    </a>
                    <span style="color:#cccccc;">|</span>
                    <a href="${process.env.FRONTEND_URL}/about"
                       style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:2px;
                              color:#888888; text-decoration:none; text-transform:uppercase; margin:0 14px;">
                      ABOUT US
                    </a>
                    <span style="color:#cccccc;">|</span>
                    <a href="${process.env.FRONTEND_URL}/contact"
                       style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:2px;
                              color:#888888; text-decoration:none; text-transform:uppercase; margin:0 14px;">
                      CONTACT
                    </a>
                  </td>
                </tr>
              </table>

              <!-- VIEW ORDER button -->
              <a href="${process.env.FRONTEND_URL}/orders/${reference}"
                 style="display:inline-block; border:1.5px solid #1a1a1a; padding:14px 52px;
                        font-family:Arial,sans-serif; font-size:12px; letter-spacing:3px;
                        color:#1a1a1a; text-decoration:none; text-transform:uppercase;">
                VIEW ORDER
              </a>

            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`;

  console.log(`📧 [EMAIL] Sending via Resend to: ${email}`);

  const { data, error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: email,
    subject: `Order Confirmation: ${product.title}`,
    html,
  });

  if (error) {
    console.error(`❌ [EMAIL] Resend rejected the send | To: ${email} | Error:`, JSON.stringify(error, null, 2));
    throw new Error(error.message || 'Resend email failed');
  }

  console.log(`✅ [EMAIL] Successfully sent | To: ${email} | Resend ID: ${data.id}`);
  return data;
};