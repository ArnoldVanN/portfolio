import { useEffect, useRef } from "react";

const gridLines =
  "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)";

// Eased falloff so the glow fades out without a visible edge.
const easedFalloff = (color: (alpha: number) => string) =>
  [1, 0.8, 0.55, 0.32, 0.15, 0.05, 0]
    .map(
      (alpha, i, stops) => `${color(alpha)} ${(i / (stops.length - 1)) * 100}%`,
    )
    .join(", ");

const spotlightMask = `radial-gradient(circle 150px at var(--mx) var(--my), ${easedFalloff((a) => `rgb(0 0 0 / ${a})`)})`;

const glowWash = `radial-gradient(circle 220px at var(--mx) var(--my), ${easedFalloff((a) => `color-mix(in oklab, var(--primary) ${a * 100}%, transparent)`)})`;

export default function Background() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
        el.style.setProperty("--spot", "1");
      });
    };
    const onLeave = () => el.style.setProperty("--spot", "0");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background [--mx:-1000px] [--my:-1000px] [--spot:0]"
    >
      <div
        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.3]"
        style={{
          backgroundImage: gridLines,
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 100% 90% at 50% 0%, black 25%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 100% 90% at 50% 0%, black 25%, transparent 95%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.15]"
        style={{
          backgroundImage: gridLines,
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(ellipse 85% 75% at 50% 10%, black 0%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 75% at 50% 10%, black 0%, transparent 95%)",
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "calc(var(--spot) * 0.55)",
          backgroundImage: gridLines,
          backgroundSize: "56px 56px",
          maskImage: spotlightMask,
          WebkitMaskImage: spotlightMask,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "calc(var(--spot) * 0.08)",
          background: glowWash,
        }}
      />
      <div
        className="absolute -top-40 left-1/2 h-[38rem] w-[52rem] -translate-x-1/2 rounded-full opacity-25 blur-3xl dark:opacity-20"
        style={{
          background:
            "radial-gradient(closest-side, var(--primary), transparent)",
        }}
      />
    </div>
  );
}
