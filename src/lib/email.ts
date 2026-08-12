import { Resend } from 'resend';
import { generateInvoicePdf, buildInvoiceNumber } from './invoice';

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_your_api_key_here') return null;
  return new Resend(apiKey);
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const FROM = process.env.RESEND_FROM_EMAIL || 'info@arvosim.com';
const COMPANY = 'ELVORIN LTD';
const ADDRESS = 'Suite 709, Avicenna House, 258–262 Romford Road, London, E7 9HZ, United Kingdom';
const DOMAIN = 'arvosim.com';

function emailWrapper(title: string, body: string): string {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #059669; padding: 24px; border-radius: 12px 12px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 20px;">${title}</h1>
      </div>
      <div style="border: 1px solid #E2E8F0; border-top: none; padding: 24px; border-radius: 0 0 12px 12px;">
        ${body}
      </div>
      <div style="text-align: center; margin-top: 16px;">
        <p style="color: #94A3B8; font-size: 12px;">${COMPANY} &middot; ${ADDRESS}</p>
        <p style="color: #94A3B8; font-size: 12px;">
          <a href="https://${DOMAIN}" style="color: #059669; text-decoration: none;">${DOMAIN}</a>
        </p>
      </div>
    </div>
  `;
}

export async function sendWelcomeEmail(to: string, name: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  try {
    await resend.emails.send({
      from: `ArvoSim <${FROM}>`,
      to,
      subject: 'Welcome to ArvoSim!',
      html: emailWrapper('Welcome to ArvoSim! 🌍', `
        <p style="color: #1E293B; font-size: 16px; font-weight: 600; margin: 0 0 16px;">Hi ${escapeHtml(name)},</p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
          Thank you for creating your ArvoSim account! You're now ready to explore affordable eSIM data plans for 190+ countries worldwide.
        </p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
          Here's what you can do next:
        </p>
        <ul style="color: #475569; font-size: 14px; line-height: 1.8; margin: 0 0 16px; padding-left: 20px;">
          <li>Browse destinations and find the perfect data plan</li>
          <li>Top up your wallet to purchase plans instantly</li>
          <li>Install your eSIM before your trip — just scan a QR code</li>
        </ul>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://${DOMAIN}/locations" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Browse Destinations
          </a>
        </div>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
          If you have any questions, reply to this email or visit our <a href="https://${DOMAIN}/help" style="color: #059669;">Help Centre</a>.
        </p>
      `),
    });
    return true;
  } catch (err) {
    console.error('Failed to send welcome email:', err);
    return false;
  }
}

export async function sendPasswordResetEmail(to: string, resetToken: string): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const resetUrl = `${appUrl}/reset-password?token=${resetToken}`;

  try {
    await resend.emails.send({
      from: `ArvoSim <${FROM}>`,
      to,
      subject: 'Reset your ArvoSim password',
      html: emailWrapper('Password Reset Request', `
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
          We received a request to reset your password. Click the button below to choose a new password:
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="${resetUrl}" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Reset Password
          </a>
        </div>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 8px;">
          This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
        </p>
        <p style="color: #94A3B8; font-size: 12px; line-height: 1.6; margin: 16px 0 0;">
          If the button doesn't work, copy and paste this link into your browser:<br/>
          <a href="${resetUrl}" style="color: #059669; word-break: break-all;">${resetUrl}</a>
        </p>
      `),
    });
    return true;
  } catch (err) {
    console.error('Failed to send password reset email:', err);
    return false;
  }
}

export async function sendTopUpEmail(to: string, name: string, amount: number, newBalance: number): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  try {
    await resend.emails.send({
      from: `ArvoSim <${FROM}>`,
      to,
      subject: 'Wallet Top-Up Confirmation',
      html: emailWrapper('Wallet Top-Up Confirmed', `
        <p style="color: #1E293B; font-size: 16px; font-weight: 600; margin: 0 0 16px;">Hi ${escapeHtml(name)},</p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
          Your wallet has been topped up successfully.
        </p>
        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Amount added:</td>
            <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600; text-align: right;">£${amount.toFixed(2)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 14px;">New balance:</td>
            <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600; text-align: right;">£${newBalance.toFixed(2)}</td>
          </tr>
        </table>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://${DOMAIN}/locations" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            Browse Plans
          </a>
        </div>
      `),
    });
    return true;
  } catch (err) {
    console.error('Failed to send top-up email:', err);
    return false;
  }
}

export async function sendPurchaseEmail(to: string, name: string, items: { name: string; data: string; validity: string; price: number; coverage: string }[], total: number, remainingBalance: number): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const invoiceDate = new Date();
  const invoiceNumber = buildInvoiceNumber(invoiceDate);

  const itemRows = items.map((item) => `
    <tr>
      <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600;">${escapeHtml(item.name)}</td>
      <td style="padding: 8px 0; color: #475569; font-size: 14px;">${escapeHtml(item.data)} · ${escapeHtml(item.validity)}</td>
      <td style="padding: 8px 0; color: #1E293B; font-size: 14px; text-align: right;">£${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  let pdfBytes: Uint8Array | null = null;
  try {
    pdfBytes = await generateInvoicePdf({
      invoiceNumber,
      date: invoiceDate,
      customerName: name,
      customerEmail: to,
      items,
      total,
    });
  } catch (err) {
    console.error('Failed to generate invoice PDF:', err);
  }

  try {
    await resend.emails.send({
      from: `ArvoSim <${FROM}>`,
      to,
      subject: `Your ArvoSim invoice ${invoiceNumber} — £${total.toFixed(2)}`,
      html: emailWrapper('Order Confirmation', `
        <p style="color: #1E293B; font-size: 16px; font-weight: 600; margin: 0 0 16px;">Hi ${escapeHtml(name)},</p>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 16px;">
          Thank you for your purchase! Your invoice <strong>${invoiceNumber}</strong> is attached as a PDF. Here's your order summary:
        </p>
        <table style="width: 100%; border-collapse: collapse;">
          ${itemRows}
          <tr style="border-top: 1px solid #E2E8F0;">
            <td colspan="2" style="padding: 12px 0 4px; color: #1E293B; font-size: 14px; font-weight: 700;">Total</td>
            <td style="padding: 12px 0 4px; color: #1E293B; font-size: 14px; font-weight: 700; text-align: right;">£${total.toFixed(2)}</td>
          </tr>
        </table>
        <p style="color: #94A3B8; font-size: 12px; margin: 12px 0 0;">Remaining wallet balance: £${remainingBalance.toFixed(2)}</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://${DOMAIN}/account/esims" style="display: inline-block; background: #059669; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
            View My eSIMs
          </a>
        </div>
        <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0;">
          Your eSIM QR code will be available in your account dashboard. Scan it with your phone to install.
        </p>
      `),
      attachments: pdfBytes
        ? [{ filename: `invoice-${invoiceNumber}.pdf`, content: Buffer.from(pdfBytes) }]
        : undefined,
    });
    return true;
  } catch (err) {
    console.error('Failed to send purchase email:', err);
    return false;
  }
}

export async function sendPurchaseNotification(customerName: string, customerEmail: string, items: { name: string; data: string; price: number; coverage: string }[], total: number): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const toEmail = process.env.RESEND_TO_EMAIL || 'info@arvosim.com';

  const itemRows = items.map((item) => `
    <tr>
      <td style="padding: 6px 0; color: #1E293B; font-size: 14px;">${escapeHtml(item.name)}</td>
      <td style="padding: 6px 0; color: #475569; font-size: 14px;">${escapeHtml(item.coverage)}</td>
      <td style="padding: 6px 0; color: #1E293B; font-size: 14px; text-align: right;">£${item.price.toFixed(2)}</td>
    </tr>
  `).join('');

  try {
    await resend.emails.send({
      from: `ArvoSim <${FROM}>`,
      to: toEmail,
      subject: `[ArvoSim] New Purchase — £${total.toFixed(2)} from ${escapeHtml(customerName)}`,
      html: emailWrapper('New Purchase Received', `
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Customer:</td>
            <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600;">${escapeHtml(customerName)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0; color: #1E293B; font-size: 14px;"><a href="mailto:${escapeHtml(customerEmail)}" style="color: #059669;">${escapeHtml(customerEmail)}</a></td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 16px 0;" />
        <table style="width: 100%; border-collapse: collapse;">
          ${itemRows}
          <tr style="border-top: 1px solid #E2E8F0;">
            <td colspan="2" style="padding: 12px 0 4px; font-weight: 700; color: #1E293B; font-size: 14px;">Total</td>
            <td style="padding: 12px 0 4px; font-weight: 700; color: #1E293B; font-size: 14px; text-align: right;">£${total.toFixed(2)}</td>
          </tr>
        </table>
      `),
    });
    return true;
  } catch (err) {
    console.error('Failed to send purchase notification:', err);
    return false;
  }
}

export async function sendContactNotification(data: { name: string; email: string; subject: string; message: string }): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const toEmail = process.env.RESEND_TO_EMAIL || 'info@arvosim.com';

  try {
    await resend.emails.send({
      from: `ArvoSim <${FROM}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `[ArvoSim Contact] ${data.subject}`,
      html: emailWrapper('New Contact Message', `
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 14px; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Email:</td>
            <td style="padding: 8px 0; color: #1E293B; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #059669;">${escapeHtml(data.email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748B; font-size: 14px;">Subject:</td>
            <td style="padding: 8px 0; color: #1E293B; font-size: 14px; font-weight: 600;">${escapeHtml(data.subject)}</td>
          </tr>
        </table>
        <hr style="border: none; border-top: 1px solid #E2E8F0; margin: 16px 0;" />
        <div style="color: #1E293B; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
      `),
    });
    return true;
  } catch (err) {
    console.error('Failed to send contact notification:', err);
    return false;
  }
}
