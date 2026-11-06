"use client";
import { useEffect } from "react";
import Lenis from "lenis";

/** Smooth wheel scrolling plus smooth in-page anchor links. Off when the viewer prefers reduced motion. */
export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Native wheel/touch scrolling keeps text on whole pixels (crisp). Lenis only animates anchor jumps.
    const lenis = new Lenis({ smoothWheel: false });
    let id = 0;
    const raf = (t: number) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      const hash = a.getAttribute("href")!;
      const el = hash.length > 1 ? document.querySelector(hash) : document.body;
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -90, duration: 1.3 });
      history.replaceState(null, "", hash);
    };
    document.addEventListener("click", onClick);
    return () => { cancelAnimationFrame(id); document.removeEventListener("click", onClick); lenis.destroy(); };
  }, []);
  return null;
}
