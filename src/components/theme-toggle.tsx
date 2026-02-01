"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import clsx from "clsx";

type Theme = "light" | "dark" | "system";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else if (theme === "light") {
    root.classList.remove("dark");
  } else {
    // system
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const resolved: Theme =
      stored && ["light", "dark", "system"].includes(stored) ? stored : "system";
    setTheme(resolved);
    applyTheme(resolved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Listen for system preference changes when in system mode
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, mounted]);

  function setAndApply(next: Theme) {
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  // Prevent hydration mismatch — render nothing until mounted
  if (!mounted) {
    return <div className="w-[114px] h-10" />;
  }

  const options: { value: Theme; icon: typeof Sun; label: string }[] = [
    { value: "light", icon: Sun, label: "Light" },
    { value: "dark", icon: Moon, label: "Dark" },
    { value: "system", icon: Monitor, label: "System" },
  ];

  return (
    <div
      className="flex items-center gap-0.5 border border-[var(--rule)] p-[3px]"
      style={{ borderRadius: "3px" }}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setAndApply(opt.value)}
          className={clsx(
            "flex items-center justify-center w-[34px] h-[34px] transition-colors",
            theme === opt.value
              ? "bg-[var(--fg)] text-[var(--bg)]"
              : "text-[var(--faded)] hover:text-[var(--fg)]"
          )}
          style={{ borderRadius: "2px" }}
          aria-label={opt.label}
          title={opt.label}
        >
          <opt.icon size={12} strokeWidth={2} />
        </button>
      ))}
    </div>
  );
}
