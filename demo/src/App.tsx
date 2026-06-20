import { useState, useEffect } from "react";
import { DemoApp } from "./DemoPage";

export default function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("demo-theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("demo-theme", dark ? "dark" : "light");
  }, [dark]);

  return <DemoApp dark={dark} onToggleDark={() => setDark(!dark)} />;
}
