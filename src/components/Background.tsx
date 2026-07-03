export default function Background() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      <div
        className="absolute inset-0 opacity-[0.1] dark:opacity-[0.3]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 85% 60% at 50% 0%, black 15%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 60% at 50% 0%, black 15%, transparent 85%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)",
          backgroundSize: "14px 14px",
          maskImage:
            "radial-gradient(ellipse 70% 50% at 50% 10%, black 0%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 50% at 50% 10%, black 0%, transparent 90%)",
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
