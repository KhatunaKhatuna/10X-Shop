import { useState, useEffect } from "react";
import {
  getFromLocalStorage,
  setInLocalStorage,
  type StorageKey,
} from "@/utils";

/**
 * Custom hook to synchronize a React state with localStorage via useEffect.
 */
export default function useLocalStorage<T>(key: StorageKey, initialValue: T) {
  // 1. Lazy state initialization: reads from storage once on mount
  const [storedValue, setStoredValue] = useState<T>(() =>
    getFromLocalStorage(key, initialValue),
  );

  // 2. Side effect: synchronizes to localStorage whenever key or storedValue changes
  useEffect(() => {
    setInLocalStorage(key, storedValue);
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}
