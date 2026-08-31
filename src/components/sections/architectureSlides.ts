import {
  Phone, Mail, MessageCircle, MessagesSquare, Monitor, Share2,
  Bot, User, Signal, Mic,
  ListFilter, GitBranch, FileText, ShieldCheck,
  ClipboardList, Activity,
  Database, Building2, PhoneCall, AppWindow, BarChart3,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * The architecture, as a sequence of steps for narrow screens.
 *
 * The desktop diagram is a fixed 1480px canvas whose wires are pixel-mapped to
 * absolutely-positioned clusters, so it cannot reflow. Scaling it down far
 * enough for a phone made the 10px labels unreadable, which is why it used to
 * be a sideways-scrolling box. This is the same content, in the same order the
 * eye follows on desktop (channels in, through the three platform layers, out
 * to the enterprise), rendered as one step at a time at full width.
 *
 * These labels mirror the diagram's markup. `archslides.js` asserts that every
 * label here also appears in that markup, so the two cannot drift apart.
 */

export type SlideItem = { icon: LucideIcon; label: string; sub?: string; lead?: boolean };
export type ArchSlide = { key: string; title: string; pill?: string; items: SlideItem[]; cols: 1 | 2 };

export const ARCH_SLIDES: ArchSlide[] = [
  {
    key: 'contact',
    title: 'Customer Contact',
    pill: 'Omnichannel',
    cols: 2,
    items: [
      { icon: Phone, label: 'Voice' },
      { icon: Mail, label: 'Email' },
      { icon: MessageCircle, label: 'WhatsApp' },
      { icon: MessagesSquare, label: 'Live Chat' },
      { icon: Monitor, label: 'Web Widget' },
      { icon: Share2, label: 'Social Media' },
    ],
  },
  {
    key: 'collaboration',
    title: 'AI & Human Collaboration',
    pill: 'Realtime',
    // full-width rows: 'Conversation Intelligence' does not fit a half-width
    // card on a 360px screen without breaking mid-word
    cols: 1,
    items: [
      { icon: Bot, label: 'AI Chatbot', sub: 'Chat' },
      { icon: User, label: 'Human Agents', sub: 'Assist' },
      { icon: Signal, label: 'Conversation Intelligence', sub: 'Insight' },
      { icon: Mic, label: 'AI Voice Bot', sub: 'Voice' },
    ],
  },
  {
    key: 'cases',
    title: 'Case & Ticket Management',
    pill: 'SLA-aware',
    cols: 1,
    items: [
      { icon: ListFilter, label: 'Auto Classification' },
      { icon: GitBranch, label: 'Smart Routing' },
      { icon: FileText, label: 'Summarization' },
      { icon: ShieldCheck, label: 'Knowledge Suggestions' },
    ],
  },
  {
    key: 'orchestration',
    title: 'Customer Experience Orchestration',
    pill: 'Survey Campaigns',
    cols: 1,
    items: [
      { icon: ClipboardList, label: 'Surveys', sub: 'Adaptive', lead: true },
      { icon: Activity, label: 'Campaigns', sub: 'Journey' },
    ],
  },
  {
    key: 'enterprise',
    title: 'Enterprise Integration Layer',
    cols: 1,
    items: [
      { icon: Database, label: 'CRM', sub: 'Customer data and context' },
      { icon: Building2, label: 'ERP', sub: 'Business processes' },
      { icon: PhoneCall, label: 'Telephony', sub: 'SIP Trunks · PBX · UCaaS' },
      { icon: AppWindow, label: 'Business Applications', sub: 'Custom apps and workflows' },
      { icon: BarChart3, label: 'Data Platforms', sub: 'Analytics and insights' },
    ],
  },
];
