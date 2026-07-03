import { LazyMotion } from "motion/react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import TechStack from "@/sections/TechStack";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";

const loadFeatures = () =>
  import("@/lib/motion-features").then((res) => res.default);

function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <Navbar />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">
        <main>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Contact />
        </main>
      </div>
      <Footer />
    </LazyMotion>
  );
}

export default App;
