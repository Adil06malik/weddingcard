import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Particle {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
}

/** Gentle, GPU-friendly gold motes drifting upward behind content. */
export function GoldParticles({ count = 18, className }: { count?: number; className?: string }) {
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        size: 2 + Math.random() * 4,
        duration: 14 + Math.random() * 16,
        delay: Math.random() * 16,
        drift: (Math.random() - 0.5) * 80,
      })),
    [count],
  );

  if (reduced || !mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            // @ts-expect-error custom property consumed by the keyframe
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
