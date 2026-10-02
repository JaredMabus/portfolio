import { useEffect, useState } from "react";
import { defaultEarthState, EARTH_STORAGE_KEY, parseEarthState } from "./earthState";

export default function useEarthState() {
  const [state, setState] = useState(() => {
    try {
      return parseEarthState(window.localStorage.getItem(EARTH_STORAGE_KEY));
    } catch {
      return defaultEarthState();
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(EARTH_STORAGE_KEY, JSON.stringify({ version: 1, state }));
    } catch {
      // React state remains usable when storage is unavailable or full.
    }
  }, [state]);

  return [state, setState] as const;
}
