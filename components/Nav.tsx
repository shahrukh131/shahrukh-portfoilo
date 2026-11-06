"use client";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/content/site";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#case", label: "Case study" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#career", label: "Career" },
  { href: profile.resume, label: "Resume ↗", external: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const down = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const resize = () => { if (innerWidth > 640) setOpen(false); };
    addEventListener("keydown", key);
    addEventListener("pointerdown", down);
    addEventListener("resize", resize);
    return () => { removeEventListener("keydown", key); removeEventListener("pointerdown", down); removeEventListener("resize", resize); };
  }, [open]);

  const ext = (external?: boolean) => (external ? { target: "_blank", rel: "noopener" } : {});

  return (
    <div ref={ref}>
      <nav className="nav" aria-label="Main">
        <a className="me" href="#top">{profile.shortName}</a>
        {links.map((l) => (
          <a key={l.href} href={l.href} className="hide-s" {...ext(l.external)}>{l.external ? "Resume" : l.label}</a>
        ))}
        <ThemeToggle />
        <a href="#contact" className="cta">Contact</a>
        <button type="button" className="menu-btn" aria-label="Menu" aria-expanded={open} aria-controls="nav-menu" onClick={() => setOpen((o) => !o)}>
          <i /><i />
        </button>
      </nav>
      <div id="nav-menu" className="nav-menu" data-open={open} aria-hidden={!open}>
        {[...links, { href: "#contact", label: "Contact" }].map((l) => (
          <a key={l.href} href={l.href} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} {...ext("external" in l && l.external)}>{l.label}</a>
        ))}
      </div>
    </div>
  );
}
