import { principles, publication } from "@/content/site";
import Reveal from "./Reveal";

export default function Principles() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="duo">
        <Reveal className="princ">
          {principles.map((p) => (<div key={p.k}><b>{p.k}</b><p>{p.v}</p></div>))}
        </Reveal>
        <Reveal as="article" className="paper">
          <span className="eyebrow">{publication.meta}</span>
          <h3>{publication.title}</h3>
          <div className="det" aria-hidden="true">
            <span data-l="blight 0.94" style={{ left: "18%", top: "30%", width: "26%", height: "36%" }} />
            <span data-l="rust 0.88" style={{ left: "60%", top: "42%", width: "22%", height: "38%" }} />
          </div>
          <p>{publication.body}</p>
          <a className="btn" href={publication.url} target="_blank" rel="noopener">Read on IEEE Xplore ↗</a>
        </Reveal>
      </div>
    </section>
  );
}
