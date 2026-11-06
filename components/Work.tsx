"use client";
import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const steps = ["Applied", "Reviewer", "Delegate", "Approver", "Onboarded"];
const log = ["vendor submitted application", "reviewer added a comment", "reviewer delegated to deputy", "approver signed off", "vendor onboarded · audit closed"];

function ApprovalFlow() {
  const [n, setN] = useState(steps.length);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { if (!document.hidden) setN((x) => (x >= steps.length ? 1 : x + 1)); }, 1500);
    return () => clearInterval(id);
  }, []);
  const rows = log.slice(0, n).map((l, i) => `${pad(9 + Math.floor((i * 17) / 60))}:${pad((i * 17) % 60)}  ${l}`).reverse().slice(0, 3);
  return (
    <div className="vis">
      <div className="flow">
        {steps.map((s, i) => (
          <span key={s} style={{ display: "contents" }}>
            {i > 0 && <div className={`ln${i < n ? " done" : ""}`} />}
            <div className={`st${i < n ? " done" : ""}`}><i />{s}</div>
          </span>
        ))}
      </div>
      <div className="audit">{rows.map((r) => (<div key={r}>{r}</div>))}</div>
    </div>
  );
}
const pad = (x: number) => String(x).padStart(2, "0");

export default function Work() {
  return (
    <section id="work">
      <Reveal className="head">
        <div><span className="eyebrow">Selected work</span><h2>Full-stack when <em>it counts.</em></h2></div>
        <p>Portals, approval systems and platforms for BRAC, BRAC Bank, BAT Bangladesh, Medela and Runner Group.</p>
      </Reveal>
      <div className="bento">
        <Reveal as="article" className="card w4">
          <div className="meta"><span>Vendor &amp; subcontractor onboarding</span><span>Full-stack</span></div>
          <h3>CMS &amp; Sales Management Platform</h3>
          <p>Replaced a manual vendor registration and approval process with a full-stack portal: multi-step applications, configurable multi-level approvals and a weighted subcontractor safety scorecard.</p>
          <ApprovalFlow />
          <div className="chips">{["React 19", "Node.js", "Express", "Sequelize", "SQL Server", "RBAC", "Microsoft / Google SSO", "30+ entities"].map((c) => <span key={c}>{c}</span>)}</div>
        </Reveal>

        <Reveal as="article" className="card">
          <div className="meta"><span>BAT Bangladesh</span><span>2023</span></div>
          <h3>Avenir</h3>
          <p>Machine survey and approval platform. 15+ survey forms for Maker and Packer machines, 5 of them generated from API schemas.</p>
          <div className="vis">
            <div className="schema">
              <pre>{`{ `}<b>&quot;field&quot;</b>{`: "speed",\n  `}<b>&quot;type&quot;</b>{`: "number" },\n{ `}<b>&quot;field&quot;</b>{`: "shift",\n  `}<b>&quot;type&quot;</b>{`: "select" },\n{ `}<b>&quot;field&quot;</b>{`: "notes" }`}</pre>
              <div className="ff"><div data-l="Speed" /><div data-l="Shift ▾" style={{ animationDelay: ".1s" }} /><div data-l="Notes" style={{ animationDelay: ".2s" }} /></div>
            </div>
          </div>
          <div className="chips"><span>React</span><span>Redux</span><span>3-level approvals</span></div>
        </Reveal>

        <Reveal as="article" className="card w3">
          <div className="meta"><span>genofax.com</span><span>Migration</span></div>
          <h3>Next.js 12 → 15 rebuild</h3>
          <p>Moved the site from Pages Router to App Router with 3-language i18n, and rebuilt the UI on a feature-based architecture.</p>
          <div className="vis">
            <div className="mig"><div className="v">12<small>Pages</small></div><div className="arrow"><i /></div><div className="v" style={{ color: "var(--accent)" }}>15<small>App Router</small></div></div>
            <div className="loc"><span>next-intl</span><span>3 locales</span><span>RSC</span></div>
          </div>
          <div className="chips"><span>Next.js 15</span><span>TypeScript</span><span>next-intl</span><a className="live" href="https://www.genofax.com/bd" target="_blank" rel="noopener">Visit genofax.com ↗</a></div>
        </Reveal>

        <Reveal as="article" className="card w3">
          <div className="meta"><span>Runner Group</span><span>Full-stack</span></div>
          <h3>Vehicle Registration System</h3>
          <p>Role-based vehicle registration with multi-level approvals, bill posting logs and summary reports.</p>
          <div className="chips"><span>Role-based access</span><span>Multi-level approvals</span><span>Reports</span></div>
        </Reveal>

        <Reveal as="article" className="card full">
          <div className="meta"><span>Bank e-tendering · Vendor portal · 2026</span><span>Frontend contributor · team project</span></div>
          <div className="et-top">
            <div>
              <h3>eTender Vendor Portal</h3>
              <p>A bank&apos;s e-procurement portal where vendors register, bid and compete in live reverse auctions. I was the top committer on the frontend team.</p>
            </div>
            <div className="chips" style={{ marginTop: 0 }}>{["Next.js 16", "React 19", "Socket.IO", "Ant Design 5", "SCSS Modules"].map((c) => <span key={c}>{c}</span>)}</div>
          </div>
          <div className="contrib two">
            <div><span className="mono">What I owned</span><ul>
              <li>Auction list and live auction modules, with access rules for disqualified, ended or cancelled auctions</li>
              <li>Safe bid entry: live range and step checks, a confirm step and a unique submission ID against double submits</li>
              <li>White-label theme engine: each client&apos;s colours, font and logo come from the backend</li>
            </ul></div>
            <div><span className="mono">Co-built and fixed</span><ul>
              <li>Real-time live auction screen over Socket.IO, built with a teammate</li>
              <li>Fixed an infinite logout loop and header layout shift</li>
              <li>Cut network traffic by merging duplicate requests and pausing refresh in background tabs</li>
            </ul></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
