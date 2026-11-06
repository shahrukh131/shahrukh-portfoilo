"use client";
import { useEffect, useState } from "react";
import { featured } from "@/content/site";
import Reveal from "./Reveal";

const tenants = [
  { name: "tenant_shop", kind: "Ecommerce" },
  { name: "tenant_depot", kind: "Warehouse" },
  { name: "tenant_bazaar", kind: "Marketplace" },
];

/** The headline own-product card: live link, architecture points, and a small animated tenant map. */
export default function Featured() {
  const [hit, setHit] = useState(0);
  const [mod, setMod] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => { if (!document.hidden) { setHit((h) => (h + 1) % tenants.length); setMod((m) => (m + 1) % featured.modules.length); } }, 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="saas">
      <Reveal className="feat">
        <div className="feat-copy">
          <span className="eyebrow"><i className="pulse" />{featured.eyebrow}</span>
          <h2>{featured.title}</h2>
          <p className="feat-sum">{featured.summary}</p>
          <dl className="feat-pts">
            {featured.points.map((p) => (<div key={p.k}><dt>{p.k}</dt><dd>{p.v}</dd></div>))}
          </dl>
          <div className="feat-cta">
            <a className="btn solid" href={featured.live} target="_blank" rel="noopener">Open the live app ↗</a>
            <span className="mono">{featured.liveNote}</span>
          </div>
          <div className="chips">{featured.stack.map((s) => (<span key={s}>{s}</span>))}</div>
        </div>
        <div className="feat-vis" aria-hidden="true">
          <div className="fv-panel">
            <div className="fv-top"><b>CMS Admin</b><span className="mono">one panel · many tenants</span></div>
            <div className="fv-mods">
              {featured.modules.map((m, i) => (<span key={m} className={i === mod ? "on" : undefined}>{m}</span>))}
            </div>
            <div className="fv-flow"><span className="mono">request</span><i /><span className="mono">tenant resolver</span><i /><span className="mono">SET search_path</span></div>
            <div className="fv-ten">
              {tenants.map((t, i) => (
                <div key={t.name} className={i === hit ? "hit" : undefined}><b>{t.name}</b><span>{t.kind}</span></div>
              ))}
            </div>
            <div className="fv-core">public · auth · roles · billing</div>
            <div className="fv-roles">
              {["System admin", "Tenant admin", "Warehouse manager", "Inventory officer", "Sales / support", "Customer"].map((r, i) => (
                <div key={r}><span>{r}</span><i style={{ width: `${100 - i * 15}%` }} /></div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
