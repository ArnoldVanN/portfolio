import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

function getInitial() {
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <Switch
      onCheckedChange={() => setDark((d) => !d)}
      aria-label="Toggle dark mode"
    >
      {dark ? "Light" : "Dark"}
    </Switch>
  );
}
