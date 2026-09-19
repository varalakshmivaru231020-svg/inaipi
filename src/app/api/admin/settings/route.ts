import { NextRequest, NextResponse } from 'next/server';
import { getSettings, setSettings } from '@/lib/settings';
import { verifySmtp, sendEnquiryMail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const KEYS = [
  'smtp_host', 'smtp_port', 'smtp_secure', 'smtp_user', 'smtp_pass',
  'smtp_from', 'enquiry_to', 'smtp_enabled', 'ga_id',
];

/** Return all settings; the SMTP password is never sent back to the client. */
export async function GET() {
  const s = await getSettings(KEYS);
  return NextResponse.json({
    smtp_host: s.smtp_host || 'smtp.office365.com',
    smtp_port: s.smtp_port || '587',
    smtp_secure: s.smtp_secure || '',
    smtp_user: s.smtp_user || '',
    smtp_pass_set: !!s.smtp_pass, // whether a password is stored (value withheld)
    smtp_from: s.smtp_from || '',
    enquiry_to: s.enquiry_to || '',
    smtp_enabled: s.smtp_enabled || '',
    ga_id: s.ga_id || '',
  });
}

export async function PUT(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const patch: Record<string, unknown> = {};

  for (const k of KEYS) {
    if (k === 'smtp_pass') continue; // handled below (write-only)
    if (k in body) patch[k] = body[k];
  }
  // Only overwrite the password when a non-empty value is supplied
  if (typeof body.smtp_pass === 'string' && body.smtp_pass.trim() !== '') {
    patch.smtp_pass = body.smtp_pass;
  }

  await setSettings(patch);
  return GET();
}

/** POST { action: 'verify' | 'test', to? } — check SMTP or send a test email. */
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  if (body.action === 'test') {
    const r = await sendEnquiryMail({
      name: 'SMTP Test',
      email: 'noreply@inaipi.zapeat.in',
      subject: 'Test email from Inaipi admin',
      message: 'This is a test message confirming your SMTP settings work correctly.',
    });
    return NextResponse.json(r, { status: r.ok ? 200 : 400 });
  }
  const r = await verifySmtp();
  return NextResponse.json(r, { status: r.ok ? 200 : 400 });
}
