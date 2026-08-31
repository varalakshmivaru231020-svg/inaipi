'use client';

/**
 * Renders the body written in the admin's rich editor. The markup was already
 * reduced to a safe set on the way into the database; this only styles it so it
 * matches the rest of the site's typography.
 *
 * Entries written before the editor existed have no HTML, only the paragraph
 * array, so callers fall back to that.
 */
export default function RichContent({ html, className = '' }: { html: string; className?: string }) {
  return (
    <>
      <div className={`site-rich ${className}`} dangerouslySetInnerHTML={{ __html: html }} />
      <style jsx global>{`
        .site-rich { color: #64748b; font-size: 1.0625rem; line-height: 1.75; }
        .site-rich > *:first-child { margin-top: 0; }
        .site-rich h2 { font-size: 1.75rem; font-weight: 700; color: #0f172a; letter-spacing: -.025em; margin: 2rem 0 .75rem; line-height: 1.2; }
        .site-rich h3 { font-size: 1.3rem; font-weight: 700; color: #0f172a; letter-spacing: -.02em; margin: 1.5rem 0 .5rem; line-height: 1.3; }
        .site-rich h4 { font-size: 1.1rem; font-weight: 700; color: #0f172a; margin: 1.25rem 0 .5rem; }
        .site-rich p { margin: 0 0 1rem; }
        .site-rich ul, .site-rich ol { margin: 0 0 1rem 1.5rem; }
        .site-rich ul { list-style: disc; }
        .site-rich ol { list-style: decimal; }
        .site-rich li { margin: .35rem 0; }
        .site-rich a { color: #1447d4; text-decoration: underline; text-underline-offset: 2px; }
        .site-rich a:hover { color: #0d3ab8; }
        .site-rich strong, .site-rich b { color: #0f172a; font-weight: 700; }
        .site-rich img { max-width: 100%; height: auto; border-radius: 1rem; margin: 1.25rem 0; }
        .site-rich blockquote { border-left: 3px solid #bfdbfe; padding-left: 1rem; margin: 1.25rem 0; color: #475569; font-style: italic; }
        .site-rich hr { border: 0; border-top: 1px solid #e2e8f0; margin: 1.75rem 0; }
        .site-rich table { width: 100%; border-collapse: collapse; margin: 1.25rem 0; display: block; overflow-x: auto; }
        .site-rich th, .site-rich td { border: 1px solid #e2e8f0; padding: .5rem .75rem; text-align: left; font-size: .95rem; }
        .site-rich code { background: #f1f5f9; border-radius: .35rem; padding: .1rem .35rem; font-size: .9em; }
        .site-rich pre { background: #f1f5f9; border-radius: .75rem; padding: 1rem; overflow-x: auto; margin: 1.25rem 0; }
      `}</style>
    </>
  );
}
