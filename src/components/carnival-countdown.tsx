"use client";

import { useEffect, useState } from "react";

// J'ouvert Monday, February 16, 2026 at 4:00 AM AST (UTC-4)
const JOUVERT = new Date("2026-02-16T04:00:00-04:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  passed: boolean;
}

function getTimeLeft(): TimeLeft {
  const diff = JOUVERT - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    passed: false,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function CarnivalCountdown() {
  const [mounted, setMounted] = useState(false);
  const [tl, setTl] = useState(getTimeLeft);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setTl(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return <div className="h-[88px]" />;
  }

  if (tl.passed) {
    return (
      <div className="mb-6">
        <span className="label-mono text-[var(--terra)] block mb-2">
          Carnival 2026
        </span>
        <p className="font-[var(--font-display)] font-semibold text-[var(--fg)]">
          Carnival 2026 has passed! See you next year!
        </p>
      </div>
    );
  }

  const segments = [
    { value: tl.days, label: "Days" },
    { value: tl.hours, label: "Hrs" },
    { value: tl.minutes, label: "Min" },
    { value: tl.seconds, label: "Sec" },
  ];

  return (
    <div className="mb-6">
      <span className="label-mono text-[var(--terra)] block mb-2">
        Carnival 2026 Countdown
      </span>
      <div className="flex items-baseline gap-2 sm:gap-3">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-baseline gap-1">
            <span className="heading-display text-2xl md:text-3xl text-[var(--terra)] tabular-nums">
              {pad(seg.value)}
            </span>
            <span className="label-mono text-[var(--faded)]">{seg.label}</span>
            {i < segments.length - 1 && (
              <span className="text-[var(--rule)] mx-px sm:mx-0.5 select-none">:</span>
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-[var(--faded)] mt-1 italic">
        until J&apos;ouvert mornin&apos;...
      </p>
    </div>
  );
}
