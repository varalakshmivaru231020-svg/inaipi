'use client';

import { motion } from 'framer-motion';

const brands = [
  'Salesforce', 'Microsoft Dynamics', 'Zoho CRM', 'HubSpot', 'SAP',
  'Avaya', 'Cisco', 'Zoom Phone', 'Microsoft Teams', 'Twilio',
  'ServiceNow', 'Slack', 'Google Workspace', 'OpenAI', 'Anthropic Claude',
  'ElevenLabs', 'Shopify', 'Oracle', 'Jira',
];

// duplicate for seamless loop
const track = [...brands, ...brands];

export default function Marquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative bg-white border-y border-gray-100 overflow-hidden py-7"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mb-5">
        Integrates with the tools you already use
      </p>

      {/* Scrolling track */}
      <div className="flex overflow-hidden">
        <div
          className="flex shrink-0 gap-10 items-center"
          style={{
            animation: 'marquee 28s linear infinite',
            willChange: 'transform',
          }}
        >
          {track.map((name, i) => (
            <span
              key={i}
              className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-blue-600 transition-colors duration-300 whitespace-nowrap select-none cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-slate-200 shrink-0" />
              {name}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </motion.div>
  );
}
