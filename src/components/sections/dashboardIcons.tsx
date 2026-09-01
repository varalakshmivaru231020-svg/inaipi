import {
  Phone, PhoneCall, MessageSquare, Mail, MailOpen, Sparkles, AlertTriangle, Star, Check,
  ArrowLeftRight, Monitor, RefreshCw, TrendingUp, TrendingDown, Inbox, Send, Wrench, Target,
  Users, User, FileText, PenLine, Mic, Radio, Eye, FolderOpen, Menu, X, Smile, Megaphone,
  Link2, Zap, Globe, Smartphone, Bell, Lock, ArrowUpRight, ArrowDownRight, ArrowUp, ArrowDown,
  ArrowRight, Hand, HeartHandshake, Paperclip, LayoutGrid, MessageCircle, Share2,
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

/* ── Channel marks ─────────────────────────────────────────────────────────
   The queue, cases and campaign rows name their channel, and a recognisable
   mark reads faster there than a generic bubble: WhatsApp, Instagram and X all
   looked like the same speech bubble before. These are drawn in currentColor at
   the size their slot already used, so they inherit the existing colour
   treatment and nothing about the layout changes. */

const brand = (path: React.ReactNode, size: number) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>{path}</svg>
);

const WhatsAppMark = ({ size }: { size: number }) => brand(
  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.15.17-.29.19-.53.06-.25-.12-1.05-.38-1.99-1.23-.74-.65-1.23-1.46-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.84-.2-.49-.4-.42-.56-.43h-.47c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />,
  size,
);

const InstagramMark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
    <rect x="2.5" y="2.5" width="19" height="19" rx="5.2" />
    <circle cx="12" cy="12" r="4.3" />
    <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

const XMark = ({ size }: { size: number }) => brand(
  <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-6.09l-4.77-6.23L5.43 21H2.41l7.06-8.07L2.25 3h6.24l4.31 5.7L17.53 3zm-1.06 16.18h1.67L7.6 4.73H5.81l10.66 14.45z" />,
  size,
);

const FacebookMark = ({ size }: { size: number }) => brand(
  <path d="M14.5 3H17V0h-2.5C11.9 0 10 1.9 10 4.5V7H7.5v3H10v14h3V10h2.6l.4-3H13V4.5c0-.8.7-1.5 1.5-1.5z" />,
  size,
);

const LinkedInMark = ({ size }: { size: number }) => brand(
  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C21.4 8.75 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2.02-3.3-2.02 0-2.33 1.57-2.33 3.2V21h-4V9z" />,
  size,
);

/** Channels that have a mark of their own. */
const CHANNELS: Record<string, (p: { size: number }) => JSX.Element> = {
  whatsapp: WhatsAppMark,
  instagram: InstagramMark,
  x: XMark,
  twitter: XMark,
  facebook: FacebookMark,
  linkedin: LinkedInMark,
};

/**
 * The icon for a named channel. Anything without a mark of its own — Voice,
 * Email, SMS, Web Chat — falls back to the glyph mapping, which already gives
 * them the right professional icon.
 */
export function ChannelIcon({ name, g, size = 13 }: { name?: string; g?: string; size?: number }) {
  const key = (name ?? '').toLowerCase().replace(/[^a-z]/g, '');
  const Mark = CHANNELS[key];
  if (Mark) return <Mark size={size} />;
  if (key === 'webchat') return <MessageCircle size={size} strokeWidth={2.1} />;
  if (key === 'social') return <Share2 size={size} strokeWidth={2.1} />;
  if (key === 'sms') return <MessageSquare size={size} strokeWidth={2.1} />;
  return <Glyph g={g} size={size} />;
}
