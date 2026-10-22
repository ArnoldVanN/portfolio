import type { MouseEvent, ReactNode } from "react";

export default function TableOfContents({ children }: { children: ReactNode }) {
  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const link = (e.target as HTMLElement).closest("a");
    const hash = link?.getAttribute("href");
    if (!hash?.startsWith("#")) return;
    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", hash);
  };

  return (
    <nav
      aria-label="Table of contents"
      onClick={handleClick}
      className="not-prose pl-0 p-5 [&_a]:text-muted-foreground [&_a:hover]:text-primary dark:[&_a:hover]:text-purple-500 [&_li]:mt-1.5 [&_ul_ul]:mt-1.5 [&_ul_ul]:pl-4"
    >
      <p className="mb-2 text-2xl font-semibold">Contents</p>
      {children}
    </nav>
  );
}
