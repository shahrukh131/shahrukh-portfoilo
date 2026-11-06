"use client";
import { useEffect, useMemo, useState } from "react";
import Reveal from "./Reveal";

type Pane = "p1" | "p2" | "p3" | "p4";
const tabs: { id: Pane; label: string; url: string; nav: number }[] = [
  { id: "p1", label: "SLA tracking", url: "tickets / 000327 / sla", nav: 1 },
  { id: "p2", label: "Ticket queue", url: "tickets / all", nav: 2 },
  { id: "p3", label: "SLA policy", url: "settings / options / 118 / edit", nav: 3 },
  { id: "p4", label: "Option hierarchy", url: "settings / option-hierarchy", nav: 3 },
];

const notes: Record<Pane, [string, string][]> = {
  p1: [["Working hours only", "Timers count Sun–Thu, 8:30–5:00. Nights and weekends never eat into the SLA."],
       ["Held time per assignee", "Every hop in the flow keeps its own held time, so vendor delay and internal delay stay separate."],
       ["Live, then frozen", "Clocks tick while the ticket is open and freeze the moment it is diagnosed or resolved."]],
  p2: [["Breach at a glance", "Time left and KPI state are colour coded, so supervisors scan 267 tickets for risk in seconds."],
       ["Data that stays fresh", "TanStack Query keeps the queue in sync without the duplicate requests the old page made."],
       ["Built for scale", "Server-side filters, column manager and Excel export over paginated results."]],
  p3: [["Per-option SLA", "Each support option maps to a policy with resolution, escalation and diagnosis targets for every priority."],
       ["Internal vs vendor", "Internal and vendor SLAs are tracked separately, matching how work really moves."],
       ["Configured, not coded", "Required attachments and routing are set here, with no release needed."]],
  p4: [["Parent-child options", "Support for → module → title → sub-options, each with its own owner."],
       ["Fast on big lists", "Filtering is linear and debounced. This is where the O(n²) dropdown bug used to live."],
       ["Edit in place", "Add, edit and delete from the row; changes save as you go."]],
};

const pad = (n: number) => String(n).padStart(2, "0");
const useTick = (on: boolean, ms: number, fn: () => void) => {
  useEffect(() => {
    if (!on) return;
    const id = setInterval(() => { if (!document.hidden) fn(); }, ms);
    return () => clearInterval(id);
  }, [on, ms, fn]);
};

