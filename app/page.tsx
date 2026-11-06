import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Featured from "@/components/Featured";
import CaseStudy from "@/components/CaseStudy";
import Work from "@/components/Work";
import Notes from "@/components/Notes";
import About from "@/components/About";
import Career from "@/components/Career";
import Principles from "@/components/Principles";
import Writing from "@/components/Writing";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="wrap" id="top">
        <Hero />
        <Clients />
        <Featured />
        <CaseStudy />
        <Work />
        <Notes />
        <About />
        <Career />
        <Principles />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
