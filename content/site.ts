// All page copy lives here. Edit this file to update the portfolio; components only render it.

export const profile = {
  name: "Kazi Md. Shahrukh Hossain",
  shortName: "Shahrukh",
  role: "Senior Frontend / Fullstack Engineer",
  location: "Dhaka",
  email: "shahrukhakib@gmail.com",
  linkedin: "https://www.linkedin.com/in/kazi-md-shahrukh-hossain-akib/",
  linkedinHandle: "kazi-md-shahrukh-hossain-akib",
  github: "https://github.com/shahrukh131",
  githubHandle: "shahrukh131",
  resume: "/Kazi_Md_Shahrukh_Hossain_Resume.pdf",
  siteUrl: "https://shahrukh.dev", // change to your real domain
};

export const hero = {
  headline: ["I", "make", "enterprise", "software"],
  highlight: "feel fast.",
  intro:
    "focused on React, Next.js and TypeScript for data-heavy enterprise products, with full-stack depth in NestJS and SQL.",
  introTail: "in production; today I own frontend architecture and lead a team of three. Looking for a senior frontend or fullstack role.",
};

export type Stat = { value: string; count?: number; suffix?: string; label: string };
export const stats: Stat[] = [
  { value: "26×", count: 26, suffix: "×", label: "faster ticket-details API call on WINGS ITSM" },
  { value: "5+", count: 5, suffix: "+", label: "years building production web platforms" },
  { value: "16→7", label: "requests per page after moving data fetching to TanStack Query" },
  { value: "IEEE", label: "published in ML-based image detection" },
];

export const clients = [
  { name: "BRAC", note: "NGO · Bangladesh" },
  { name: "BRAC Bank", note: "Banking · Bangladesh" },
  { name: "BAT Bangladesh", note: "Manufacturing" },
  { name: "Medela", note: "ITSM · Switzerland" },
  { name: "Runner Group", note: "Automotive · Bangladesh" },
];

export const stack = [
  "React", "Next.js App Router", "TypeScript", "TanStack Query", "Redux Toolkit", "Zustand",
  "React Hook Form", "Zod", "Tailwind CSS", "shadcn/ui", "NestJS", "PostgreSQL", "Redis",
  "BullMQ", "Socket.IO", "Laravel", "Docker", "CI/CD",
];

export const caseStudy = {
  client: "BRAC · Apsis Solutions",
  title: "WINGS ITSM",
  summary:
    "The IT service management platform BRAC staff use to raise, route and resolve support tickets every working day.",
  facts: [
    { k: "Role", v: "Sole frontend engineer" },
    { k: "Users", v: "10 BRAC staff" },
    { k: "Load", v: "20–30 tickets / day" },
    { k: "Stack", v: "Next.js · TanStack Query" },
  ],
  brief: [
    { k: "Problem", v: "Agents waited 2.66 s for every ticket. The page fired ~16 requests, components fetched the same data separately, SLA timers went stale and a security audit had open findings." },
    { k: "My role", v: "Sole frontend engineer. I owned architecture, the data layer, performance and security fixes." },
    { k: "Key decisions", v: "One owner for server data (TanStack Query) instead of per-component fetching. A 12.5 MB location list cached in IndexedDB for 24 h, loaded only for users who can edit: a day of staleness accepted in exchange for instant forms." },
    { k: "How I verified", v: "Before and after timing of the ticket page's main API call, request counts per page, and a re-check of each security audit finding after the fix." },
    { k: "Result", v: "Main API call 26× faster, requests per page down from ~16 to 7, audit findings closed, and a platform 10 BRAC staff rely on for 20–30 tickets a day." },
  ],
};

export const notes = [
  {
    tag: "SLA · Time",
    title: "Counting only working hours",
    body: "A P2 ticket raised Thursday at 3:30 PM with 8 working hours is due Sunday afternoon, not Thursday night. The calculator walks forward day by day: skip non-working days, clamp to opening time, spend what is left of the day, carry the rest over. The same function drives the countdown, the progress bar and breach detection, so the three never disagree.",
  },
  {
    tag: "Data · Caching",
    title: "A 12.5 MB list that loads instantly",
    body: "Location data is large and rarely changes. I cache it in IndexedDB with a 24-hour expiry and fetch it only for users with edit rights, since read-only users never open those dropdowns. The tradeoff is up to a day of staleness on data that changes rarely.",
  },
  {
    tag: "Security · Audit",
    title: "Closing a security audit on the frontend",
    body: "Fixes went in layers: a Content Security Policy and clickjacking headers at the edge, upload validation for file type and size, and DOMPurify on any user HTML before it renders.",
  },
  {
    tag: "Backend · Data access",
    title: "A typed repository instead of an ORM",
    body: "For my multi-tenant SaaS I compared Prisma, TypeORM, Drizzle and Kysely. Schema-per-tenant PostgreSQL needs control over the search path on every query, so I chose raw pg behind a typed BaseRepository: SQL I can read, types at the boundary, and no ORM fighting the tenancy model.",
  },
];

export const posts = [
  { day: "Day 2 · English", title: "What happens when you type a URL and press Enter", summary: "DNS, TCP, TLS, HTTP and rendering, and why “the internet is slow” is never enough of a diagnosis.", url: "https://lnkd.in/p/ghbJvT3t" },
  { day: "Day 6 · Bangla", title: "Vertical vs horizontal scaling", summary: "A bigger server or more servers, and the routing problem that more servers create.", url: "https://lnkd.in/p/g6ueAsQM" },
  { day: "Day 7 · Bangla", title: "Load balancing, with NGINX in a real project", summary: "Round robin, least connections, health checks, and why in-memory sessions push you toward stateless servers.", url: "https://lnkd.in/p/gCMQcekQ" },
];

