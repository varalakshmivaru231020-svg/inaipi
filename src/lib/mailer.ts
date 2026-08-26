import nodemailer from 'nodemailer';
import { getSmtpConfig, type SmtpConfig } from '@/lib/settings';

/** Build a Nodemailer transport from the stored SMTP config (Outlook / Office 365). */
function makeTransport(cfg: SmtpConfig) {
  return nodemailer.createTransport({
    host: cfg.host,
    port: cfg.port,
    secure: cfg.secure, // false for 587 (STARTTLS), true for 465
    auth: { user: cfg.user, pass: cfg.pass },
    requireTLS: !cfg.secure,
    tls: { minVersion: 'TLSv1.2' },
  });
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export type EnquiryPayload = { name: string; email: string; subject: string; message: string };

/** Send a notification email for a new enquiry. Returns true when sent. */
export async function sendEnquiryMail(e: EnquiryPayload): Promise<{ ok: boolean; error?: string }> {
  const cfg = await getSmtpConfig();
  if (!cfg.enabled) return { ok: false, error: 'SMTP is not enabled' };
  if (!cfg.user || !cfg.pass || !cfg.to) return { ok: false, error: 'SMTP is not fully configured' };

  const transport = makeTransport(cfg);
  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;line-height:1.6">
      <h2 style="margin:0 0 12px">New enquiry from inaipi.zapeat.in</h2>
      <p><strong>Name:</strong> ${esc(e.name)}</p>
      <p><strong>Email:</strong> ${esc(e.email)}</p>
      <p><strong>Subject:</strong> ${esc(e.subject)}</p>
      <p><strong>Message:</strong></p>
      <div style="white-space:pre-wrap;border-left:3px solid #1447d4;padding:8px 12px;background:#f8faff">${esc(e.message)}</div>
    </div>`;

  try {
    await transport.sendMail({
      from: `"Inaipi Website" <${cfg.from}>`,
      to: cfg.to,
      replyTo: e.email || undefined,
      subject: `New enquiry: ${e.subject || '(no subject)'}`,
      text: `Name: ${e.name}\nEmail: ${e.email}\nSubject: ${e.subject}\n\n${e.message}`,
      html,
    });
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'send failed' };
  }
}

/** Verify SMTP credentials (used by the admin "Send test" / verify action). */
export async function verifySmtp(): Promise<{ ok: boolean; error?: string }> {
  const cfg = await getSmtpConfig();
  if (!cfg.user || !cfg.pass) return { ok: false, error: 'SMTP user/password not set' };
  try {
    await makeTransport(cfg).verify();
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'verify failed' };
  }
}
