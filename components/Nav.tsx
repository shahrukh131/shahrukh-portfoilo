import { profile } from "@/content/site";

export default function Nav() {
  return (
    <nav className="nav" aria-label="Main">
      <a className="me" href="#top">{profile.shortName}</a>
      <a href="#case" className="hide-s">Case study</a>
      <a href="#work">Work</a>
      <a href="#about" className="hide-s">About</a>
      <a href="#career" className="hide-s">Career</a>
      <a href={profile.resume} target="_blank" rel="noopener" className="hide-s">Resume</a>
      <a href="#contact" className="cta">Contact</a>
    </nav>
  );
}