export const now = [
  { k: "Learning", v: "System design in depth, written up as I go" },
  { k: "Building", v: "A multi-tenant warehouse and CMS SaaS on NestJS and PostgreSQL" },
  { k: "Looking for", v: "A senior frontend or fullstack role" },
];

export const about = [
  "I started in 2020 writing server-side modules at Flyte Solutions, moved to Laravel, React and Redux at VISERX, and since 2022 I have led frontend at Apsis Solutions. Most of my work is enterprise software for large organisations: service desks, approval systems and vendor portals that people use all day.",
  "The work I enjoy most is the unglamorous kind: a slow API call, a timer that drifts, a form that loses what you typed. Lately I have been going deeper into backend and system design, and writing about it in public.",
];

export const skills = [
  { icon: "ui", title: "Interface", items: "React · Next.js (App Router) · TypeScript · JavaScript · Tailwind CSS · shadcn/ui · MUI · Ant Design · Vite" },
  { icon: "state", title: "State & forms", items: "Redux Toolkit · Zustand · TanStack Query · React Hook Form · Zod" },
  { icon: "api", title: "Backend & data", items: "Node.js · NestJS · Express · Laravel · REST APIs · Sequelize · PostgreSQL · MySQL · SQL Server" },
  { icon: "rt", title: "Real-time & jobs", items: "Socket.IO · Redis · BullMQ · Meilisearch · Cloudflare R2" },
  { icon: "sec", title: "Auth & security", items: "JWT · OAuth / SSO (Microsoft, Google) · RBAC · CSP · XSS prevention" },
  { icon: "tool", title: "Delivery", items: "Docker · CI/CD · Git · Swagger · code review · AI-assisted development (Claude Code)" },
] as const;

export const career = [
  {
    when: "Jun 2022 – Present",
    company: "Apsis Solutions Ltd.",
    role: "Software Engineer · Frontend Lead",
    body: "Lead a 3-person frontend team and mentor two junior developers through code reviews and pairing. I own frontend architecture: state management, folder structure, a shared component library and coding standards, and maintain CI/CD for automated builds and deployments.",
    bullets: [
      "WINGS ITSM for BRAC, vendor onboarding portal, Avenir for BAT Bangladesh, eTender for BRAC Bank",
      "Vehicle Registration System for Runner Group, with role-based multi-level approvals and summary reports",
    ],
  },
  {
    when: "May 2021 – May 2022",
    company: "VISERX",
    role: "Software Engineer",
    body: "Built business systems end to end with Laravel, React and Redux.",
    bullets: [
      "NAF Spare Parts Sales & Inventory for Naf Group: internal sales and stock tracking for one of Bangladesh's established industrial groups",
      "An e-commerce platform, and a stock brokerage web app for Tasia Securities",
    ],
  },
  { when: "Mar 2020 – Apr 2021", company: "Flyte Solutions", role: "Junior Software Developer", body: "Built reusable server-side modules for frontend features, and found and fixed performance bottlenecks." },
  { when: "2019", company: "East West University", role: "BSc in Computer Science and Engineering" },
];

export const principles = [
  { k: "Own the architecture", v: "Clear folder structure, one data layer, a shared component library. Juniors ship faster when the right way is the easy way." },
  { k: "Measure, then fix", v: "Find the one slow thing before touching the rest. On WINGS, a single API call held most of the page's load time." },
  { k: "Guard the edges", v: "Sanitise input, validate uploads, set CSP. Enterprise users notice when something breaks, not when it works." },
  { k: "Use AI deliberately", v: "Claude Code with project context files, used to move faster on boilerplate while keeping review standards." },
];

export const publication = {
  meta: "Publication · IEEE · 2019",
  title: "Automated Detection of Plant Diseases Using Image Processing and Faster R-CNN",
  body: "Trained a Faster R-CNN model with the TensorFlow Object Detection API to find diseased regions on leaf images. Presented at STI 2019.",
  url: "https://ieeexplore.ieee.org/abstract/document/9068092",
};

export const featured = {
  eyebrow: "Featured · My own product · Live",
  title: "Multi-tenant CMS & Warehouse SaaS",
  summary:
    "One admin panel for many tenants: ecommerce, warehouse and marketplace businesses run orders, inventory, shipments and messaging from the same product, with each tenant's data isolated in its own PostgreSQL schema. I designed and built it end to end.",
  live: "https://multi-tenant-cms-prod.vercel.app/dashboard",
  liveNote: "Sign-in required. Demo access on request.",
  points: [
    { k: "Architecture", v: "NestJS modular monolith with schema-per-tenant PostgreSQL and a typed repository layer over raw pg." },
    { k: "Access", v: "Six-role permission hierarchy, from system admin to customer, tested across two tenants." },
    { k: "Real-time & jobs", v: "BullMQ background jobs, Socket.IO live updates, Meilisearch search and R2 file storage." },
  ],
  modules: ["Orders", "Inventory", "Shipments", "Messaging"],
  stack: ["NestJS", "PostgreSQL", "Redis", "BullMQ", "Socket.IO", "Meilisearch", "Cloudflare R2"],
};
