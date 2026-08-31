import {
  Phone, PhoneCall, MessageSquare, Mail, MailOpen, Sparkles, AlertTriangle, Star, Check,
  ArrowLeftRight, Monitor, RefreshCw, TrendingUp, TrendingDown, Inbox, Send, Wrench, Target,
  Users, User, FileText, PenLine, Mic, Radio, Eye, FolderOpen, Menu, X, Smile, Megaphone,
  Link2, Zap, Globe, Smartphone, Bell, Lock, ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown,
  ArrowRight, Hand, HeartHandshake, Paperclip, LayoutGrid,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * The product mockups carried their icons as emoji, which render differently on
 * every platform and read as placeholder art. This maps each one to the icon
 * set the rest of the site already uses, so the dashboards match the marketing
 * sections. The data keeps its glyph strings; only the rendering changes.
 */
const MAP: Record<string, LucideIcon> = {
  '📞': Phone,
  '✆': PhoneCall,
  '💬': MessageSquare,
  '✉': Mail,
  '📧': Mail,
  '📨': MailOpen,
  '✦': Sparkles,
  '⚠': AlertTriangle,
  '★': Star,
  '☆': Star,
  '✓': Check,
  '⇄': ArrowLeftRight,
  '🖥': Monitor,
  '🔁': RefreshCw,
  '📈': TrendingUp,
  '📉': TrendingDown,
  '📥': Inbox,
  '📤': Send,
  '🔧': Wrench,
  '🎯': Target,
  '👥': Users,
  '👤': User,
  '📄': FileText,
  '📝': PenLine,
  '🎙': Mic,
  '📡': Radio,
  '👁': Eye,
  '🗂': FolderOpen,
  '☰': Menu,
  '✕': X,
  '😊': Smile,
  '📣': Megaphone,
  '🔗': Link2,
  '⚡': Zap,
  '🌐': Globe,
  '📱': Smartphone,
  '🔔': Bell,
  '🔐': Lock,
  '📎': Paperclip,
  '🚚': Send,
  '📦': LayoutGrid,
  '👋': Hand,
  '🙏': HeartHandshake,
  '👇': ArrowDown,
  '⬇': ArrowDown,
  '↗': ArrowUpRight,
  '↘': ArrowDownRight,
  '↑': ArrowUp,
  '↓': ArrowDown,
  '→': ArrowRight,
};

/** Icons that read better filled than outlined at dashboard sizes. */
const FILLED = new Set(['★', '☆']);

export function Glyph({ g, size = 13 }: { g?: string; size?: number }) {
  const key = (g ?? '').replace(/️/g, '').trim();
  const Icon = MAP[key];
  // anything unmapped keeps its original text rather than disappearing
  if (!Icon) return <>{g}</>;
  return (
    <Icon
      size={size}
      strokeWidth={2.1}
      style={FILLED.has(key) ? { fill: 'currentColor', stroke: 'none' } : undefined}
    />
  );
}

/** The star rating rows, which were a run of ★ characters. */
export function Stars({ n = 5, size = 12 }: { n?: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1.5, alignItems: 'center' }}>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={size} strokeWidth={0} style={{ fill: 'currentColor' }} />
      ))}
    </span>
  );
}

/** A CSAT score out of five, which used to be a run of ★ and ☆ characters. */
export function Rating({ n, size = 12 }: { n: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1.5, alignItems: 'center' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={i < n ? 0 : 1.8}
          style={i < n ? { fill: 'currentColor' } : { opacity: 0.35 }}
        />
      ))}
    </span>
  );
}

/**
 * A value that leads with a glyph, like "↗ +12%". Draws the glyph as an icon
 * and keeps the rest of the string as text.
 */
export function Lead({ t, size = 12 }: { t?: string; size?: number }) {
  const s = (t ?? '').trim();
  const first = [...s][0];
  if (!first || !MAP[first]) return <>{t}</>;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
      <Glyph g={first} size={size} />
      {s.slice(first.length).trim()}
    </span>
  );
}
