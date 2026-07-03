import logo from "@/assets/logo.png";
import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";

export default function Hero() {
  return (
    <section id="top" className="py-20 text-center">
      <Reveal from="top">
        <img
          src={logo}
          alt="Aquila logo"
          className="mx-auto mb-6 size-28 select-none"
        />
      </Reveal>
      <Reveal from="top" delay={120}>
        <h1 className="text-5xl font-semibold tracking-tight">Aquila</h1>
      </Reveal>
      <p className="mt-3 text-lg">
        <Typewriter
          text="I build, deploy, maintain and scale production applications"
          speed={35}
        />
      </p>
    </section>
  );
}
