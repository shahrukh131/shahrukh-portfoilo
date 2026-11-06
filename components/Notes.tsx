import { notes } from "@/content/site";
import Reveal from "./Reveal";

export default function Notes() {
  return (
    <section id="notes">
      <Reveal className="head">
        <div><span className="eyebrow">Technical notes</span><h2>How I think <em>about the hard parts.</em></h2></div>
        <p>Short write-ups of decisions from real work. Open one to read it.</p>
      </Reveal>
      <div className="notes">
        {notes.map((n, i) => (
          <Reveal key={n.title} delay={i * 0.06}>
            <details className="note">
              <summary><span className="mono">{n.tag}</span><b>{n.title}</b><i aria-hidden="true">+</i></summary>
              <div><p>{n.body}</p></div>
            </details>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
