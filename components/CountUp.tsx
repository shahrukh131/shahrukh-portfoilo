"use client";
import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/** Renders the final value on the server, then counts up from 0 once on load. */
export default function CountUp({ to, suffix = "", delay = 1.1 }: { to: number; suffix?: string; delay?: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !ref.current) return;
    const c = animate(0, to, { duration: 1.8, delay, ease: [0.2, 0.8, 0.2, 1], onUpdate: (v) => { if (ref.current) ref.current.textContent = Math.round(v) + suffix; } });
    return () => c.stop();
  }, [to, suffix, delay, reduce]);
  return <b ref={ref} className="num">{to + suffix}</b>;
}
