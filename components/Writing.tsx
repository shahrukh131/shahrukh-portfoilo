import { posts, profile, publication } from "@/content/site";
import Reveal from "./Reveal";

export default function Writing() {
  return (
    <section id="writing">
      <div className="wn">
        <Reveal className="wcard">
          <span className="eyebrow">Writing · #60DaysOfSystemDesign</span>
          <h3>Learning system design in public</h3>
          <p>A daily LinkedIn series in English and Bangla, one topic per post, from how the web works to load balancing.</p>
          <div className="posts">
            {posts.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noopener"><span className="mono">{p.day}</span><b>{p.title}</b><i aria-hidden="true">↗</i></a>
            ))}
          </div>
          <a className="allp" href={`${profile.linkedin}recent-activity/all/`} target="_blank" rel="noopener">All posts on LinkedIn ↗</a>
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
