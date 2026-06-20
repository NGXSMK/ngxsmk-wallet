import { useState, useEffect } from "react";
import { LandingPage } from "./LandingPage";
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
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("demo-theme", dark ? "dark" : "light");
  }, [dark]);

  if (showDemo) {
    return <DemoApp dark={dark} onToggleDark={() => setDark(!dark)} onBack={() => setShowDemo(false)} />;
  }

  return <LandingPage dark={dark} onToggleDark={() => setDark(!dark)} onLaunchDemo={() => setShowDemo(true)} />;
}
