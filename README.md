# Kazi Md. Shahrukh Hossain · Portfolio

Personal portfolio for senior frontend / fullstack roles. Built with Next.js 15 (App Router), React 19, TypeScript, Framer Motion and Lenis.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

Requires Node.js 18.18 or newer.

## Edit the content

All copy lives in **`content/site.ts`**: profile links, hero text, stats, clients, the WINGS case study, featured SaaS, notes, posts, skills and career. Components only render that data, so most updates are a one-file change.

Assets in `public/`:

- `headshot.jpg` — About section photo
- `Kazi_Md_Shahrukh_Hossain_Resume.pdf` — linked from the nav and contact section
- `icon.svg` — favicon

Before going live, set `profile.siteUrl` in `content/site.ts` to your real domain (used for link previews).

## Structure

```
app/
  layout.tsx        fonts (next/font), metadata, smooth scroll
  page.tsx          section order
  globals.css       design tokens and all styles
components/
  Hero, DotField    hero with the cursor-reactive dot grid and count-up stats
  Clients           client names and the stack marquee
  Featured          multi-tenant SaaS with live link and animated tenant map
  CaseStudy         WINGS ITSM: sticky chapters, latency race, request counter
  ProductGallery    recreated WINGS screens (sample data) in a browser frame
  Work              selected work bento, including eTender contributions
  Notes, About, Career, Principles, Writing, Contact
  Reveal, Magnetic, CountUp, SmoothScroll   small motion helpers
content/site.ts     all page content
```

## Key decisions

- **Content separate from components.** Copy changes never touch JSX.
- **Server components by default.** Only interactive parts (`"use client"`) ship JavaScript: the dot field, timers, gallery panes and scroll effects.
- **Motion respects the viewer.** Every animation is skipped under `prefers-reduced-motion`, and content renders complete before any animation runs.
- **No client data.** The WINGS screens are recreated with sample names and neutral branding.
- **Security headers** (`X-Frame-Options`, `nosniff`, referrer policy) set in `next.config.ts`.

## Deploy

Push to GitHub and import the repo in Vercel; no configuration needed. Add your custom domain in the Vercel project settings.

## Known limits

- Fonts load from Google Fonts at build time through `next/font`, so the build machine needs internet access.
- The multi-tenant SaaS link opens a sign-in page; visitors need demo credentials.