/* ---------- P1: SLA tracking ---------- */
function SlaPane({ on }: { on: boolean }) {
  const total = 7 * 3600;
  const [used, setUsed] = useState(5 * 3600 + 6 * 60 + 25);
  const [held, setHeld] = useState(2 * 3600 + 56 * 60);
  const tick = useMemo(() => () => { setUsed((u) => Math.min(u + 1, total)); setHeld((h) => h + 1); }, [total]);
  useTick(on, 1000, tick);
  const h = Math.floor(used / 3600), m = Math.floor((used % 3600) / 60), s = used % 60;
  const pct = (used / total) * 100;
  return (
    <div className="pane">
      <div className="a-strip">
        <div><small>Ticket</small><b>#000327</b></div>
        <div><small>Submitted</small><b>04 Nov, 09:51 AM</b></div>
        <div className="age"><small>Ticket age · working hours</small><b className="num">{pad(h)}h:{pad(m)}m</b></div>
        <div><small>Support for</small><b>ERP</b></div>
        <div><small>Module</small><b>Microfinance</b></div>
      </div>
      <div className="a-targets">
        <div><small>Target resolution</small><b className="num">04 Nov · 04:51 PM</b></div>
        <div><small>Target diagnosis</small><b className="num">05 Nov · 10:25 AM</b></div>
        <div><small>Working hours</small><b>8:30 AM – 5:00 PM</b><em>Sun · Mon · Tue · Wed · Thu</em></div>
        <div><small>Timer state</small><span className="pill p-amber"><i />Running</span></div>
      </div>
      <div className="a-grid2">
        <div className="a-card">
          <h5>SLA benchmark consumed</h5>
          <div className="prog">
            <div className="pt"><span>Total resolution</span><span className="pill p-amber sm">At risk</span></div>
            <div className="pbar"><i style={{ width: `${pct.toFixed(2)}%` }} /></div>
            <div className="pm mono"><span>{pad(h)}:{pad(m)}:{pad(s)} used of 07:00:00</span><span>{Math.round(pct)}%</span></div>
          </div>
          <div className="prog">
            <div className="pt"><span>Diagnosis / analysis</span><span className="pill p-green sm">Diagnosed</span></div>
            <div className="pbar"><i style={{ width: "2%", background: "var(--a-green)" }} /></div>
            <div className="pm mono"><span>00:03:12 used of 04:00:00</span><span>1%</span></div>
          </div>
        </div>
        <div className="a-card clock">
          <h5>Resolution time used</h5>
          <div className="digits num"><span>{pad(h)}</span><em>:</em><span>{pad(m)}</span><em>:</em><span>{pad(s)}</span></div>
          <div className="dl mono"><span>hours</span><span>minutes</span><span>seconds</span></div>
        </div>
      </div>
      <div className="a-card">
        <h5>Ticket flow</h5>
        <div className="chain">
          <div className="node origin"><small>Origin</small><b>Ticket created</b><em>Nov 4 · 09:51</em></div>
          <div className="arw" />
          <div className="node">
            <div className="who"><span className="av">FK</span><div><b>Farhan Kabir</b><small>Support · L1</small></div></div>
            <em>09:51 → 12:01</em>
            <div className="nf"><span className="pill sm">Held 2h 10m</span><span className="pill p-violet sm">Forwarded</span></div>
          </div>
          <div className="arw" />
          <div className="node live">
            <div className="who"><span className="av v">ED</span><div><b>ERP Vendor Desk</b><small>Vendor</small></div></div>
            <em>12:01 → now</em>
            <div className="nf"><span className="pill sm num">Held {Math.floor(held / 3600)}h {Math.floor((held % 3600) / 60)}m</span><span className="pill p-amber sm"><i />Active</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- P2: ticket queue ---------- */
type Row = { id: string; mod: string; title: string; asg: string; st: "prog" | "res" | "new" | "can"; left: number | null; age: number; fw: number };
const startRows: Row[] = [
  { id: "000334", mod: "UPG", title: "Loan disbursement issue", asg: "ERP Vendor Desk", st: "prog", left: 2880, age: 0, fw: 1 },
  { id: "000333", mod: "E-approval", title: "Applications not visible to reviewer", asg: "Tanvir Ahmed", st: "res", left: null, age: 0, fw: 0 },
  { id: "000332", mod: "Field app", title: "Field app sync failing", asg: "Imran Hossain", st: "prog", left: -167, age: 406, fw: 0 },
  { id: "000331", mod: "Finance", title: "Bank branch setup", asg: "Mitu Akter", st: "new", left: -150, age: 510, fw: 0 },
  { id: "000330", mod: "UPG", title: "Duplicate loan entry", asg: "Arif Chowdhury", st: "can", left: null, age: 510, fw: 0 },
  { id: "000329", mod: "Finance", title: "Fund transfer mapping", asg: "Sabbir Hasan", st: "new", left: -168, age: 527, fw: 0 },
  { id: "000327", mod: "Microfinance", title: "ERP server related issue", asg: "Farhan Kabir", st: "res", left: null, age: 306, fw: 1 },
];
const stLabel = { prog: ["In progress", "p-blue"], res: ["Resolved", "p-green"], new: ["New", "p-violet"], can: ["Cancelled", "p-red"] } as const;
const fm = (m: number) => `${m < 0 ? "-" : ""}${Math.floor(Math.abs(m) / 60)}h ${Math.abs(m) % 60}m`;

function QueuePane({ on }: { on: boolean }) {
  const [rows, setRows] = useState(startRows);
  const tick = useMemo(() => () => setRows((rs) => rs.map((r) => (r.st === "prog" || r.st === "new") ? { ...r, left: r.left == null ? null : r.left - 1, age: r.age + 1 } : r)), []);
  useTick(on, 3000, tick);
  return (
    <div className="pane">
      <div className="q-tools"><div className="q-search">Search tickets</div><span className="q-btn">Advance filter</span><span className="q-btn">Manage columns</span><span className="q-btn">Export to Excel</span></div>
      <div className="q-table">
        <table>
          <thead><tr><th>Ticket</th><th>Module</th><th>Title</th><th>Assigned to</th><th>Status</th><th>Time left</th><th>KPI</th><th>Age</th><th>Fwd</th></tr></thead>
          <tbody>
            {rows.map((r) => {
              const breached = r.left != null && r.left < 0;
              return (
                <tr key={r.id}>
                  <td><span className="id">{r.id}</span></td>
                  <td>{r.mod}</td>
                  <td>{r.title}</td>
                  <td><span className="asg"><span className="av">{r.asg.split(" ").map((w) => w[0]).join("").slice(0, 2)}</span>{r.asg}</span></td>
                  <td><span className={`pill sm ${stLabel[r.st][1]}`}>{stLabel[r.st][0]}</span></td>
                  <td>{r.left == null ? <span style={{ color: "var(--a-dim)" }}>–</span> : <span className={`pill sm num ${breached ? "p-red" : "p-green"}`}>{fm(r.left)}</span>}</td>
                  <td>{r.st === "can" ? <span style={{ color: "var(--a-dim)" }}>N/A</span> : breached ? <span className="pill sm p-red">Breached</span> : <span className="pill sm p-green">Not breached</span>}</td>
                  <td><span className={`agebox num ${r.age > 480 ? "p-amber" : "p-blue"}`}>{pad(Math.floor(r.age / 60))}h:{pad(r.age % 60)}m</span></td>
                  <td><span className="fw">{r.fw}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="q-foot mono"><span>Showing 1–7 of 267</span><span className="pg"><b>1</b><i>2</i><i>3</i><i>…</i><i>27</i></span></div>
    </div>
  );
}

/* ---------- P3: SLA policy ---------- */
const policy = {
  int: [["P4 · Low", "12:00", "3:00", "1:00"], ["P3 · Medium", "8:00", "3:00", "1:00"], ["P2 · High", "6:00", "3:00", "1:00"], ["P1 · Highest", "3:00", "3:00", "1:00"]],
  ven: [["P4 · Low", "96:00", "24:00", "3:00"], ["P3 · Medium", "72:00", "24:00", "3:00"], ["P2 · High", "48:00", "24:00", "3:00"], ["P1 · Highest", "24:00", "24:00", "3:00"]],
};
function PriorityGrid({ rows }: { rows: string[][] }) {
  const [sel, setSel] = useState(2);
  return (
    <div className="pri-grid">
      {rows.map((p, i) => (
        <button key={p[0]} type="button" className="pri" aria-pressed={sel === i} onClick={() => setSel(i)}>
          <div className="ph">{p[0]}<i /></div>
          <div className="ln r"><span>Resolution</span><span>{p[1]}</span></div>
          <div className="ln e"><span>Escalation</span><span>{p[2]}</span></div>
          <div className="ln d"><span>Diagnosis</span><span>{p[3]}</span></div>
        </button>
      ))}
    </div>
  );
}
function Toggle() {
  const [on, set] = useState(true);
  return <button type="button" className={`tog${on ? " on" : ""}`} aria-pressed={on} aria-label="Required" onClick={() => set(!on)} />;
}
function PolicyPane() {
  return (
    <div className="pane">
      <div className="pol-head"><div><small>Option</small><b>Smart collection API issue</b></div><div><small>SLA policy</small><b>ERP Finance &amp; Accounts</b></div><div><small>Routing</small><b>Team individual (1:1)</b></div></div>
      <div className="pol">
        <div className="pol-side"><h5><i className="dot-v" />Internal priorities</h5><PriorityGrid rows={policy.int} /></div>
        <div className="pol-side"><h5><i className="dot-g" />Vendor priorities</h5><PriorityGrid rows={policy.ven} /></div>
      </div>
      <div className="files">
        <h5>Required attachments</h5>
        <div className="frow"><b>Screenshot of problem</b><span className="pill sm">Image</span><span className="pill sm">PDF</span><span className="pill sm">DOCX</span><Toggle /></div>
        <div className="frow"><b>PO name, PIN, collection amount</b><span className="pill sm">XLSX</span><span className="pill sm">XLS</span><Toggle /></div>
      </div>
    </div>
  );
}

/* ---------- P4: option hierarchy ---------- */
const hierarchy: [string, string, string[]][] = [
  ["API smart collection issue", "Tahmid Alam", []],
  ["Asset edition", "Nusrat Jahan", ["Asset transfer", "Asset disposal", "Depreciation run", "Tag correction", "Location change"]],
  ["Asset purchase", "Rakib Hasan", ["Purchase requisition"]],
  ["Asset related report", "Tahmid Alam", []],
  ["Bad loan collection problem", "Sumaiya Khan", []],
  ["BEFTN", "Tahmid Alam", ["Return file upload", "Settlement mismatch"]],
  ["Branch reconciliation details", "Tahmid Alam", ["Cash mismatch"]],
  ["Fund transfer", "Sabbir Hasan", ["Inter-branch", "Head office"]],
  ["Project mapping", "Nusrat Jahan", []],
];
function HierarchyPane() {
  const [q, setQ] = useState("");
  const [dq, setDq] = useState("");
  const [open, setOpen] = useState<Set<string>>(new Set(["Asset edition"]));
  useEffect(() => { const t = setTimeout(() => setDq(q.trim().toLowerCase()), 120); return () => clearTimeout(t); }, [q]);
  const rows = hierarchy.filter(([n, , k]) => !dq || n.toLowerCase().includes(dq) || k.some((c) => c.toLowerCase().includes(dq)));
  const toggle = (n: string) => setOpen((s) => { const x = new Set(s); x.has(n) ? x.delete(n) : x.add(n); return x; });
  return (
    <div className="pane">
      <div className="h-wrap">
        <div className="h-ctx">
          <h5>Context</h5>
          <label>Support for</label><div className="sel">ERP</div>
          <label>Support module</label><div className="sel">Finance &amp; Accounts</div>
          <ul><li>Define parent-child levels</li><li>Hover items for actions</li><li>Changes save automatically</li></ul>
        </div>
        <div className="h-main">
          <div className="h-bar"><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find options…" aria-label="Find options" /><span className="add">+ Add new</span></div>
          <div className="h-group"><b>Support title</b><span className="pill p-violet sm">{dq ? rows.length : 45} items</span></div>
          {rows.length === 0 && <div className="h-empty">No options match. Try another word.</div>}
          {rows.map(([n, owner, kids]) => {
            const isOpen = open.has(n) || (!!dq && kids.some((c) => c.toLowerCase().includes(dq)));
            return (
              <div key={n} className={`opt${isOpen ? " open" : ""}`}>
                <button type="button" aria-expanded={kids.length ? isOpen : undefined} onClick={() => kids.length && toggle(n)}>
                  <span className="car">{kids.length ? "▶" : ""}</span>
                  <span className="nm">{n}</span>
                  <span className="ow">{owner}</span>
                  <span className="cnt">{kids.length || ""}</span>
                  <span className="act"><i>+</i><i>✎</i><i>×</i></span>
                </button>
                <div className="kids"><div>{kids.map((k) => (<div key={k} className="k"><span>{k}</span><span>{owner}</span></div>))}</div></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function ProductGallery() {
  const [pane, setPane] = useState<Pane>("p1");
  const tab = tabs.find((t) => t.id === pane)!;
  return (
    <Reveal className="gallery">
      <div className="g-head">
        <div>
          <span className="eyebrow">Inside the product</span>
          <h3 className="g-title">The screens I built, working.</h3>
        </div>
        <div className="g-tabs" role="tablist" aria-label="Product screens">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={pane === t.id} onClick={() => setPane(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      <div className="frame">
        <div className="chrome"><i /><i /><i /><span className="url mono">wings.servicedesk / {tab.url}</span></div>
        <div className="screen">
          <div className="app">
            <div className="a-top">
              <b className="a-logo">WINGS</b>
              {["Dashboard", "My Tickets", "All Tickets", "Settings", "Reports"].map((n, i) => (
                <span key={n} className={i === tab.nav ? "on" : undefined}>{n}</span>
              ))}
              <span className="a-user">N</span>
            </div>
            {pane === "p1" && <SlaPane on />}
            {pane === "p2" && <QueuePane on />}
            {pane === "p3" && <PolicyPane />}
            {pane === "p4" && <HierarchyPane />}
          </div>
        </div>
      </div>

      <div className="g-notes" key={pane}>
        {notes[pane].map(([b, p], i) => (<div key={b} style={{ animationDelay: `${i * 0.06}s` }}><b>{b}</b><p>{p}</p></div>))}
      </div>
      <p className="g-disclaim mono">Recreated with sample data. The original UI was built by me for a client; no client data or branding is shown.</p>
    </Reveal>
  );
}
