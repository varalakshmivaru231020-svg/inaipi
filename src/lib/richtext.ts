/**
 * The rich editor lets an admin paste content in from anywhere, so what arrives
 * can carry scripts, event handlers and styling from the source site. This
 * keeps the formatting the editor offers and drops everything else, on the way
 * into the database, so the public pages only ever render what passed through
 * here.
 */

const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'h2', 'h3', 'h4',
  'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption',
  'span', 'div', 'hr', 'code', 'pre', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'title', 'width', 'height']),
};

const VOID_TAGS = new Set(['br', 'img', 'hr']);

/** Only links we are willing to render: nothing that can execute. */
const safeHref = (v: string) => /^(https?:|mailto:|tel:|\/(?!\/))/i.test(v.trim());
const safeSrc = (v: string) => /^(https?:|\/(?!\/)|data:image\/(png|jpe?g|gif|webp|avif);base64,)/i.test(v.trim());

export function sanitizeHtml(input: string): string {
  if (!input) return '';
  let out = '';
  let i = 0;
  const open: string[] = [];

  // drop whole elements whose content should never survive
  const stripped = input
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  while (i < stripped.length) {
    const lt = stripped.indexOf('<', i);
    if (lt === -1) { out += stripped.slice(i); break; }
    out += stripped.slice(i, lt);
    const gt = stripped.indexOf('>', lt);
    if (gt === -1) break;

    const raw = stripped.slice(lt + 1, gt);
    const closing = raw.startsWith('/');
    const name = (closing ? raw.slice(1) : raw).trim().split(/[\s/>]/)[0].toLowerCase();

    if (!ALLOWED_TAGS.has(name)) { i = gt + 1; continue; }

    if (closing) {
      const at = open.lastIndexOf(name);
      if (at !== -1) { open.splice(at, 1); out += `</${name}>`; }
      i = gt + 1;
      continue;
    }

    // keep only the attributes this tag is allowed to have
    const allowed = ALLOWED_ATTRS[name];
    let attrs = '';
    if (allowed) {
      const body = raw.slice(name.length);
      for (const m of body.matchAll(/([a-zA-Z-]+)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
        const key = m[1].toLowerCase();
        const val = (m[3] ?? m[4] ?? '').trim();
        if (!allowed.has(key)) continue;
        if (key === 'href' && !safeHref(val)) continue;
        if (key === 'src' && !safeSrc(val)) continue;
        attrs += ` ${key}="${val.replace(/"/g, '&quot;')}"`;
      }
      // links opened in a new tab must not hand the opener over
      if (name === 'a' && /target="_blank"/.test(attrs) && !/rel=/.test(attrs)) {
        attrs += ' rel="noopener noreferrer"';
      }
    }

    if (VOID_TAGS.has(name)) out += `<${name}${attrs}>`;
    else { open.push(name); out += `<${name}${attrs}>`; }
    i = gt + 1;
  }

  // close anything the input left hanging
  while (open.length) out += `</${open.pop()}>`;
  return out.trim();
}

/** True when the rich body actually holds something worth rendering. */
export const hasHtml = (html?: string) =>
  !!html && html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim().length > 0;

export type DocumentRef = { name: string; url: string };

/** Documents arrive as JSON from the database; keep only well-formed entries. */
export function toDocuments(value: unknown): DocumentRef[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((d): d is DocumentRef =>
      !!d && typeof d === 'object' &&
      typeof (d as DocumentRef).url === 'string' && (d as DocumentRef).url.trim() !== '')
    .map(d => ({ name: (d.name || d.url.split('/').pop() || 'Document').trim(), url: d.url.trim() }));
}

/**
 * Plain paragraphs from the rich body. The content types kept their paragraph
 * array before the editor existed and things like the blog read-time estimate
 * still read it, so it is derived from the HTML rather than dropped.
 */
export function htmlToParagraphs(html: string): string[] {
  if (!html) return [];
  return html
    .replace(/<\/(p|h[1-6]|li|blockquote|div|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .split(/\n+/)
    .map(s => s.trim())
    .filter(Boolean);
}
