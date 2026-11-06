"use client";
import { useEffect, useRef, useState } from "react";
import { caseStudy } from "@/content/site";
import Reveal from "./Reveal";
import ProductGallery from "./ProductGallery";

const chapters = [
  { id: "c1", label: "Performance" },
  { id: "c2", label: "Data layer" },
  { id: "c3", label: "Security" },
  { id: "c4", label: "Product engine" },
];

function LatencyRace() {
  const [t, setT] = useState(2660);
  const running = useRef(false);
  const box = useRef<HTMLDivElement>(null);
  const run = () => {
    if (running.current) return;
    running.current = true;
    const start = performance.now();
    const step = (now: number) => {
      const el = Math.min(now - start, 2660);
      setT(el);
      if (el < 2660) requestAnimationFrame(step); else running.current = false;
    };
    requestAnimationFrame(step);
  };
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { run(); io.disconnect(); } }, { threshold: 0.6 });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);
  const lane = (label: string, ms: number, cls: string) => {
    const p = Math.min(t, ms);
    const txt = p >= ms ? (ms === 100 ? "~100 ms" : `${ms.toLocaleString()} ms`) : `${Math.round(p).toLocaleString()} ms`;
    return (
      <div className={`lane ${cls}`}>
        <span className="mono">{label}</span>
        <div className="bar"><i style={{ transform: `scaleX(${p / 2660})` }} /></div>
        <span className="t num">{txt}</span>
      </div>
    );
  };
  const kept = t >= 2660 || t === 0;
  return (
    <div ref={box}>
      <div className="race">{lane("Before", 2660, "before")}{lane("After", 100, "after")}</div>
      <div className="race-foot">
        <div className="big26 num">26×</div>
        <button className="replay" type="button" onClick={run}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9M2.5 2.5v3h3" /></svg>
          Replay in real time
        </button>
      </div>
      <div className="reqs" aria-label="Requests per page reduced from 16 to 7">
        {Array.from({ length: 16 }, (_, i) => (
          <i key={i} className={i < 7 ? "kept" : kept ? "gone" : ""} style={{ transitionDelay: i < 7 ? "0s" : `${(i - 7) * 0.09}s` }} />
        ))}
        <span>16 → 7 requests per page</span>
      </div>
    </div>
  );
}

export default function CaseStudy() {
  const [active, setActive] = useState("c1");
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -45% 0px" });
    chapters.forEach((c) => { const el = document.getElementById(c.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <section id="case">
      <Reveal className="head">
        <div><span className="eyebrow">Featured case study</span><h2>One platform, owned <em>end to end.</em></h2></div>
        <p>How I took an enterprise service desk from slow and fragile to fast, cached and secure, as its sole frontend engineer.</p>
      </Reveal>

      <div className="case">
        <aside className="case-side">
          <span className="eyebrow">{caseStudy.client}</span>
          <h3>{caseStudy.title}</h3>
          <p>{caseStudy.summary}</p>
          <div className="facts">
            {caseStudy.facts.map((f) => (<div key={f.k}><span>{f.k}</span><b>{f.v}</b></div>))}
          </div>
          <nav className="progress" aria-label="Case study chapters">
            {chapters.map((c) => (<a key={c.id} href={`#${c.id}`} className={active === c.id ? "on" : undefined}><i />{c.label}</a>))}
          </nav>
        </aside>

        <div className="chapters">
          <Reveal as="article" className="ch"><div id="c1">
            <span className="tag">Performance</span>
            <h4>The ticket page went from 2.66 s to about 100 ms.</h4>
            <p>The Ticket Details page was the slowest screen agents used. I traced its main API call, cut what it fetched, and removed duplicate requests on load.</p>
            <LatencyRace />
            <ul>
              <li>Requests per page cut from ~16 to 7.</li>
              <li>Route-level code splitting across 6 pages, with icons loaded in chunks on demand.</li>
            </ul>
          </div></Reveal>

          <Reveal as="article" className="ch"><div id="c2">
            <span className="tag">Data layer</span>
            <h4>No more duplicate requests, races or stale SLA timers.</h4>
            <p>I migrated data fetching to TanStack Query so caching, deduping and invalidation have one owner instead of living in every component.</p>
            <div className="kpis">
              <div><b>12.5 MB</b><span>location dataset cached in IndexedDB</span></div>
              <div><b>24 h</b><span>cache expiry, then a fresh pull</span></div>
              <div><b>0</b><span>downloads for users who can&apos;t edit</span></div>
            </div>
          </div></Reveal>

          <Reveal as="article" className="ch"><div id="c3">
            <span className="tag">Security</span>
            <h4>Every audit finding closed.</h4>
            <p>A security audit flagged the platform. I fixed every finding in layers, from response headers down to how user content renders.</p>
            <ul>
              <li>Content Security Policy and clickjacking headers.</li>
              <li>Upload validation, plus DOMPurify sanitisation of user HTML.</li>
            </ul>
          </div></Reveal>

          <Reveal as="article" className="ch"><div id="c4">
            <span className="tag">Product engine</span>
            <h4>Forms admins configure, and SLAs that respect office hours.</h4>
            <p>A dynamic form engine with cascading fields lets admins shape ticket forms without a release. SLA tracking counts business hours only and flags breaches as they happen.</p>
            <div className="sla" aria-hidden="true">
              <div className="r"><span>P1 · Branch network down</span><span className="mono" style={{ color: "var(--warm)" }}>38 m left</span><div className="bar"><i style={{ width: "84%", background: "var(--warm)" }} /></div></div>
              <div className="r"><span>P2 · Email access after reset</span><span className="mono" style={{ color: "var(--muted)" }}>5 h 10 m</span><div className="bar"><i style={{ width: "40%", background: "var(--accent)" }} /></div></div>
              <div className="r"><span>P3 · Laptop request</span><span className="mono" style={{ color: "#F08A7A" }}>Breached</span><div className="bar"><i style={{ width: "100%", background: "#F08A7A" }} /></div></div>
            </div>
          </div></Reveal>
        </div>
      </div>

      <Reveal className="brief">
        {caseStudy.brief.map((b) => (<div key={b.k}><span>{b.k}</span><p>{b.v}</p></div>))}
      </Reveal>

      <ProductGallery />
    </section>
  );
}
