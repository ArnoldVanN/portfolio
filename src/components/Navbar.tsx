import { type MouseEvent, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { AnimatePresence, m } from "motion/react";
import { nav } from "@/config";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "@/assets/logo.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  // On the home page, section links scroll smoothly instead of navigating.
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    if (pathname !== "/" || !href.startsWith("/#")) return;
    const el = document.getElementById(href.slice(2));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-8">
          <Link
            to="/#top"
            onClick={(e) => handleNavClick(e, "/#top")}
            className="flex items-center gap-2 font-medium"
          >
            <img src={logo} alt="" className="size-6 select-none" />
            Arno Van Nieuwenhuyzen
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <ul className="flex gap-6">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ThemeToggle />
          </nav>

          <div className="flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              className="relative z-50 block p-4"
            >
              {isOpen ? (
                <AiOutlineClose size={20} />
              ) : (
                <AiOutlineMenu size={20} />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden md:hidden">
        <AnimatePresence>
          {isOpen
            ? [
                <m.div
                  key="backdrop"
                  className="pointer-events-auto absolute inset-0 bg-black/40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />,
                <m.nav
                  key="panel"
                  className="pointer-events-auto absolute top-0 right-0 flex h-full w-2/3 max-w-xs flex-col justify-center border-l bg-background"
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 320, damping: 34 }}
                >
                  <ul className="w-full">
                    {nav.map((item) => (
                      <li key={item.href} className="py-2">
                        <Link
                          to={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="flex h-12 items-center justify-center p-2 text-lg hover:bg-muted"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </m.nav>,
              ]
            : null}
        </AnimatePresence>
      </div>
    </>
  );
}
