import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Featured from "@/components/Featured";
import CaseStudy from "@/components/CaseStudy";
import Work from "@/components/Work";
import About from "@/components/About";
import Career from "@/components/Career";
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
        <About />
        <Career />
        <Writing />
        <Contact />
      </main>
    </>
  );
}
