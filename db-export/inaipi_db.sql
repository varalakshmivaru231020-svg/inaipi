--
-- PostgreSQL database dump
--

\restrict W3VFEiKhRRmuUE5zbTyPXNWBg07PINR6aUuQTQNMGe8wM92sCaYfK0oVyNDAQjp

-- Dumped from database version 16.14 (Ubuntu 16.14-1.pgdg24.04+1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-1.pgdg24.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP INDEX IF EXISTS public."Resource_slug_key";
DROP INDEX IF EXISTS public."Job_slug_key";
DROP INDEX IF EXISTS public."Industry_slug_key";
DROP INDEX IF EXISTS public."Enquiry_createdAt_idx";
ALTER TABLE IF EXISTS ONLY public."Testimonial" DROP CONSTRAINT IF EXISTS "Testimonial_pkey";
ALTER TABLE IF EXISTS ONLY public."SiteImage" DROP CONSTRAINT IF EXISTS "SiteImage_pkey";
ALTER TABLE IF EXISTS ONLY public."Setting" DROP CONSTRAINT IF EXISTS "Setting_pkey";
ALTER TABLE IF EXISTS ONLY public."Seo" DROP CONSTRAINT IF EXISTS "Seo_pkey";
ALTER TABLE IF EXISTS ONLY public."Resource" DROP CONSTRAINT IF EXISTS "Resource_pkey";
ALTER TABLE IF EXISTS ONLY public."Job" DROP CONSTRAINT IF EXISTS "Job_pkey";
ALTER TABLE IF EXISTS ONLY public."Industry" DROP CONSTRAINT IF EXISTS "Industry_pkey";
ALTER TABLE IF EXISTS ONLY public."Enquiry" DROP CONSTRAINT IF EXISTS "Enquiry_pkey";
ALTER TABLE IF EXISTS ONLY public."Blog" DROP CONSTRAINT IF EXISTS "Blog_pkey";
DROP TABLE IF EXISTS public."Testimonial";
DROP TABLE IF EXISTS public."SiteImage";
DROP TABLE IF EXISTS public."Setting";
DROP TABLE IF EXISTS public."Seo";
DROP TABLE IF EXISTS public."Resource";
DROP TABLE IF EXISTS public."Job";
DROP TABLE IF EXISTS public."Industry";
DROP TABLE IF EXISTS public."Enquiry";
DROP TABLE IF EXISTS public."Blog";
-- *not* dropping schema, since initdb creates it
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

-- *not* creating schema, since initdb creates it


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Blog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Blog" (
    id text NOT NULL,
    title text NOT NULL,
    excerpt text DEFAULT ''::text NOT NULL,
    image text DEFAULT ''::text NOT NULL,
    category text DEFAULT ''::text NOT NULL,
    author text DEFAULT ''::text NOT NULL,
    date text DEFAULT ''::text NOT NULL,
    comments integer DEFAULT 0 NOT NULL,
    tags text[],
    content text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    documents jsonb DEFAULT '[]'::jsonb NOT NULL,
    html text DEFAULT ''::text NOT NULL
);


--
-- Name: Enquiry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Enquiry" (
    id text NOT NULL,
    name text DEFAULT ''::text NOT NULL,
    email text DEFAULT ''::text NOT NULL,
    subject text DEFAULT ''::text NOT NULL,
    message text DEFAULT ''::text NOT NULL,
    ip text DEFAULT ''::text NOT NULL,
    ua text DEFAULT ''::text NOT NULL,
    read boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Industry; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Industry" (
    id text NOT NULL,
    slug text NOT NULL,
    name text NOT NULL,
    sub text DEFAULT ''::text NOT NULL,
    icon text DEFAULT 'Building2'::text NOT NULL,
    "desc" text DEFAULT ''::text NOT NULL,
    "useCases" text[],
    content text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    documents jsonb DEFAULT '[]'::jsonb NOT NULL,
    html text DEFAULT ''::text NOT NULL,
    "iconUrl" text DEFAULT ''::text NOT NULL
);


--
-- Name: Job; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Job" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    type text DEFAULT 'Full time'::text NOT NULL,
    location text DEFAULT ''::text NOT NULL,
    salary text DEFAULT ''::text NOT NULL,
    "desc" text DEFAULT ''::text NOT NULL,
    responsibilities text[],
    requirements text[],
    offers text[],
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Resource; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Resource" (
    id text NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    excerpt text DEFAULT ''::text NOT NULL,
    image text DEFAULT ''::text NOT NULL,
    category text DEFAULT ''::text NOT NULL,
    html text DEFAULT ''::text NOT NULL,
    content text[],
    documents jsonb DEFAULT '[]'::jsonb NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Seo; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Seo" (
    page text NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    description text DEFAULT ''::text NOT NULL,
    keywords text DEFAULT ''::text NOT NULL,
    canonical text DEFAULT ''::text NOT NULL,
    "ogTitle" text DEFAULT ''::text NOT NULL,
    "ogDescription" text DEFAULT ''::text NOT NULL,
    "ogImage" text DEFAULT ''::text NOT NULL,
    noindex boolean DEFAULT false NOT NULL
);


