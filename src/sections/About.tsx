import Reveal from "@/components/Reveal";
import { about } from "@/config";

export default function About() {
  return (
    <section id="about" className="py-16 text-left">
      <Reveal>
        <h2 className="text-2xl font-semibold">Who I am</h2>
      </Reveal>
      <div className="mt-6 space-y-4 max-w-2xl">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 100}>
            <p>{p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
