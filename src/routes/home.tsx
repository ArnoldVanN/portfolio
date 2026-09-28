import type { Route } from "./+types/home";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import TechStack from "@/sections/TechStack";
import Projects from "@/sections/Projects";
import Contact from "@/sections/Contact";
import { site, socials } from "@/config";
import { socialMeta } from "@/lib/seo";

const description =
  "Full-stack developer building, deploying and scaling production applications.";

export const meta: Route.MetaFunction = () => [
  { title: site.name },
  { name: "description", content: description },
  ...socialMeta({ title: site.name, description, path: "/" }),
  {
    "script:ld+json": {
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      url: site.url,
      jobTitle: "Full-stack developer",
      sameAs: socials
        .filter((s) => s.href.startsWith("https://"))
        .map((s) => s.href),
    },
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <TechStack />
      <Projects />
      <Contact />
    </>
  );
}
