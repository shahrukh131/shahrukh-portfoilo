import { hero, profile, stats } from "@/content/site";
import DotField from "./DotField";
import CountUp from "./CountUp";
import Magnetic from "./Magnetic";

const Arrow = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
);

export default function Hero() {
  const words = [...hero.headline, hero.highlight];
  return (
    <header className="hero">
      <DotField />
      <span className="avail"><i className="pulse" />{profile.role} · {profile.location}</span>
      <p className="fullname">{profile.name}</p>
      <h1>
        {words.map((w, i) => (
          <span key={w} className="w">
            <span className={i === words.length - 1 ? "hl" : undefined} style={{ animationDelay: `${0.15 + i * 0.07}s` }}>{w}</span>
          </span>
        ))}
      </h1>
      <div className="sub">
        <p><b>Senior frontend engineer</b> {hero.intro} <b>5+ years</b> {hero.introTail}</p>
        <div className="ctas">
          <Magnetic className="btn solid" href="#case">See the case study <Arrow /></Magnetic>
          <Magnetic className="btn" href="#contact">Get in touch</Magnetic>
        </div>
      </div>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label}>
            {s.count ? <CountUp to={s.count} suffix={s.suffix} /> : <b className="num">{s.value}</b>}
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </header>
  );
}
