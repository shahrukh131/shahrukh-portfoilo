"use client";
import { useEffect, useRef, useState } from "react";
import { caseStudy } from "@/content/site";
import Reveal from "./Reveal";
import ProductGallery from "./ProductGallery";

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
  return (
    <section id="case">
      <Reveal className="head">
        <div><span className="eyebrow">Featured case study</span><h2>One platform, owned <em>end to end.</em></h2></div>
        <p>An enterprise service desk taken from slow and fragile to fast, cached and secure, as its sole frontend engineer.</p>
      </Reveal>

      <div className="case">
        <aside className="case-side">
          <span className="eyebrow">{caseStudy.client}</span>
          <h3>{caseStudy.title}</h3>
          <p>{caseStudy.summary}</p>
          <div className="facts">
            {caseStudy.facts.map((f) => (<div key={f.k}><span>{f.k}</span><b>{f.v}</b></div>))}
          </div>
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

        </div>
      </div>

      <Reveal className="brief">
        {caseStudy.brief.map((b) => (<div key={b.k}><span>{b.k}</span><p>{b.v}</p></div>))}
      </Reveal>

      <ProductGallery />
    </section>
  );
}
