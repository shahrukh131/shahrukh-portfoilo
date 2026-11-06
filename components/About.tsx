import Image from "next/image";
import { about, profile, skills } from "@/content/site";
import Reveal from "./Reveal";

const icons: Record<(typeof skills)[number]["icon"], React.ReactNode> = {
  ui: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M8 13h4M8 16h7" /></>,
  state: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.3 11l7.4-3.8M8.3 13l7.4 3.8" /></>,
  api: <><ellipse cx="12" cy="6" rx="7" ry="2.8" /><path d="M5 6v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6M5 12v6c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-6" /></>,
  rt: <path d="M13 3L5 13h6l-1 8 8-10h-6l1-8z" />,
  sec: <><path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" /><path d="M9 12l2 2 4-4" /></>,
  tool: <><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="9" r="2.2" /><path d="M6 8.2v7.6M18 11.2c0 3-3 4-6 4.6L8 17" /></>,
};

export default function About() {
  return (
    <section id="about">
      <Reveal className="about">
        <div className="ab-me">
          <div className="ab-frame"><Image className="ab-photo" src="/headshot.jpg" alt={`Portrait of ${profile.name}`} width={480} height={600} sizes="(max-width: 640px) 112px, 260px" /></div>
          <div><b>{profile.name}</b><span>{profile.role} · {profile.location}</span></div>
        </div>
        <div className="ab-text">
          <span className="eyebrow">About</span>
          <h2>I like the parts users <em>never notice.</em></h2>
          {about.map((p) => (<p key={p.slice(0, 20)}>{p}</p>))}
        </div>
      </Reveal>
      <Reveal className="skills">
        {skills.map((s) => (
          <div key={s.title} className="sk">
            <span className="ski"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{icons[s.icon]}</svg></span>
            <b>{s.title}</b>
            <p>{s.items}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
