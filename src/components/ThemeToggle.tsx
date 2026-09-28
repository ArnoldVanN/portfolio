import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

export default function ThemeToggle() {
  // The inline script in root.tsx already sets the class before paint
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = (next: boolean) => {
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <Switch
      checked={dark}
      onCheckedChange={toggle}
      aria-label="Toggle dark mode"
    />
  );
}
