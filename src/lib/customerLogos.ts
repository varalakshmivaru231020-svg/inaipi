import { getSetting, setSettings } from '@/lib/settings';

/**
 * Customer logo strip content.
 *
 * Stored as a JSON array in the generic `Setting` key/value table rather than a
 * dedicated model, so no schema migration is needed — the same store already
 * holds SMTP config and the analytics id. Images are uploaded through the
 * existing /api/admin/upload endpoint, which returns a /uploads/... path.
 */

export type CustomerLogo = { url: string; name: string; hidden: boolean };

export const CUSTOMER_LOGOS_KEY = 'customerLogos';

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

export async function getCustomerLogos(): Promise<CustomerLogo[]> {
  const raw = await getSetting(CUSTOMER_LOGOS_KEY, '');
  if (!raw) return [];
  try {
    return normalise(JSON.parse(raw));
  } catch {
    return [];
  }
}

export async function setCustomerLogos(logos: unknown): Promise<CustomerLogo[]> {
  const clean = normalise(logos);
  await setSettings({ [CUSTOMER_LOGOS_KEY]: JSON.stringify(clean) });
  return clean;
}
