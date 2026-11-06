"use client";
import { useEffect, useRef } from "react";

/** Cursor-reactive dot grid behind the hero. Pauses when off screen or the tab is hidden. */
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    const hero = cv.parentElement!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dots: { x: number; y: number }[] = [];
    let mx = -999, my = -999, tmx = -999, tmy = -999, vis = true, raf = 0;
    const size = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = cv.getBoundingClientRect();
      W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = W < 640 ? 26 : 30; dots = [];
      for (let y = g / 2; y < H; y += g) for (let x = g / 2; x < W; x += g) dots.push({ x, y });
    };
    const move = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); tmx = e.clientX - r.left; tmy = e.clientY - r.top; };
    const leave = () => { tmx = -999; tmy = -999; };
    const io = new IntersectionObserver(([e]) => (vis = e.isIntersecting));
    const draw = (t: number) => {
      if (vis && !document.hidden) {
        mx += (tmx - mx) * 0.12; my += (tmy - my) * 0.12;
        ctx.clearRect(0, 0, W, H);
        const time = t * 0.0006;
        for (const d of dots) {
          const dx = d.x - mx, dy = d.y - my, dist = Math.hypot(dx, dy), R = 170;
          const wave = reduce ? 0 : Math.sin(d.x * 0.012 + time * 2) * Math.cos(d.y * 0.014 + time * 1.4);
          let ox = 0, oy = 0, a = 0.13 + wave * 0.06, rad = 1;
          if (dist < R) { const f = 1 - dist / R, p = f * f * 18; ox = (dx / (dist || 1)) * p; oy = (dy / (dist || 1)) * p; a = 0.13 + f * 0.75; rad = 1 + f * 1.3; }
          ctx.fillStyle = dist < R ? `rgba(157,184,255,${a})` : `rgba(226,232,255,${a})`;
          ctx.beginPath(); ctx.arc(d.x + ox, d.y + oy, rad, 0, 6.283); ctx.fill();
        }
      }
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    size(); addEventListener("resize", size);
    hero.addEventListener("pointermove", move); hero.addEventListener("pointerleave", leave);
    io.observe(hero); raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); hero.removeEventListener("pointermove", move); hero.removeEventListener("pointerleave", leave); io.disconnect(); };
  }, []);
  return <canvas id="field" ref={ref} aria-hidden="true" />;
}
