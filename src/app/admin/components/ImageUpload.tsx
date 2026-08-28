'use client';

import { useRef, useState } from 'react';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  hint?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image', hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const upload = async (file: File) => {
    setUploading(true);
    setError('');
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
    setUploading(false);
    if (res.ok) {
      const { url } = await res.json();
      onChange(url);
    } else {
      setError('Upload failed. Try again.');
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  };

  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-1.5">{label}</label>

      {/* Preview */}
      {value && (
        <div className="relative mb-3 w-full h-40 rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >✕</button>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-slate-200 rounded-xl p-5 text-center hover:border-[#1447d4] transition-colors cursor-pointer"
        onClick={() => inputRef.current?.click()}
      >
        {uploading ? (
          <p className="text-sm text-[#1447d4] font-bold animate-pulse">Uploading...</p>
        ) : (
          <>
            <div className="text-2xl mb-1">📁</div>
            <p className="text-sm font-bold text-slate-500">Drop image here or <span className="text-[#1447d4]">click to upload</span></p>
            <p className="text-xs text-slate-400 mt-1">{hint ?? 'JPG, PNG, WebP, max 5 MB'}</p>
          </>
        )}
      </div>

      {/* URL input fallback */}
      <div className="flex items-center gap-2 mt-2">
        <span className="text-xs text-slate-400 shrink-0">or paste URL:</span>
        <input
          type="url"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://..."
          className="flex-1 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-[#0f172a] focus:outline-none focus:border-[#1447d4] transition-colors"
        />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }}
      />
    </div>
  );
}
