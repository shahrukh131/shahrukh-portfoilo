"use client";
import { useRef, type ReactNode } from "react";

/** A link that leans gently toward the pointer on fine-pointer devices. */
export default function Magnetic({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = () => typeof window !== "undefined" && matchMedia("(hover:hover) and (pointer:fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onPointerMove={(e) => {
        if (!fine() || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
      }}
      onPointerLeave={() => {
        if (!ref.current) return;
        ref.current.style.transition = "transform .6s cubic-bezier(.2,.8,.2,1),background .3s,color .3s,border-color .3s";
        ref.current.style.transform = "";
        setTimeout(() => { if (ref.current) ref.current.style.transition = ""; }, 600);
      }}
    >
      {children}
    </a>
  );
}
