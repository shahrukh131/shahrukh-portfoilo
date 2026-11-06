"use client";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { career } from "@/content/site";
import Reveal from "./Reveal";

export default function Career() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 70%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <section id="career">
      <Reveal className="head">
        <div><span className="eyebrow">Career</span><h2>Five-plus years, <em>three teams.</em></h2></div>
        <p>From server-side modules as a junior developer to owning frontend architecture and leading a team.</p>
      </Reveal>
      <div className="xp" ref={ref}>
        <motion.div className="fill" style={{ height: "calc(100% - 16px)", scaleY: reduce ? 1 : scaleY, transformOrigin: "top" }} />
        {career.map((j) => (
          <Reveal key={j.company} className="job">
            <div className="when"><b>{j.when}</b>Dhaka</div>
            <div>
              <h3>{j.company}</h3>
              <div className="role">{j.role}</div>
              {j.body && <p>{j.body}</p>}
              {j.bullets && <ul>{j.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
