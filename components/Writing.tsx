import { now, posts, profile } from "@/content/site";
import Reveal from "./Reveal";

export default function Writing() {
  return (
    <section id="writing" style={{ paddingTop: 0 }}>
      <div className="wn">
        <Reveal className="wcard">
          <span className="eyebrow">Writing · #60DaysOfSystemDesign</span>
          <h3>Learning system design in public</h3>
          <p>A 60-day LinkedIn series, one topic a day, each post ending on the question that leads to the next. Everyday analogies, real tools like NGINX, and posts in English and Bangla.</p>
          <div className="posts">
            {posts.map((p) => (
              <a key={p.url} href={p.url} target="_blank" rel="noopener"><span className="mono">{p.day}</span><b>{p.title}</b><em>{p.summary}</em><i aria-hidden="true">↗</i></a>
            ))}
          </div>
          <a className="allp" href={`${profile.linkedin}recent-activity/all/`} target="_blank" rel="noopener">All posts on LinkedIn ↗</a>
        </Reveal>
        <Reveal className="wcard now">
          <span className="eyebrow"><i className="pulse" />Now</span>
          <ul>{now.map((n) => (<li key={n.k}><b>{n.k}</b><span>{n.v}</span></li>))}</ul>
        </Reveal>
      </div>
    </section>
  );
}
