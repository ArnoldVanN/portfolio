import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

type TypewriterProps = {
  text: string;
  className?: string;
  speed?: number;
};

export default function Typewriter({
  text,
  className,
  speed = 70,
}: TypewriterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || count >= text.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(text.length);
      return;
    }
    const id = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(id);
  }, [inView, count, text.length, speed]);

  const done = count >= text.length;

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{text.slice(0, count)}</span>
      <span
        aria-hidden
        className={cn(
          "ml-0.5 inline-block h-[1em] w-[0.5ch] -translate-y-px bg-primary align-middle",
          inView ? "opacity-100" : "opacity-0",
          done && "animate-caret-blink",
        )}
      >
        &nbsp;
      </span>
    </span>
  );
}
