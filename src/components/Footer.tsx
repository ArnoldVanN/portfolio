import Reveal from "@/components/Reveal";
import { socials } from "@/config";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-2 py-10">
      <Reveal from="bottom" eager>
        <ul className="flex justify-center gap-6">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal from="bottom" delay={120} eager>
        <p className="text-center">© {new Date().getFullYear()} Arno</p>
      </Reveal>
    </footer>
  );
}
