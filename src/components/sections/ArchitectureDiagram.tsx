'use client';

/**
 * Inaipi Platform Architecture — faithful port of the Claude Design file
 * "Architecture Diagram.html".
 *
 * The diagram is authored on a fixed 1480px canvas: the SVG connector wires are
 * pixel-mapped to the absolutely-positioned clusters, so the markup is rendered
 * verbatim (static, trusted) and the wrapper (Architecture.tsx) scales the whole
 * canvas to fit any viewport. All selectors are scoped under `.ia` so nothing
 * leaks into the rest of the site.
 */

export const ARCH_W = 1480;

const MONO = "ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace";
const SANS = "var(--font-figtree), Inter, system-ui, sans-serif";

const CSS = `
.ia{
  --blue-900:#0B2A6B; --blue-700:#1447D4; --blue-500:#006FFF; --blue-300:#5C92FF;
  --blue-100:#E6EEFE; --blue-50:#F1F5FF;
  --ink:#0E1726; --ink-2:#3B475C; --muted:#7A869B;
  --line:#D6DCE6; --line-soft:#E8ECF3; --card:#FFFFFF; --bg:#F7F9FC;
  font-family:${SANS}; color:var(--ink);
  background:
    radial-gradient(1200px 600px at 20% 0%, #E8EFFE 0%, transparent 60%),
    radial-gradient(1000px 500px at 90% 100%, #E1ECFF 0%, transparent 55%),
    var(--bg);
  -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility;
}
.ia *{ box-sizing:border-box; }

.ia .page{ width:${ARCH_W}px; margin:0 auto; padding:44px 56px; position:relative; }

.ia .stage{ position:relative; height:780px; border:1px solid var(--line-soft); border-radius:22px;
  background:linear-gradient(180deg, rgba(255,255,255,.75), rgba(255,255,255,.4)),
    radial-gradient(900px 420px at 50% 50%, rgba(20,71,212,.07), transparent 70%);
  overflow:hidden; }
.ia .grid-bg{ position:absolute; inset:0;
  background-image:linear-gradient(var(--line-soft) 1px, transparent 1px), linear-gradient(90deg, var(--line-soft) 1px, transparent 1px);
  background-size:40px 40px;
  -webkit-mask-image:radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 90%);
  mask-image:radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 90%);
  opacity:.35; pointer-events:none; }
.ia .svg-wires{ position:absolute; inset:0; width:100%; height:100%; pointer-events:none; }

.ia .cluster{ position:absolute; border-radius:18px; padding:18px 14px 16px; background:rgba(255,255,255,.92); border:1px solid var(--line);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 18px 40px -28px rgba(11,42,107,.22); }
.ia .cluster .title{ display:inline-block; background:linear-gradient(135deg, var(--blue-900) 0%, var(--blue-700) 50%, var(--blue-500) 100%);
  color:#fff; font-size:11px; font-weight:600; letter-spacing:.04em; padding:6px 12px; border-radius:999px;
  box-shadow:0 6px 14px -6px rgba(20,71,212,.55); position:absolute; top:-14px; left:14px; white-space:nowrap; z-index:2; }
.ia .cluster.alt .title{ background:linear-gradient(135deg, var(--blue-700) 0%, var(--blue-500) 60%, var(--blue-300) 100%); box-shadow:0 6px 14px -6px rgba(0,111,255,.55); }

.ia .c-contact{ left:28px; top:50%; width:248px; transform:translateY(-50%); background:linear-gradient(165deg, #FFFFFF 0%, #EAF1FF 60%, #DCE8FF 100%); }
.ia .c-contact .grid{ display:flex; flex-direction:column; gap:8px; margin-top:6px; }
.ia .chip{ background:linear-gradient(135deg, #FFFFFF 0%, #F4F8FF 100%); border:1px solid var(--line); border-radius:12px; padding:10px 12px;
  display:flex; flex-direction:row; align-items:center; gap:12px; text-align:left; }
.ia .chip .ic{ width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; background:var(--blue-100); color:var(--blue-700); flex:none; }
.ia .chip .ic svg{ width:16px; height:16px; }
.ia .chip > div{ display:flex; flex-direction:column; min-width:0; flex:1; }
.ia .chip .lbl{ font-size:12px; font-weight:600; color:var(--ink); letter-spacing:.01em; line-height:1.2; }
.ia .chip .socials{ display:flex; gap:5px; margin-top:4px; }
.ia .chip .socials span{ width:18px; height:18px; border-radius:5px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:9px; font-weight:700; font-family:${SANS}; }

.ia .c-enterprise{ right:28px; top:50%; width:280px; transform:translateY(-50%); background:linear-gradient(195deg, #FFFFFF 0%, #E8F0FF 55%, #D4E2FF 100%); }
.ia .c-enterprise .title{ left:50%; transform:translateX(-50%); }
.ia .group{ margin-top:12px; border:1px dashed var(--line); border-radius:12px; padding:10px 10px 12px; background:rgba(241,245,255,.5); }
.ia .group:first-of-type{ margin-top:6px; }
.ia .group h4{ margin:0 0 8px; font-size:10px; font-weight:700; color:var(--blue-700); letter-spacing:.14em; text-transform:uppercase; font-family:${MONO}; }
.ia .logos{ display:grid; grid-template-columns:1fr 1fr; gap:6px; }
.ia .logo{ height:36px; background:var(--card); border:1px solid var(--line); border-radius:8px; display:flex; align-items:center; justify-content:flex-start;
  font-size:12px; font-weight:800; letter-spacing:-.01em; padding:0 8px; line-height:1; font-family:${SANS}; gap:7px; }
.ia .logo.wide{ grid-column:1/3; justify-content:flex-start; }
.ia .logo .lm{ width:22px; height:22px; border-radius:5px; display:flex; align-items:center; justify-content:center; flex:none; font-family:${SANS}; font-weight:800; font-size:10px; color:#fff; letter-spacing:0; }

.ia .hub{ position:absolute; left:50%; top:50%; transform:translate(-50%, -50%); width:540px; }
.ia .hub-card{ position:relative; border-radius:22px; padding:20px;
  background:
    radial-gradient(600px 260px at 50% 0%, rgba(0,111,255,.18), transparent 60%),
    radial-gradient(500px 300px at 0% 100%, rgba(20,71,212,.16), transparent 65%),
    radial-gradient(500px 300px at 100% 100%, rgba(92,146,255,.18), transparent 65%),
    linear-gradient(180deg, #FFFFFF 0%, #F1F6FF 50%, #E4EEFF 100%);
  border:1.5px solid var(--blue-700);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset, 0 30px 60px -36px rgba(20,71,212,.45), 0 8px 22px -16px rgba(11,42,107,.2); }
/* Centred: the head holds the platform name alone, and the padding that used
   to clear the removed capsule is no longer needed. */
.ia .hub-head{ display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
.ia .hub-brand{ display:flex; align-items:center; gap:12px; }
.ia .hub-mark{ width:44px; height:44px; border-radius:12px; background:linear-gradient(135deg, var(--blue-700), var(--blue-500)); color:#fff;
  display:flex; align-items:center; justify-content:center; box-shadow:0 8px 18px -8px rgba(20,71,212,.7); }
.ia .hub-title{ font-size:26px; font-weight:700; letter-spacing:-.015em; white-space:nowrap; }
.ia .hub-sub{ font-size:11px; color:var(--blue-700); font-family:${MONO}; letter-spacing:.12em; text-transform:uppercase; }

.ia .layer{ border-radius:14px; padding:12px 14px 14px; margin-bottom:10px; position:relative; }
.ia .layer:last-child{ margin-bottom:0; }
.ia .layer .lhead{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
.ia .layer .lname{ display:flex; align-items:center; gap:8px; font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; font-family:${MONO}; }
.ia .layer .lname .num{ width:18px; height:18px; border-radius:5px; display:flex; align-items:center; justify-content:center; color:#fff; font-size:9.5px; }
.ia .layer .pill{ font-size:9px; font-family:${MONO}; padding:3px 8px; border-radius:999px; letter-spacing:.1em; text-transform:uppercase; }

.ia .layer.a{ background:linear-gradient(135deg, #F1F5FF 0%, #DCE7FF 50%, #C9D8FF 100%); border:1px solid #BFD0FA; }
.ia .layer.a .lname{ color:var(--blue-700); }
.ia .layer.a .lname .num{ background:var(--blue-700); }
.ia .layer.a .pill{ background:#fff; color:var(--blue-700); border:1px solid var(--blue-100); }

.ia .row4{ display:grid; grid-template-columns:repeat(4, 1fr); gap:8px; }
.ia .tile{ background:#fff; border:1px solid var(--line); border-radius:10px; padding:10px 6px 10px; display:flex; flex-direction:column; align-items:center; gap:5px; text-align:center; min-height:88px; justify-content:flex-start; }
.ia .tile .ic{ width:28px; height:28px; border-radius:7px; background:var(--blue-100); color:var(--blue-700); display:flex; align-items:center; justify-content:center; flex:none; }
.ia .tile .lbl{ font-size:10.5px; font-weight:600; color:var(--ink); line-height:1.15; white-space:nowrap; }
.ia .tile .sub{ font-size:8px; color:var(--muted); font-family:${MONO}; letter-spacing:.04em; text-transform:uppercase; margin-top:auto; }

.ia .layer.b{ background:linear-gradient(135deg, #DEEAFF 0%, #C5D7FF 50%, #A8C0FF 100%); border:1px solid #9BB6FA; }
.ia .layer.b .lname{ color:var(--blue-700); }
.ia .layer.b .lname .num{ background:var(--blue-500); }
.ia .layer.b .pill{ background:#fff; color:var(--blue-700); border:1px solid #C8D6F6; }
.ia .layer.b .row2{ display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.ia .case-tile{ background:#fff; border:1px solid #C8D6F6; border-radius:10px; padding:10px 12px; display:flex; align-items:center; gap:10px; }
.ia .case-tile .ic{ width:26px; height:26px; border-radius:7px; background:var(--blue-100); color:var(--blue-500); display:flex; align-items:center; justify-content:center; flex:none; }
.ia .case-tile .lbl{ font-size:11px; font-weight:600; }

.ia .layer.c{ background:linear-gradient(135deg, #C9DCFF 0%, #A6C3FF 50%, #7FA6FF 100%); border:1px solid #7AA0F0; }
.ia .layer.c .lname{ color:var(--blue-900); }
.ia .layer.c .lname .num{ background:var(--blue-900); }
.ia .layer.c .pill{ background:#fff; color:var(--blue-900); border:1px solid #B0CCFB; }
/* The four tiles are content-sized, and together they were 6px wider than the
   row, so the overflow landed on the last tile (Campaigns) and clipped it on
   machines whose fonts render slightly wide. Trim the horizontal padding only:
   tile height and every other value stay as they were, so the row has slack. */
.ia .cx-tile{ background:#fff; border:1px solid #B0CCFB; border-radius:10px; padding:10px 8px; display:flex; align-items:center; gap:7px; }
.ia .cx-tile .ic{ width:28px; height:28px; border-radius:7px; background:var(--blue-100); color:var(--blue-900); display:flex; align-items:center; justify-content:center; flex:none; }
.ia .cx-tile .lbl{ font-size:11px; font-weight:600; line-height:1.15; white-space:nowrap; }
.ia .cx-tile .sub{ font-size:9px; color:var(--muted); font-family:${MONO}; letter-spacing:.06em; white-space:nowrap; }

.ia .ic svg{ width:18px; height:18px; }
.ia .ic.lg svg{ width:22px; height:22px; }
`;

