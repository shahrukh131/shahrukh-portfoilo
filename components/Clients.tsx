import { clients, stack } from "@/content/site";

export default function Clients() {
  return (
    <>
      <div className="clients" aria-label="Organisations I have built software for">
        <span className="eyebrow">Software I built is used at</span>
        <ul>
          {clients.map((c) => (<li key={c.name}><b>{c.name}</b><span>{c.note}</span></li>))}
        </ul>
      </div>
      <div className="marquee" aria-label="Tech stack">
        <div className="track">
          {[...stack, ...stack].map((s, i) => (<span key={i} aria-hidden={i >= stack.length}>{s}</span>))}
        </div>
      </div>
    </>
  );
}
