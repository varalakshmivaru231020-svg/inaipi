import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEnquiryMail } from '@/lib/mailer';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * The details a visitor gives before downloading a document.
 *
 * These are stored as enquiries, so they land in the same admin inbox as the
 * contact form rather than in a second system. They do not go through the
 * contact endpoint because that one treats a filled `company` field as a bot
 * signal and requires the form to have been on screen for a few seconds:
 * correct for an unsolicited message, wrong for a download where company is a
 * real question and people click straight through. The protections here are
 * the ones that suit a download.
 */

const HITS = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 12;  // someone may legitimately take several documents
const MIN_GAP_MS = 2000;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  if (arr.length && now - arr[arr.length - 1] < MIN_GAP_MS) { HITS.set(ip, arr); return true; }
  if (arr.length >= MAX_PER_WINDOW) { HITS.set(ip, arr); return true; }
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) for (const [k, v] of HITS) if (!v.some(t => now - t < WINDOW_MS)) HITS.delete(k);
  return false;
}

const clean = (v: unknown, max: number) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  const ip = (req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') || 'unknown').trim();

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }

  // hidden field a person never sees, so anything in it came from a bot
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Too many downloads from this connection. Please try again shortly.' }, { status: 429 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const company = clean(body.company, 160);
  const document = clean(body.document, 200);
  const source = clean(body.source, 80);
  const title = clean(body.title, 200);
  const file = clean(body.file, 400);

  if (!name || !email || !document) {
    return NextResponse.json({ error: 'Your name and email are required.' }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
  }

  const subject = `Download: ${document}`;
  const message = [
    `${source || 'Resource'}: ${title}`,
    `Document: ${document}`,
    file && `File: ${file}`,
    company && `Company: ${company}`,
  ].filter(Boolean).join('\n');

  const ua = clean(req.headers.get('user-agent'), 300);

  try {
    await prisma.enquiry.create({ data: { name, email, subject, message, ip, ua } });
  } catch {
    // the lead is the point of the form: if it cannot be stored, say so rather
    // than handing over the file as though it had been recorded
    return NextResponse.json({ error: 'Could not record your details.' }, { status: 500 });
  }

  const mail = await sendEnquiryMail({ name, email, subject, message });
  return NextResponse.json({ ok: true, emailed: mail.ok });
}
