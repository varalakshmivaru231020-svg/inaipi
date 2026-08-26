import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEnquiryMail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/* ── In-memory rate limiter (per server instance) ──────────────────────────
   The app runs as a single pm2 process, so a module-level map is sufficient to
   throttle abusive clients without an external store. */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;         // max submissions per IP per window
const MIN_GAP_MS = 20 * 1000;     // min gap between two submissions from one IP

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  if (arr.length && now - arr[arr.length - 1] < MIN_GAP_MS) { HITS.set(ip, arr); return true; }
  if (arr.length >= MAX_PER_WINDOW) { HITS.set(ip, arr); return true; }
  arr.push(now);
  HITS.set(ip, arr);
  // opportunistic cleanup so the map can't grow unbounded
  if (HITS.size > 5000) for (const [k, v] of HITS) if (!v.some(t => now - t < WINDOW_MS)) HITS.delete(k);
  return false;
}

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  const ip =
    (req.headers.get('x-forwarded-for')?.split(',')[0] ||
      req.headers.get('x-real-ip') ||
      'unknown').trim();

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }

  // 1) Honeypot — real users never fill this hidden field. Pretend success.
  if (clean(body.company, 200)) return NextResponse.json({ ok: true });

  // 2) Timing check — bots submit instantly. `ts` is when the form was rendered.
  const ts = Number(body.ts);
  const elapsed = Number.isFinite(ts) ? Date.now() - ts : 0;
  if (!Number.isFinite(ts) || elapsed < 2500 || elapsed > 60 * 60 * 1000) {
    return NextResponse.json({ error: 'Please try again.' }, { status: 400 });
  }

  // 3) Rate limit per IP
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  // 4) Validate + sanitise
  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const subject = clean(body.subject, 200);
  const message = String(body.message ?? '').replace(/\r\n/g, '\n').trim().slice(0, 5000);

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }
  // 5) Cheap spam heuristic — reject link-stuffed messages
  const links = (message.match(/https?:\/\//gi) || []).length;
  if (links >= 6 || /\[url=|\bviagra\b|\bcasino\b/i.test(message)) {
    return NextResponse.json({ ok: true }); // silently drop
  }

  const ua = clean(req.headers.get('user-agent'), 300);

  // Store the enquiry (never fail the request if the DB write hiccups)
  try {
    await prisma.enquiry.create({ data: { name, email, subject, message, ip, ua } });
  } catch { /* keep going — still try to email */ }

  // Send notification email (best-effort; don't leak SMTP errors to the client)
  const mail = await sendEnquiryMail({ name, email, subject, message });

  return NextResponse.json({ ok: true, emailed: mail.ok });
}
