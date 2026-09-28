import type { ReactNode } from "react";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import { LazyMotion } from "motion/react";

import type { Route } from "./+types/root";
import "./index.css";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const loadFeatures = () =>
  import("@/lib/motion-features").then((res) => res.default);

// // Apply theme before paint to avoid a flash of the wrong theme.
const themeScript = `(function () {
  var stored = localStorage.getItem("theme");
  var dark =
    stored === "dark" ||
    (!stored && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
})();`;

export const links: Route.LinksFunction = () => [
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  { rel: "manifest", href: "/site.webmanifest" },
  {
    rel: "alternate",
    type: "application/rss+xml",
    title: "Blog · Arno Van Nieuwenhuyzen",
    href: "/rss.xml",
  },
];

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <Background />
      <Navbar />
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-8">
        <main>
          <Outlet />
        </main>
      </div>
      <Footer />
    </LazyMotion>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-semibold">
        {notFound ? "Page not found" : "Something went wrong"}
      </h1>
      <a href="/" className="text-primary underline underline-offset-4">
        Back home
      </a>
    </main>
  );
}
