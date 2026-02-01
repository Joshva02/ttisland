"use client";

import { useEffect, useState } from "react";

const TZ = "America/Port_of_Spain";

function getTrinidadTime() {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { timeZone: TZ, weekday: "long" });
  const date = now.toLocaleDateString("en-US", {
    timeZone: TZ,
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return { day, date, time };
}

export function TrinidadClock() {
  const [mounted, setMounted] = useState(false);
  const [clock, setClock] = useState(getTrinidadTime);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setClock(getTrinidadTime()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) {
    return <div className="h-[72px]" />;
  }

  return (
    <div className="mb-4">
      <span className="label-mono text-[var(--faded)] block mb-1">
        Trinidad &amp; Tobago
      </span>
      <p className="text-sm text-[var(--faded)]">
        {clock.day}, {clock.date}
      </p>
      <p className="font-[var(--font-display)] text-2xl font-bold text-[var(--fg)] tabular-nums">
        {clock.time}{" "}
        <span className="text-[var(--terra)] text-sm font-medium">AST</span>
      </p>
    </div>
  );
}