/* Static, trusted markup ported verbatim from the design's `.page` body. */
const HTML = `
<div class="page">
  <div class="stage">
    <div class="grid-bg"></div>

    <svg class="svg-wires" viewBox="0 0 1368 780" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="iaGIn" x1="0" x2="1">
          <stop offset="0" stop-color="#1447D4" stop-opacity=".15"/>
          <stop offset=".5" stop-color="#1447D4" stop-opacity=".75"/>
          <stop offset="1" stop-color="#1447D4" stop-opacity=".95"/>
        </linearGradient>
        <linearGradient id="iaGOut" x1="1" x2="0">
          <stop offset="0" stop-color="#006FFF" stop-opacity=".15"/>
          <stop offset=".5" stop-color="#006FFF" stop-opacity=".75"/>
          <stop offset="1" stop-color="#006FFF" stop-opacity=".95"/>
        </linearGradient>
        <marker id="iaArrIn" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#1447D4"/>
        </marker>
        <marker id="iaArrOut" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#006FFF"/>
        </marker>
      </defs>

      <path d="M 277 233 C 340 233, 380 250, 414 280" stroke="url(#iaGIn)" stroke-width="2" fill="none" marker-end="url(#iaArrIn)"/>
      <path d="M 277 297 C 340 297, 380 305, 414 330" stroke="url(#iaGIn)" stroke-width="2" fill="none" marker-end="url(#iaArrIn)"/>
      <path d="M 277 361 C 340 361, 380 365, 414 370" stroke="url(#iaGIn)" stroke-width="2" fill="none" marker-end="url(#iaArrIn)"/>
      <path d="M 277 425 C 340 425, 380 415, 414 410" stroke="url(#iaGIn)" stroke-width="2" fill="none" marker-end="url(#iaArrIn)"/>
      <path d="M 277 489 C 340 489, 380 470, 414 450" stroke="url(#iaGIn)" stroke-width="2" fill="none" marker-end="url(#iaArrIn)"/>
      <path d="M 277 554 C 340 554, 380 520, 414 490" stroke="url(#iaGIn)" stroke-width="2" fill="none" marker-end="url(#iaArrIn)"/>

      <path d="M 954 305 C 1000 270, 1030 230, 1057 213" stroke="url(#iaGOut)" stroke-width="2" fill="none" marker-end="url(#iaArrOut)"/>
      <path d="M 954 360 C 1000 365, 1030 368, 1057 369" stroke="url(#iaGOut)" stroke-width="2" fill="none" marker-end="url(#iaArrOut)"/>
      <path d="M 954 415 C 1000 445, 1030 470, 1057 482" stroke="url(#iaGOut)" stroke-width="2" fill="none" marker-end="url(#iaArrOut)"/>
      <path d="M 954 470 C 1000 530, 1030 575, 1057 596" stroke="url(#iaGOut)" stroke-width="2" fill="none" marker-end="url(#iaArrOut)"/>

      <line x1="60" y1="730" x2="1308" y2="730" stroke="#E8ECF3" stroke-width="1" stroke-dasharray="2 6"/>
    </svg>

    <div class="cluster c-contact">
      <span class="title">Customer Contact · Omnichannel</span>
      <div class="grid">
        <div class="chip">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg></span>
          <div><div class="lbl">Voice</div></div>
        </div>
        <div class="chip">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></span>
          <div><div class="lbl">Email</div></div>
        </div>
        <div class="chip">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 1 1-3.4-6.8L21 4l-1 3.4A8.5 8.5 0 0 1 21 11.5z"/></svg></span>
          <div><div class="lbl">WhatsApp</div></div>
        </div>
        <div class="chip">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.5A8 8 0 1 1 21 12z"/></svg></span>
          <div><div class="lbl">Live Chat</div></div>
        </div>
        <div class="chip">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg></span>
          <div><div class="lbl">Web Widget</div></div>
        </div>
        <div class="chip">
          <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M8 7l8 0M7 8l4 8M17 8l-4 8"/></svg></span>
          <div>
            <div class="lbl">Social Media</div>
            <div class="socials">
              <span style="background:#1877F2">f</span>
              <span style="background:linear-gradient(135deg,#F58529,#DD2A7B,#8134AF)">IG</span>
              <span style="background:#000000">X</span>
              <span style="background:#0A66C2">in</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hub">
      <div class="hub-card">
        <div class="hub-head">
          <div class="hub-brand">
            <div class="hub-mark">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <div>
              <div class="hub-title">Unified Engagement Platform</div>
            </div>
          </div>
        </div>

        <div class="layer a">
          <div class="lhead">
            <div class="lname"><span>AI &amp; Human Collaboration</span></div>
            <span class="pill">Realtime</span>
          </div>
          <div class="row4">
            <div class="tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/><circle cx="12" cy="12" r="2"/></svg></span>
              <div class="lbl">AI Chatbot</div>
              <div class="sub">Chat</div>
            </div>
            <div class="tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></span>
              <div class="lbl">Human Agents</div>
              <div class="sub">Assist</div>
            </div>
            <div class="tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M7 14V11M11 14V8M15 14v-4M19 14V7"/></svg></span>
              <div class="lbl">Dashboards</div>
              <div class="sub">Live</div>
            </div>
            <div class="tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6"/></svg></span>
              <div class="lbl">AI Voice Bot</div>
              <div class="sub">Voice</div>
            </div>
          </div>
        </div>

        <div class="layer b">
          <div class="lhead">
            <div class="lname"><span>Case &amp; Ticket Management</span></div>
            <span class="pill">SLA-aware</span>
          </div>
          <div class="row2">
            <div class="case-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7h18M3 12h12M3 17h6"/><path d="m17 14 3 3-3 3"/></svg></span>
              <span class="lbl">Auto Classification</span>
            </div>
            <div class="case-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8 6h6a4 4 0 0 1 4 4v6"/></svg></span>
              <span class="lbl">Smart Routing</span>
            </div>
            <div class="case-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/></svg></span>
              <span class="lbl">Summarization</span>
            </div>
            <div class="case-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v6c0 4 3.5 7.5 9 9 5.5-1.5 9-5 9-9V7l-9-5z"/><path d="M9 11h6M9 14h4"/></svg></span>
              <span class="lbl">Knowledge Suggestions</span>
            </div>
          </div>
        </div>

        <div class="layer c">
          <div class="lhead">
            <div class="lname"><span>Customer Experience Orchestration</span></div>
            <span class="pill">Outbound &amp; Insight</span>
          </div>
          <div class="row4">
            <div class="cx-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 17v-1M9 14a3 3 0 0 1 6 0M6 11a6 6 0 0 1 12 0M3 8a9 9 0 0 1 18 0"/></svg></span>
              <div>
                <div class="lbl">Conversation</div>
                <div class="sub">Intelligence</div>
              </div>
            </div>
            <div class="cx-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3M8 21h8"/></svg></span>
              <div>
                <div class="lbl">AI Voice<br>Outbound</div>
                <div class="sub">Outbound</div>
              </div>
            </div>
            <div class="cx-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h8M8 13h8M8 17h5"/></svg></span>
              <div>
                <div class="lbl">Surveys</div>
                <div class="sub">Adaptive</div>
              </div>
            </div>
            <div class="cx-tile">
              <span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg></span>
              <div>
                <div class="lbl">Campaigns</div>
                <div class="sub">Journey</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="cluster alt c-enterprise">
      <span class="title">Enterprise Integration Layer</span>

      <div class="group">
        <h4>CRM</h4>
        <div class="logos">
          <div class="logo wide">Customer data and context</div>
        </div>
      </div>

      <div class="group">
        <h4>ERP</h4>
        <div class="logos">
          <div class="logo wide">Business processes</div>
        </div>
      </div>

      <div class="group">
        <h4>Telephony</h4>
        <div class="logos">
          <div class="logo wide">SIP Trunks · PBX · UCaaS</div>
        </div>
      </div>

      <div class="group">
        <h4>Business Applications</h4>
        <div class="logos">
          <div class="logo wide">Custom apps and workflows</div>
        </div>
      </div>

      <div class="group">
        <h4>Data Platforms</h4>
        <div class="logos">
          <div class="logo wide">Analytics and insights</div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

export default function ArchitectureDiagram() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="ia" style={{ width: ARCH_W }} dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
