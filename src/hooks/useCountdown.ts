import { useEffect, useMemo, useState } from "react";

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  ended: boolean;
}

/** Real-time countdown (ticks every second) from now until `target`. */
export function useCountdown(target: Date): CountdownState {
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return useMemo(() => {
    const diff = target.getTime() - now;
    const ended = diff <= 0;
    const total = Math.max(0, diff);
    return {
      days: Math.floor(total / 86_400_000),
      hours: Math.floor(total / 3_600_000) % 24,
      minutes: Math.floor(total / 60_000) % 60,
      seconds: Math.floor(total / 1000) % 60,
      ended,
    };
  }, [target, now]);
}
