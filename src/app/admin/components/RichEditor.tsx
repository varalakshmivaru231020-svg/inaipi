'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Bold, Italic, Underline, Heading2, Heading3, List, ListOrdered,
  Link2, ImagePlus, Quote, Undo2, Redo2, Eraser, Loader2,
} from 'lucide-react';

/**
 * The one rich editor. Blog posts, industries and buyer resources all author
 * their body through this, so the toolbar, the paste handling and the uploads
 * behave the same everywhere; only the field it writes to differs.
 *
 * It edits HTML in place rather than pulling in an editor framework, so pasting
 * from a document or another site keeps its headings, lists, links and emphasis
 * natively. What is pasted is reduced to the tags below on the way in, and
 * sanitised again on the server before it is stored.
 */

const BLOCKED_TAGS = /<\/?(script|style|iframe|object|embed|form|input|button|link|meta)[^>]*>/gi;

/** Reduce pasted markup to what this editor itself can produce. */
function cleanPaste(html: string) {
  const doc = new DOMParser().parseFromString(html.replace(BLOCKED_TAGS, ''), 'text/html');
  const keep = new Set(['P', 'BR', 'STRONG', 'B', 'EM', 'I', 'U', 'H2', 'H3', 'H4', 'UL', 'OL', 'LI', 'A', 'IMG', 'BLOCKQUOTE']);
  const walk = (node: Element) => {
    [...node.children].forEach(child => {
      walk(child);
      if (!keep.has(child.tagName)) {
        child.replaceWith(...Array.from(child.childNodes));
        return;
      }
      [...child.attributes].forEach(a => {
        const ok =
          (child.tagName === 'A' && a.name === 'href' && /^(https?:|mailto:|tel:|\/)/i.test(a.value)) ||
          (child.tagName === 'IMG' && (a.name === 'src' || a.name === 'alt') &&
            (a.name === 'alt' || /^(https?:|\/)/i.test(a.value)));
        if (!ok) child.removeAttribute(a.name);
      });
    });
  };
  walk(doc.body);
  return doc.body.innerHTML;
}

type Props = { value: string; onChange: (html: string) => void; label?: string; hint?: string };

export default function RichEditor({ value, onChange, label = 'Content', hint }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  // only seed the DOM from props when the editor is not the one that changed it
  useEffect(() => {
    const el = ref.current;
    if (el && el.innerHTML !== value) el.innerHTML = value || '';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value === '' ? '' : null]);

  const emit = () => onChange(ref.current?.innerHTML ?? '');

  const run = (cmd: string, arg?: string) => {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    emit();
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const html = e.clipboardData.getData('text/html');
    if (!html) return; // plain text pastes natively
    e.preventDefault();
    document.execCommand('insertHTML', false, cleanPaste(html));
    emit();
  };

  const addLink = () => {
    const url = prompt('Link URL', 'https://');
    if (!url) return;
    if (!/^(https?:|mailto:|tel:|\/)/i.test(url)) { setError('That link is not a valid URL.'); return; }
    setError('');
    run('createLink', url);
  };

  const upload = async (file: File) => {
    setUploading(true);
    setError('');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    setUploading(false);
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      setError(d.error || 'Upload failed. Try again.');
      return;
    }
    const { url } = await res.json();
    run('insertHTML', `<img src="${url}" alt="" />`);
  };

  const btn = 'w-8 h-8 rounded-lg text-slate-500 hover:text-[#1447d4] hover:bg-blue-50 flex items-center justify-center transition-colors';

  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>

      <div className="border border-slate-200 rounded-xl overflow-hidden bg-white focus-within:border-[#1447d4] transition-colors">
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-slate-100 bg-slate-50/70">
          <button type="button" onClick={() => run('formatBlock', 'h2')} className={btn} title="Heading"><Heading2 className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('formatBlock', 'h3')} className={btn} title="Subheading"><Heading3 className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('formatBlock', 'p')} className={`${btn} text-[11px] font-black`} title="Paragraph">P</button>
          <span className="w-px h-5 bg-slate-200 mx-1" />
          <button type="button" onClick={() => run('bold')} className={btn} title="Bold"><Bold className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('italic')} className={btn} title="Italic"><Italic className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('underline')} className={btn} title="Underline"><Underline className="w-4 h-4" /></button>
          <span className="w-px h-5 bg-slate-200 mx-1" />
          <button type="button" onClick={() => run('insertUnorderedList')} className={btn} title="Bulleted list"><List className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('insertOrderedList')} className={btn} title="Numbered list"><ListOrdered className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('formatBlock', 'blockquote')} className={btn} title="Quote"><Quote className="w-4 h-4" /></button>
          <span className="w-px h-5 bg-slate-200 mx-1" />
          <button type="button" onClick={addLink} className={btn} title="Insert link"><Link2 className="w-4 h-4" /></button>
          <button type="button" onClick={() => fileRef.current?.click()} className={btn} title="Insert image">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          </button>
          <span className="w-px h-5 bg-slate-200 mx-1" />
          <button type="button" onClick={() => run('undo')} className={btn} title="Undo"><Undo2 className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('redo')} className={btn} title="Redo"><Redo2 className="w-4 h-4" /></button>
          <button type="button" onClick={() => run('removeFormat')} className={btn} title="Clear formatting"><Eraser className="w-4 h-4" /></button>
        </div>

        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          data-rich-editor
          onInput={emit}
          onBlur={emit}
          onPaste={onPaste}
          className="admin-rich px-4 py-3 min-h-[260px] text-sm text-slate-800 focus:outline-none"
        />
      </div>

      {hint && <p className="text-xs text-slate-400 mt-1.5">{hint}</p>}
      {error && <p className="text-rose-500 text-xs mt-1.5">{error}</p>}

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        data-rich-image
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }}
      />

      {/* the editing surface should look like the page it publishes to */}
      <style jsx global>{`
        .admin-rich h2 { font-size: 1.25rem; font-weight: 700; margin: 1rem 0 .5rem; color: #0f172a; }
        .admin-rich h3 { font-size: 1.05rem; font-weight: 700; margin: .9rem 0 .4rem; color: #0f172a; }
        .admin-rich p { margin: .5rem 0; line-height: 1.65; }
        .admin-rich ul, .admin-rich ol { margin: .5rem 0 .5rem 1.25rem; }
        .admin-rich ul { list-style: disc; }
        .admin-rich ol { list-style: decimal; }
        .admin-rich li { margin: .25rem 0; }
        .admin-rich a { color: #1447d4; text-decoration: underline; }
        .admin-rich img { max-width: 100%; border-radius: .75rem; margin: .75rem 0; }
        .admin-rich blockquote { border-left: 3px solid #bfdbfe; padding-left: .875rem; color: #64748b; margin: .75rem 0; }
        .admin-rich:empty:before { content: attr(data-placeholder); color: #94a3b8; }
      `}</style>
    </div>
  );
}
