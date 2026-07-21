'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

/* ── Shared field styles ── */
export const inputCls =
  'w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#1447d4] focus:ring-4 focus:ring-[#1447d4]/10 transition-all';

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 bg-[#1447d4] hover:bg-[#0d3ab8] text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm shadow-blue-700/20';

export const btnGhost =
  'inline-flex items-center justify-center gap-2 border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors';

/* ── Field ── */
export function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-slate-400 mt-1.5">{hint}</p>}
    </div>
  );
}

/* ── Page header ── */
export function PageHeader({
  title,
  subtitle,
  back,
  action,
}: {
  title: string;
  subtitle?: string;
  back?: { href: string; label?: string };
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-7">
      <div>
        {back && (
          <Link
            href={back.href}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-[#1447d4] transition-colors mb-2"
          >
            <span aria-hidden>←</span> {back.label ?? 'Back'}
          </Link>
        )}
        <h1 className="text-[26px] font-bold text-slate-900 tracking-tight font-figtree leading-none">{title}</h1>
        {subtitle && <p className="text-slate-400 text-sm mt-1.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ── Card ── */
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200/70 shadow-sm shadow-slate-200/40 ${className}`}>
      {children}
    </div>
  );
}

/* ── Badge ── */
export function Badge({ children, tone = 'blue' }: { children: ReactNode; tone?: 'blue' | 'slate' | 'green' | 'amber' | 'rose' | 'violet' }) {
  const tones: Record<string, string> = {
    blue: 'bg-blue-50 text-[#1447d4]',
    slate: 'bg-slate-100 text-slate-500',
    green: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    rose: 'bg-rose-50 text-rose-500',
    violet: 'bg-violet-50 text-violet-600',
  };
  return (
    <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}

/* ── Empty state ── */
export function EmptyState({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="text-center py-20">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mb-4">{icon}</div>
      <p className="font-bold text-slate-700">{title}</p>
      {children && <div className="text-sm text-slate-400 mt-1.5">{children}</div>}
    </div>
  );
}

/* ── Loading skeleton rows ── */
export function LoadingRows({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-[68px] rounded-2xl bg-slate-100 animate-pulse" />
      ))}
    </div>
  );
}
