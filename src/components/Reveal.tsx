import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

type Direction = "bottom" | "top" | "left" | "right" | "none";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: Direction;
  repeat?: boolean;
  eager?: boolean;
};

const fromClass: Record<Direction, string> = {
  bottom: "slide-in-from-bottom-4",
  top: "slide-in-from-top-4",
  left: "slide-in-from-left-4",
  right: "slide-in-from-right-4",
  none: "",
};

export default function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  repeat = false,
  eager = false,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    repeat,
    rootMargin: eager ? "0px" : undefined,
  });

  return (
    <div
      ref={ref}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
      className={cn(
        inView
          ? cn(
              "animate-in fade-in fill-mode-both duration-700 ease-out",
              fromClass[from],
            )
          : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
