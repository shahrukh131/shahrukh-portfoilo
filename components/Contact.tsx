"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";

export default function Contact() {
  const [label, setLabel] = useState("Email · click to copy");
  const [time, setTime] = useState("");
  const email = useRef<HTMLElement>(null);
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Dhaka", hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email); setLabel("Copied to clipboard"); }
    catch {
      const r = document.createRange(); if (email.current) r.selectNodeContents(email.current);
      const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); setLabel("Selected · press Ctrl+C");
    }
    setTimeout(() => setLabel("Email · click to copy"), 1800);
  };
  return (
    <section className="contact" id="contact">
      <span className="eyebrow">Contact</span>
      <h2>Building something ambitious? <span>Let&apos;s talk.</span></h2>
      <p className="contact-sub">Senior Software Engineer focused on scalable products, enterprise applications and high-performance engineering.</p>
      <div className="links">
        <button type="button" onClick={copy}><span>{label}</span><b ref={email}>{profile.email}</b></button>
        <a href={profile.linkedin} target="_blank" rel="noopener"><span>LinkedIn</span><b>{profile.linkedinHandle} ↗</b></a>
        <a href={profile.github} target="_blank" rel="noopener"><span>GitHub</span><b>{profile.githubHandle} ↗</b></a>
        <a href={profile.resume} target="_blank" rel="noopener"><span>Resume · PDF</span><b>Open my CV ↗</b></a>
      </div>
      <footer>
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span className="num">Dhaka · {time || "--:--"}</span>
      </footer>
    </section>
  );
}
