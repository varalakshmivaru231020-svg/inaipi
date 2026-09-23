import { getSettings, setSettings } from '@/lib/settings';

/**
 * Customer logo strip content: the line above the strip, the highlight in the
 * middle of it, and the logos.
 *
 * Stored in the generic `Setting` key/value table rather than a dedicated
 * model, so no schema migration is needed — the same store already holds SMTP
 * config and the analytics id. Images are uploaded through the existing
 * /api/admin/upload endpoint, which returns a /uploads/... path.
 */

export type CustomerLogo = { url: string; name: string; hidden: boolean };

export const CUSTOMER_LOGOS_KEY = 'customerLogos';
export const CUSTOMER_STRIP_SUBTITLE_KEY = 'customerStripSubtitle';
export const CUSTOMER_STRIP_HIGHLIGHT_KEY = 'customerStripHighlight';

/** Shown until the admin writes their own line. Claims nothing we can't back. */
export const DEFAULT_STRIP_SUBTITLE = 'Trusted by businesses across the region';

/** What the band has always shown in the middle. Editable, and clearable. */
export const DEFAULT_STRIP_HIGHLIGHT = '500+';

/** Short: it sits between the two halves of the band, on one line. */
export const STRIP_HIGHLIGHT_MAX = 24;

export type CustomerStrip = { logos: CustomerLogo[]; subtitle: string; highlight: string };

/** Coerce whatever is in the store into a clean list; never throws. */
function normalise(raw: unknown): CustomerLogo[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map(item => {
      if (typeof item === 'string') return { url: item, name: '', hidden: false };
      if (item && typeof item === 'object') {
        const o = item as Record<string, unknown>;
        return {
          url: typeof o.url === 'string' ? o.url : '',
          name: typeof o.name === 'string' ? o.name : '',
          // Anything saved before the flag existed was on the strip, so a
          // missing value means shown; only an explicit true hides one.
          hidden: o.hidden === true,
        };
      }
      return { url: '', name: '', hidden: false };
    })
    .map(l => ({ url: l.url.trim(), name: l.name.trim(), hidden: l.hidden }))
    // Drop blanks so the strip never renders an empty <img> as a broken icon.
    .filter(l => l.url !== '');
}

/**
 * One tidy line of plain text. Blank falls back to the default rather than
 * leaving the strip with no heading at all, and the cap stops a stray paste
 * from breaking the band's layout.
 */
function normaliseSubtitle(raw: unknown): string {
  if (typeof raw !== 'string') return DEFAULT_STRIP_SUBTITLE;
  const text = raw.replace(/\s+/g, ' ').trim().slice(0, 160);
  return text === '' ? DEFAULT_STRIP_SUBTITLE : text;
}

/**
 * The middle of the band. Unlike the subtitle, blank is a real choice here —
 * it means show no highlight — so only an absent key falls back to the
 * default. Kept short so it cannot push the band sideways.
 */
function normaliseHighlight(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  return raw.replace(/\s+/g, ' ').trim().slice(0, STRIP_HIGHLIGHT_MAX);
}

function parseLogos(raw: string): CustomerLogo[] {
  if (!raw) return [];
  try {
    return normalise(JSON.parse(raw));
  } catch {
    return [];
  }
}

/** The strip's whole content in one read. */
export async function getCustomerStrip(): Promise<CustomerStrip> {
  const s = await getSettings([
    CUSTOMER_LOGOS_KEY,
    CUSTOMER_STRIP_SUBTITLE_KEY,
    CUSTOMER_STRIP_HIGHLIGHT_KEY,
  ]);
  const storedHighlight = s[CUSTOMER_STRIP_HIGHLIGHT_KEY];
  return {
    logos: parseLogos(s[CUSTOMER_LOGOS_KEY] || ''),
    subtitle: normaliseSubtitle(s[CUSTOMER_STRIP_SUBTITLE_KEY] ?? ''),
    // never saved -> what the band already showed; saved blank -> no highlight
    highlight:
      storedHighlight === undefined ? DEFAULT_STRIP_HIGHLIGHT : normaliseHighlight(storedHighlight),
  };
}

/**
 * Saved by the one Save Logos action, so the line, the highlight and the
 * logos are written together. A field the caller leaves out keeps the value
 * it already had.
 */
export async function setCustomerStrip(input: {
  logos?: unknown;
  subtitle?: unknown;
  highlight?: unknown;
}): Promise<CustomerStrip> {
  const current = await getCustomerStrip();
  const next: CustomerStrip = {
    logos: input.logos === undefined ? current.logos : normalise(input.logos),
    subtitle:
      input.subtitle === undefined ? current.subtitle : normaliseSubtitle(input.subtitle),
    highlight:
      input.highlight === undefined ? current.highlight : normaliseHighlight(input.highlight),
  };
  await setSettings({
    [CUSTOMER_LOGOS_KEY]: JSON.stringify(next.logos),
    [CUSTOMER_STRIP_SUBTITLE_KEY]: next.subtitle,
    [CUSTOMER_STRIP_HIGHLIGHT_KEY]: next.highlight,
  });
  return next;
}

export async function getCustomerLogos(): Promise<CustomerLogo[]> {
  return (await getCustomerStrip()).logos;
}

export async function setCustomerLogos(logos: unknown): Promise<CustomerLogo[]> {
  return (await setCustomerStrip({ logos })).logos;
}
