import { useCallback, useEffect, useState } from "react";

/** Persists a value to sessionStorage (per tab) — used for music preference. */
export function useSessionState<T>(key: string, initial: T): [T, (v: T) => void] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = sessionStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode — ignore */
    }
  }, [key, value]);

  const set = useCallback((v: T) => setValue(v), []);
  return [value, set];
}