--
-- Name: Setting; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Setting" (
    key text NOT NULL,
    value text DEFAULT ''::text NOT NULL
);


--
-- Name: SiteImage; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."SiteImage" (
    key text NOT NULL,
    value text DEFAULT ''::text NOT NULL
);


--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Testimonial" (
    id text NOT NULL,
    name text NOT NULL,
    role text DEFAULT ''::text NOT NULL,
    quote text DEFAULT ''::text NOT NULL,
    avatar text DEFAULT ''::text NOT NULL,
    stat text DEFAULT ''::text NOT NULL,
    "statLabel" text DEFAULT ''::text NOT NULL,
    stars integer DEFAULT 5 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    published boolean DEFAULT true NOT NULL,
    hidden boolean DEFAULT false NOT NULL
);


--
-- Data for Name: Blog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Blog" (id, title, excerpt, image, category, author, date, comments, tags, content, "createdAt", documents, html) FROM stdin;
1	The Future of AI in Customer Experience	Explore how artificial intelligence is transforming how businesses interact with their customers in 2024 and beyond. From predictive analytics to hyper-personalized support, discover why AI is no longer a luxury but a necessity for competitive edge.	https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop	Technology	Admin	March 28, 2024	4	{AI,CX,Innovation}	{"The landscape of customer experience (CX) is undergoing a monumental shift. Leading this charge is artificial intelligence, which is moving past basic automation and entering a new phase of proactive, empathetic, and hyper-personalized engagement.","Historically, contact centers have been reactive environments. A customer has a problem, they reach out, and an agent tries to solve it across disparate systems. Today, AI models are predicting customer friction before it happens, allowing enterprises to intercept issues and offer solutions proactively.","But the real magic happens when AI is blended with human empathy. Instead of replacing agents entirely, the most successful implementations are side-by-side: AI handles the repetitive triage and search tasks, while human agents are freed to handle complex, emotionally nuanced interactions.","As we look to the rest of 2024, the companies that thrive will be those that view AI not as a cost-cutting measure, but as an engine for deeper customer loyalty."}	2026-07-20 13:58:06.1	[]	
2	Scaling Your SaaS Business: Key Strategies	Moving from early-stage to high-growth requires more than just a great product. Learn the operational and marketing shifts needed to sustain exponential growth while maintaining product quality and customer satisfaction.	https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop	Business	Sarah Chen	March 24, 2024	2	{SaaS,Growth,Strategy}	{"Transitioning from a promising startup to a scaling SaaS enterprise introduces a completely new set of challenges. Early on, founder-led sales and unscalable customer support might work, but growth demands systemic changes.","The first critical shift is moving from acquisition-only focus to a retention-first mentality. Because acquiring a new enterprise customer costs significantly more than retaining an existing one, your customer success motion becomes the heartbeat of the company.","Secondly, scaling requires breaking down data silos. Marketing, sales, and support must operate from a single source of truth. If your sales team doesn't know what tickets an enterprise account has filed, churn becomes inevitable.","Lastly, pricing and packaging must evolve. Moving upmarket means dealing with complex procurement requirements and deploying enterprise-grade governance. Building secure, compliant infrastructure early on pays massive dividends later."}	2026-07-20 13:57:06.169	[]	
3	Design Systems for Modern Web Apps	Consistency and efficiency start with a robust design system. We break down the core components of successful systems used by top design teams to streamline their creative and engineering workflows.	https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop	Design	Marc Wood	March 15, 2024	0	{UX,Design,Architecture}	{"A true design system is more than just a UI kit in Figma or a folder of components. It is the connective tissue between design, engineering, and product strategy.","When scaling an application, particularly an enterprise SaaS platform with hundreds of screens, establishing a shared vocabulary is critical. Without it, design debt accumulates rapidly, and every new feature takes progressively longer to release.","The best design systems act as boundaries that actually encourage creativity. Because designers no longer have to worry about padding, typography scales, or border states, they can focus entirely on solving deep user experience problems.","Building a system early, enforcing strict token adherence, and establishing clear contribution guidelines ensures your platform feels cohesive, premium, and trustworthy to every user who encounters it."}	2026-07-20 13:56:06.172	[]	
cmth7r8n8000714nh3zia8yhz	Inaipi CMS End-to-End Test	This is a complete CMS test post to verify rich content, images, links, document downloads and publishing.	/uploads/1788178562293-vwdsjnc84g.png	Technology	Gaurav Test	August 31, 2026	0	{CMS,Testing,Inaipi}	{"CMS End-to-End Test","This is the first paragraph of the CMS test. The purpose is to verify that content can be created, formatted, saved and published correctly.","Rich Text Formatting","This sentence checks bold, italic and underline formatting.","Key Features","Rich text editing","Image upload",Links,"Document downloads","Lead capture before download","Important Note","This is a test article for verifying the complete Inaipi content-management workflow.","Visit Inaipi Website",https://inaipi.zapeat.in/}	2026-08-31 12:27:31.061	[{"url": "/uploads/1788179112479-o1ncp9r79hj.pdf", "name": "Inaipi_CMS_Test_Document.pdf"}]	<blockquote><span><b><i><u>CMS End-to-End Test</u></i></b></span></blockquote><p><span><b><i><br></i></b></span></p><p><ol><li><span><b><i>This is the first paragraph of the CMS test. The purpose is to verify that content can be created, formatted, saved and published correctly.</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i>Rich Text Formatting</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i>This sentence checks bold, italic and underline formatting.</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i>Key Features</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i>Rich text editing</i></b></span></li><li><span><b><i>Image upload</i></b></span></li><li><span><b><i>Links</i></b></span></li><li><span><b><i>Document downloads</i></b></span></li><li><span><b><i>Lead capture before download</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i>Important Note</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i>This is a test article for verifying the complete Inaipi content-management workflow.</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i>Visit Inaipi Website</i></b></span></li><li><span><b><i><br></i></b></span></li><li><span><b><i><a href="https://">https://inaipi.zapeat.in/</a></i></b></span></li></ol></p>
cmu7yxkhr0000n2w9kvt922wy	Blog Lead Enable Disable Test	Testing	/uploads/1789796982599-yjuab26u7r.png	Business	Admin	September 19, 2026	0	{test}	{}	2026-09-19 05:50:16.575	[{"url": "/uploads/1789797008463-zyv9o76xwp.pdf", "name": "Inaipi_CMS_Test_Document (2) (1).pdf", "gated": false}]	
\.


--
-- Data for Name: Enquiry; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Enquiry" (id, name, email, subject, message, ip, ua, read, "createdAt") FROM stdin;
cmth8r6cc000a14nhvciaz426	Gaurav Singh	gaurav@gmail.com	Download: Inaipi_CMS_Test_Document.pdf	Buyer Resource: Inaipi Buyer Resource Test\nDocument: Inaipi_CMS_Test_Document.pdf\nFile: /uploads/1788180331256-9npmfpsbzje.pdf\nCompany: Inapi	49.36.215.244	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	t	2026-08-31 12:55:27.708
cmth80uha000814nhxiipu02l	Gaurav Test	gauravtest@example.com	Download: Inaipi_CMS_Test_Document.pdf	Blog post: Inaipi CMS End-to-End Test\nDocument: Inaipi_CMS_Test_Document.pdf\nFile: /uploads/1788179112479-o1ncp9r79hj.pdf\nCompany: Test Company	49.36.215.244	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	t	2026-08-31 12:34:59.266
cmth55kbt000214nhd7xebur2	E2E Lead mth54sc0	e2e-mth54sc0@example.com	Download: probe-mth54sc0.pdf	Blog post: E2E Post mth54sc0\nDocument: probe-mth54sc0.pdf\nFile: /uploads/1788174864124-n3iyoe1stl.pdf\nCompany: Automated Check	49.36.215.244	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36	t	2026-08-31 11:14:40.553
cmth49hpw000114e05jdsp2p8	E2E Lead mth48q50	e2e-mth48q50@example.com	Download: probe-mth48q50.pdf	Blog post: E2E Post mth48q50\nDocument: probe-mth48q50.pdf\nFile: /uploads/1788173367987-4n8jdlelryk.pdf\nCompany: Automated Check	49.36.215.244	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36	t	2026-08-31 10:49:44.18
cmth40dff000110t5u287lsw3	E2E Lead mth3zljm	e2e-mth3zljm@example.com	Download: probe-mth3zljm.pdf	Blog post: E2E Post mth3zljm\nDocument: probe-mth3zljm.pdf\nFile: /uploads/1788172939252-13qifvl0lz1.pdf\nCompany: Automated Check	49.36.215.244	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/151.0.7922.34 Safari/537.36	t	2026-08-31 10:42:38.715
cmu2pibl4000442gpkokfg543	kishor Reddy	kishorreddy992@gmail.com	Download: MOBILE APP BUG SHEET - Sheet1 (2).pdf	Blog post: Test Blog\nDocument: MOBILE APP BUG SHEET - Sheet1 (2).pdf\nFile: /uploads/1789468489416-nvonjflvfo9.pdf	103.252.25.146	Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	f	2026-09-15 13:27:37.767
cmu7wrlc30001rlbqd1lf7w53	gaurav	developers.bluewitcher@gmail.com	Download: Inaipi_CMS_Test_Document (2).pdf	Blog post: gud\nDocument: Inaipi_CMS_Test_Document (2).pdf\nFile: /uploads/1789793086547-5bagsdeyuqk.pdf\nCompany: mls\nPhone: +91 9696342161	152.56.144.130	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36	f	2026-09-19 04:49:38.499
cmu81wp7r0001n2w9zkfow3li	Krishna Prabhu	krishnapraveenprabhu@gmail.com	Download: Inaipi - The Enterprise Contact Center Buyer's Guide.pdf	Buyer Resource: The Enterprise Contact Center Buyer’s Guide\nDocument: Inaipi - The Enterprise Contact Center Buyer's Guide.pdf\nFile: /uploads/1789490138682-2mrln9kpgy.pdf\nCompany: Inaipi\nPhone: +91 8921096937	49.37.235.46	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36 Edg/153.0.0.0	t	2026-09-19 07:13:34.887
\.


--
-- Data for Name: Industry; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Industry" (id, slug, name, sub, icon, "desc", "useCases", content, "createdAt", documents, html, "iconUrl") FROM stdin;
cmtgu3ucb0000dlbk7f5qzirw	healthcare	Healthcare	Life Sciences	Heart	Appointment management, patient engagement & surveys, grievance handling across every channel.	{"Appointment Automation","Patient Surveys","Grievance Mgmt"}	{}	2026-08-31 06:04:18.29	[]		
cmtgu3uci0001dlbk9kauz3o5	insurance	Insurance	Advisory & Claims	ShieldHalf	Claims triage, policy inquiry automation and AI-powered renewal follow-ups at scale.	{"Claims Servicing","Policy Inquiries","Renewal AI"}	{}	2026-08-31 06:05:18.392	[]		
cmtgu3ucm0002dlbkia9y0v6f	hospitality	Hospitality	Travel & Hotels	Plane	Pre-stay to post-stay guest engagement, booking support and loyalty management.	{"Guest Journey","Service Requests",Loyalty}	{}	2026-08-31 06:06:18.399	[]		
cmtgu3ucr0003dlbk331xiwz0	education	Education	Public Sector	GraduationCap	Student helpdesk, admissions inquiries and multi-channel feedback workflows at scale.	{"Student Support",Admissions,Feedback}	{}	2026-08-31 06:07:18.409	[]		
cmtgu3ucx0004dlbk049f232y	government	Government	Public Services	Landmark	Citizen services, complaint management and compliant omnichannel CX with Arabic support.	{"Citizen Services","Arabic Support","Audit Compliant"}	{}	2026-08-31 06:08:18.421	[]		
cmtgu3ud00005dlbkqvjff815	telecom-retail	Telecom & Retail	Commerce	ShoppingBag	High-volume omnichannel support with NPS tracking and AI-powered churn prediction.	{Omnichannel,"NPS Tracking","Churn AI"}	{}	2026-08-31 06:09:18.426	[]		
cmtgxc4iq0003x97mfjxcwq8j	test-industry	Test Industry	Test Industry sub	Heart	dd.   descrptionn	{hhhh,hbhubuh,gygwdsuywvd}	{dwsdwww}	2026-08-31 07:35:49.731	[]		
cmu2jkzjh000242gp107ywq05	test-heathcare	Test Heathcare	life Science	ShieldHalf	Discover how innovation and technology are transforming healthcare by improving patient care, streamlining operations, enabling smarter diagnosis, and creating more accessible, efficient, and personalized healthcare solutions.	{"AI-Powered Diagnosis",Telemedicine,"Patient Management","Remote Patient Monitoring"}	{"AI-Powered Diagnosis – Assist doctors in identifying diseases and medical conditions faster and more accurately.","Telemedicine – Enable patients to consult healthcare professionals remotely.","Patient Management – Digitize appointments, medical records, prescriptions, and follow-ups.","Remote Patient Monitoring – Track vital signs and health data using connected devices.","Predictive Healthcare – Analyze patient data to identify potential health risks early.","Medical Data Analytics – Turn healthcare data into actionable insights for better decision-making.","Hospital Automation – Automate administrative workflows, billing, scheduling, and resource management.","Personalized Treatment – Use patient data to support customized treatment and care plans.","Healthcare Chatbots – Provide patients with instant assistance for common questions, appointments, and health information.","Drug & Inventory Management – Improve tracking and management of medicines, equipment, and medical supplies."}	2026-09-15 10:41:44.43	[{"url": "/uploads/1789468901513-kp2z2l2du4c.pdf", "name": "MOBILE APP BUG SHEET - Sheet1 (2).pdf", "gated": true}]	<li><strong>AI-Powered Diagnosis</strong> – Assist doctors in identifying diseases and medical conditions faster and more accurately.\n</li>\n<li>\n<strong>Telemedicine</strong> – Enable patients to consult healthcare professionals remotely.\n</li>\n<li>\n<strong>Patient Management</strong> – Digitize appointments, medical records, prescriptions, and follow-ups.\n</li>\n<li>\n<strong>Remote Patient Monitoring</strong> – Track vital signs and health data using connected devices.\n</li>\n<li>\n<strong>Predictive Healthcare</strong> – Analyze patient data to identify potential health risks early.\n</li>\n<li>\n<strong>Medical Data Analytics</strong> – Turn healthcare data into actionable insights for better decision-making.\n</li>\n<li>\n<strong>Hospital Automation</strong> – Automate administrative workflows, billing, scheduling, and resource management.\n</li>\n<li>\n<strong>Personalized Treatment</strong> – Use patient data to support customized treatment and care plans.\n</li>\n<li>\n<strong>Healthcare Chatbots</strong> – Provide patients with instant assistance for common questions, appointments, and health information.\n</li>\n<li>\n<strong>Drug &amp; Inventory Management</strong> – Improve tracking and management of medicines, equipment, and medical supplies.</li>	
\.


--
-- Data for Name: Job; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Job" (id, slug, title, type, location, salary, "desc", responsibilities, requirements, offers, "createdAt") FROM stdin;
1	senior-cx-consultant	Senior CX Consultant	Full time	Dubai, UAE	Competitive	We're looking for a Senior CX Consultant to drive enterprise CX transformation with AI-native solutions, working directly with regional clients across MEA and APAC. You'll be the bridge between client needs and our platform capabilities.	{"Lead CX strategy workshops with enterprise clients across MEA and APAC","Map customer journeys and identify optimization opportunities using our platform","Collaborate with product and engineering teams to translate client needs into solutions","Manage end-to-end implementation of omnichannel CX solutions","Build and maintain long-term client relationships at C-suite level"}	{"5+ years of experience in CX consulting or contact center transformation","Deep understanding of omnichannel customer engagement strategies","Experience working with enterprise clients in MEA or APAC regions","Familiarity with AI/ML applications in customer service","Excellent communication and presentation skills"}	{"Work on cutting-edge AI-native CX technology","Collaborative, innovation-driven environment","Competitive compensation with performance bonuses","Opportunity to shape CX strategy for leading enterprises","Flexible work arrangements"}	2026-07-20 13:58:06.174
2	product-designer	Product Designer	Full time	Bengaluru, India	Competitive	We're looking for a creative and detail-oriented Product Designer to join our team. You'll be responsible for designing intuitive, user-centered digital experiences across web and mobile platforms for our AI-native CX platform.	{"Translate product requirements into wireframes, prototypes, and high-fidelity designs","Design pixel-perfect UI for web and mobile applications","Collaborate with cross-functional teams including engineering and product","Conduct user research and usability testing to validate design decisions","Deliver well-organized Figma files with design systems and components"}	{"2–5+ years of experience in UI/UX or Product Design","Proficiency in Figma, Sketch, or similar design tools","Strong portfolio demonstrating user-centered design thinking","Understanding of UX principles, accessibility, and responsive design","Excellent visual design skills and attention to detail"}	{"Collaborative and creative work culture","Direct impact on product design decisions","Competitive compensation and benefits","Learning and growth opportunities","Modern tech stack and tools"}	2026-07-20 13:57:06.176
3	full-stack-developer	Full Stack Developer	Full time	Chennai, India	Competitive	Build and scale our AI-native platform using modern frameworks, microservices architecture, and cloud infrastructure. You'll work on high-impact features that serve thousands of enterprise users.	{"Develop and maintain full-stack features using React/Next.js and Node.js","Design and implement RESTful APIs and microservices","Collaborate with AI/ML team to integrate intelligent features","Write clean, testable, and well-documented code","Participate in code reviews and architectural discussions"}	{"3+ years of experience in full-stack development","Strong proficiency in TypeScript, React, and Node.js","Experience with cloud platforms (AWS/GCP/Azure)","Understanding of database design and optimization","Experience with CI/CD pipelines and DevOps practices"}	{"Work on a platform used by 15,000+ enterprise customers","Modern tech stack with latest frameworks","Competitive salary and equity options","Remote-friendly work culture","Continuous learning and conference budgets"}	2026-07-20 13:56:06.178
4	ai-ml-engineer	AI/ML Engineer	Full time	Bengaluru, India	Competitive	Develop and deploy AI models for voice agents, sentiment analysis, and intelligent routing across our CX platform. You'll push the boundaries of what's possible in AI-powered customer experience.	{"Design and train ML models for NLP, sentiment analysis, and voice AI","Build and optimize real-time inference pipelines","Collaborate with product teams to identify AI-driven feature opportunities","Evaluate and integrate third-party AI services and APIs","Monitor model performance and implement continuous improvement loops"}	{"3+ years of experience in ML/AI engineering","Strong proficiency in Python, TensorFlow/PyTorch","Experience with NLP, speech recognition, or conversational AI","Understanding of MLOps and model deployment practices","Published research or strong portfolio of ML projects is a plus"}	{"Work at the intersection of AI and enterprise CX","Access to cutting-edge AI infrastructure","Competitive compensation and growth path","Collaborate with industry experts","Conference attendance and research time"}	2026-07-20 13:55:06.18
6	customer-success-manager	Customer Success Manager	Full time	Dubai, UAE	Competitive	Ensure enterprise clients achieve measurable outcomes with our platform through onboarding, training, and strategic guidance. You'll be the trusted advisor for our most valuable accounts.	{"Onboard and train new enterprise clients on the platform","Develop and execute customer success plans with measurable KPIs","Conduct quarterly business reviews with client stakeholders","Identify upsell and expansion opportunities within accounts","Act as the voice of the customer internally to product and engineering"}	{"3+ years in customer success or account management for SaaS","Experience managing enterprise accounts with $100K+ ARR","Strong analytical skills and comfort with CX metrics","Excellent communication and relationship-building skills","Experience in CX, contact center, or related technology is preferred"}	{"Work with leading enterprises across MEA and APAC","Direct impact on customer retention and growth","Competitive salary with performance bonuses","Professional development opportunities","Flexible working arrangements"}	2026-07-20 13:53:06.183
5	sales-executive	Sales Executive, MEA	Full time	Dubai, UAE	Competitive	Own the sales cycle for enterprise accounts across the Middle East and Africa, selling our AI-native CX platform to banks, telecoms, healthcare, and government entities.	{"Identify and qualify enterprise prospects across MEA region","Lead product demonstrations and solution presentations","Manage full sales cycle from prospecting to contract closure","Build strategic relationships with C-suite decision makers","Collaborate with presales and solution architects on proposals"}	{"4+ years of enterprise SaaS sales experience in MEA","Track record of exceeding quota in B2B technology sales","Experience selling to financial services, telecom, or government sectors","Strong understanding of CX, contact center, or cloud communications","Arabic language skills are a strong plus"}	{"Uncapped commission structure","Sell a differentiated AI-native platform","Regional travel opportunities","Collaborative sales culture with strong presales support","Career growth into leadership roles"}	2026-07-20 13:54:06.181
\.


--
-- Data for Name: Resource; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Resource" (id, slug, title, excerpt, image, category, html, content, documents, "createdAt") FROM stdin;
cmu2jouok000342gpqxiqgg20	test-resources	The Contact Center Modernization Playbook	𝗠𝗼𝗱𝗲𝗿𝗻𝗶𝘇𝗶𝗻𝗴 𝗮 𝗰𝗼𝗻𝘁𝗮𝗰𝘁 𝗰𝗲𝗻𝘁𝗲𝗿 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝗮𝘂𝘁𝗼𝗺𝗮𝘁𝗶𝗰𝗮𝗹𝗹𝘆 𝗺𝗲𝗮𝗻 𝗺𝗶𝗴𝗿𝗮𝘁𝗶𝗼𝗻. \n\nThis playbook helps you assess what to preserve, modernize, overlay, or replace while reducing migration risk and creating a controlled transformation path with confidence.	/uploads/1789487609879-wgx7r6xlbl.png	Guide	<h4>Modernize Without Creating New Risk</h4><p>Legacy contact centers contain infrastructure, integrations, workflows, routing logic and operational knowledge. Replacing everything can create disruption before proving what needs to change.</p><p>This playbook gives you an approach:</p><ul>\n<li>\nDecide when to replace, modernize, or overlay the existing platform.\n</li>\n<li>\nIdentify capabilities worth keeping because they create value.\n</li>\n<li>\nSeparate constraints requiring change from investments that protect continuity.\n</li>\n<li>\nIntroduce AI across intelligence, assistance, automation, and orchestration.\n</li>\n<li>\nMeasure migration risk across telephony, journeys, integrations, and change dependencies.\n</li>\n<li>\nSequence transformation around business value and risk.\n</li>\n<li>\nFollow a 90-day path from discovery through validation and scale.\n</li>\n<li>\nBuild a modernization baseline before decisions.\n</li>\n<li>\nUse a readiness checklist to confirm whether you are prepared to migrate.\n</li>\n</ul><p>The playbook replaces “What should we replace?” with “What must change?”</p><p>\n\n\n\n\n</p><p>Download it to create a modernization plan that reduces uncertainty, protects operations, and creates a path toward AI-enabled customer experience.</p>	{"Modernize Without Creating New Risk","Legacy contact centers contain infrastructure, integrations, workflows, routing logic and operational knowledge. Replacing everything can create disruption before proving what needs to change.","This playbook gives you an approach:","Decide when to replace, modernize, or overlay the existing platform.","Identify capabilities worth keeping because they create value.","Separate constraints requiring change from investments that protect continuity.","Introduce AI across intelligence, assistance, automation, and orchestration.","Measure migration risk across telephony, journeys, integrations, and change dependencies.","Sequence transformation around business value and risk.","Follow a 90-day path from discovery through validation and scale.","Build a modernization baseline before decisions.","Use a readiness checklist to confirm whether you are prepared to migrate.","The playbook replaces “What should we replace?” with “What must change?”","Download it to create a modernization plan that reduces uncertainty, protects operations, and creates a path toward AI-enabled customer experience."}	[{"url": "/uploads/1789487360908-8bnr8vkokj4.pdf", "name": "Inaipi - The Contact Center Modernization Playbook.pdf"}]	2026-09-15 10:44:44.757
cmth8fbse000914nhz7w11n1j	inaipi-buyer-resource-test	AI Without Rip-And-Replace	𝗔𝗜 𝗮𝗱𝗼𝗽𝘁𝗶𝗼𝗻 𝗱𝗼𝗲𝘀 𝗻𝗼𝘁 𝗮𝗹𝘄𝗮𝘆𝘀 𝗿𝗲𝗾𝘂𝗶𝗿𝗲 𝗿𝗲𝗽𝗹𝗮𝗰𝗶𝗻𝗴 𝘆𝗼𝘂𝗿 𝗰𝗼𝗻𝘁𝗮𝗰𝘁 𝗰𝗲𝗻𝘁𝗲𝗿. \n\nThis guide shows how enterprises can introduce intelligence, automation, and orchestration while preserving valuable infrastructure, workflows, integrations and human oversight without unnecessary disruption.	/uploads/1789488477922-xu410sy9gj.png	Guide	<p></p><h4>Add AI Without Starting Over</h4><p>AI can create value without forcing a contact center replacement. The challenge is knowing where AI should enter and how adoption should progress.</p><p>This guide gives you a modernization path:</p><ul>\n<li>\nDetermine whether your environment needs an overlay, integration, or transformation.\n</li>\n<li>\nIdentify where AI can create value across customers, agents, workflows.\n</li>\n<li>\nIntroduce conversation intelligence, customer context, assistance, automation, and orchestration progressively.\n</li>\n<li>\nConnect AI to telephony, IVR, routing, CRM, enterprise systems and teams.\n</li>\n<li>\nStart with tasks before expanding into journeys.\n</li>\n<li>\nPrioritize use cases with high volume, clear rules, measurable value, and controlled risk.\n</li>\n<li>\nIncrease AI autonomy as confidence and governance mature.\n</li>\n<li>\nAssess environment, data, integration, risk, and scale through readiness checks.\n</li>\n</ul><p>Guide reframes AI modernization as a progression rather than a migration event.</p><p>\n\n\n\n\n</p><p>Download it to understand how you can preserve investments while adding intelligence, automation, and business value with less operational disruption.</p><p></p>	{"Add AI Without Starting Over","AI can create value without forcing a contact center replacement. The challenge is knowing where AI should enter and how adoption should progress.","This guide gives you a modernization path:","Determine whether your environment needs an overlay, integration, or transformation.","Identify where AI can create value across customers, agents, workflows.","Introduce conversation intelligence, customer context, assistance, automation, and orchestration progressively.","Connect AI to telephony, IVR, routing, CRM, enterprise systems and teams.","Start with tasks before expanding into journeys.","Prioritize use cases with high volume, clear rules, measurable value, and controlled risk.","Increase AI autonomy as confidence and governance mature.","Assess environment, data, integration, risk, and scale through readiness checks.","Guide reframes AI modernization as a progression rather than a migration event.","Download it to understand how you can preserve investments while adding intelligence, automation, and business value with less operational disruption."}	[{"url": "/uploads/1789488328773-0m1yff03lq7.pdf", "name": "Inaipi - AI Without Rip-And-Replace.pdf"}]	2026-08-31 12:46:14.895
cmu2w8crc000542gpn8mmpxmy	the-enterprise-contact-center-buyer-s-guide	The Enterprise Contact Center Buyer’s Guide	𝗖𝗵𝗼𝗼𝘀𝗶𝗻𝗴 𝗮 𝗰𝗼𝗻𝘁𝗮𝗰𝘁 𝗰𝗲𝗻𝘁𝗲𝗿 𝗽𝗹𝗮𝘁𝗳𝗼𝗿𝗺 𝗶𝗻𝘃𝗼𝗹𝘃𝗲𝘀 𝗺𝗼𝗿𝗲 𝘁𝗵𝗮𝗻 𝗰𝗼𝗺𝗽𝗮𝗿𝗶𝗻𝗴 𝗳𝗲𝗮𝘁𝘂𝗿𝗲𝘀. \n\nThis guide gives enterprise buyers a practical framework to evaluate customer experience, AI, architecture, security, resilience, integrations and total cost before you buy.	/uploads/1789490055151-kgqyyw3g5c.png	Guide	<h4>Evaluate the Platform Behind the Demo</h4><p>A contact center decision affects customer experience, operations, technology, security, AI adoption and economics. Yet many evaluations begin with features and demonstrations.</p><p>This guide gives you a buyer lens:</p><ul>\n<li>\nDefine the customer experience you must deliver.\n</li>\n<li>\nEvaluate AI capabilities beyond demos.\n</li>\n<li>\nAssess workflows, automation, integrations, resilience, and systems.\n</li>\n<li>\nCompare on-premise, private cloud, public cloud, and hybrid deployment models.\n</li>\n<li>\nExamine security, governance, data protection, and operational control.\n</li>\n<li>\nSeparate initial investment from recurring operating costs.\n</li>\n<li>\nApply requirements and scoring dimensions across vendors.\n</li>\n<li>\nValidate capabilities through evidence, references, and production testing.\n</li>\n<li>\nBuild a buyer scorecard for technical and procurement review.\n</li>\n</ul><p>The guide shifts the conversation from “Which platform has more features?” to “Which operating model fits our environment?”</p><p>\n\n\n\n\n</p><p>Download it before your evaluation, RFP, or vendor demonstration. It gives your team a framework for asking better questions and defending the final decision.</p>	{"Evaluate the Platform Behind the Demo","A contact center decision affects customer experience, operations, technology, security, AI adoption and economics. Yet many evaluations begin with features and demonstrations.","This guide gives you a buyer lens:","Define the customer experience you must deliver.","Evaluate AI capabilities beyond demos.","Assess workflows, automation, integrations, resilience, and systems.","Compare on-premise, private cloud, public cloud, and hybrid deployment models.","Examine security, governance, data protection, and operational control.","Separate initial investment from recurring operating costs.","Apply requirements and scoring dimensions across vendors.","Validate capabilities through evidence, references, and production testing.","Build a buyer scorecard for technical and procurement review.","The guide shifts the conversation from “Which platform has more features?” to “Which operating model fits our environment?”","Download it before your evaluation, RFP, or vendor demonstration. It gives your team a framework for asking better questions and defending the final decision."}	[{"url": "/uploads/1789490138682-2mrln9kpgy.pdf", "name": "Inaipi - The Enterprise Contact Center Buyer's Guide.pdf", "gated": true}]	2026-09-15 16:35:50.039
\.


--
-- Data for Name: Seo; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Seo" (page, title, description, keywords, canonical, "ogTitle", "ogDescription", "ogImage", noindex) FROM stdin;
\.


--
-- Data for Name: Setting; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Setting" (key, value) FROM stdin;
show_testimonials	true
customerLogos	[{"url":"/demo-logos/logo-1.svg","name":"Demo logo 1: replace with customer artwork","hidden":false},{"url":"/demo-logos/logo-2.svg","name":"Demo logo 2: replace with customer artwork","hidden":false},{"url":"/demo-logos/logo-3.svg","name":"Demo logo 3: replace with customer artwork","hidden":false},{"url":"/demo-logos/logo-4.svg","name":"Demo logo 4: replace with customer artwork","hidden":false},{"url":"/demo-logos/logo-5.svg","name":"Demo logo 5: replace with customer artwork","hidden":false},{"url":"/demo-logos/logo-6.svg","name":"Demo logo 6: replace with customer artwork","hidden":false},{"url":"/demo-logos/logo-7.svg","name":"Demo logo 7: replace with customer artwork","hidden":false},{"url":"/demo-logos/logo-8.svg","name":"Demo logo 8: replace with customer artwork","hidden":false}]
show_trust_logos	true
lead_gate_blog	true
lead_gate_resource	true
lead_gate_industry	true
\.


--
-- Data for Name: SiteImage; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."SiteImage" (key, value) FROM stdin;
architectureImage	/arch1.png
agentDesktopImage	
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Testimonial" (id, name, role, quote, avatar, stat, "statLabel", stars, "createdAt", published, hidden) FROM stdin;
1	Dr. Sarah Al Mansouri	Chief Digital Officer · Aster DM Healthcare	Inaipi transformed how we handle patient communications. Our response time dropped from 12 minutes to under 45 seconds, and patient satisfaction scores have never been higher.	https://i.pravatar.cc/150?img=25	94%	CSAT Score	5	2026-07-20 13:58:06.186	t	f
3	Priya Nambiar	Head of Customer Operations · AXA Gulf Insurance	The AI co-pilot is a game changer. Our agents resolve complex insurance claims 3× faster with AI suggestions right in their workspace. Implementation was seamless.	https://i.pravatar.cc/150?img=43	3×	Faster Resolution	5	2026-07-20 13:56:06.19	t	f
4	Khalid Al-Mansouri	Director of Digital Services · Abu Dhabi Municipality	Deploying across 14 regional offices felt impossible before Inaipi. Governance controls and multi-language support gave us compliance confidence we never had with our legacy system.	https://i.pravatar.cc/150?img=15	14×	Offices Unified	5	2026-07-20 13:55:06.192	t	f
2	Mohammed Al Rashid	VP Customer Experience · Emirates NBD	We handle over 50,000 customer interactions daily across 8 channels. Inaipi unified everything into one platform. Our agents are more productive and our customers are happier.	https://i.pravatar.cc/150?img=60	67%	Cost Reduction	5	2026-07-20 13:57:06.188	t	f
5	James Thornton	CX Strategy Lead · Majid Al Futtaim	Real-time sentiment analysis has been invaluable. We now catch dissatisfied customers before they escalate and the proactive outreach has dramatically improved our NPS.	https://i.pravatar.cc/150?img=47	+42	NPS Improvement	5	2026-07-20 13:54:06.193	t	f
\.


--
-- Name: Blog Blog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Blog"
    ADD CONSTRAINT "Blog_pkey" PRIMARY KEY (id);


--
-- Name: Enquiry Enquiry_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Enquiry"
    ADD CONSTRAINT "Enquiry_pkey" PRIMARY KEY (id);


--
-- Name: Industry Industry_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Industry"
    ADD CONSTRAINT "Industry_pkey" PRIMARY KEY (id);


--
-- Name: Job Job_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);


--
-- Name: Resource Resource_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Resource"
    ADD CONSTRAINT "Resource_pkey" PRIMARY KEY (id);


--
-- Name: Seo Seo_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Seo"
    ADD CONSTRAINT "Seo_pkey" PRIMARY KEY (page);


--
-- Name: Setting Setting_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Setting"
    ADD CONSTRAINT "Setting_pkey" PRIMARY KEY (key);


--
-- Name: SiteImage SiteImage_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."SiteImage"
    ADD CONSTRAINT "SiteImage_pkey" PRIMARY KEY (key);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: Enquiry_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Enquiry_createdAt_idx" ON public."Enquiry" USING btree ("createdAt");


--
-- Name: Industry_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Industry_slug_key" ON public."Industry" USING btree (slug);


--
-- Name: Job_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Job_slug_key" ON public."Job" USING btree (slug);


--
-- Name: Resource_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Resource_slug_key" ON public."Resource" USING btree (slug);


--
-- PostgreSQL database dump complete
--

\unrestrict W3VFEiKhRRmuUE5zbTyPXNWBg07PINR6aUuQTQNMGe8wM92sCaYfK0oVyNDAQjp

