import { useCallback, useEffect, useState } from "react";
import { getLocalStorageBoolean, setLocalStorageBoolean, subscribeToLocalStorageBoolean } from "../utility";

/**
 * Persists a boolean and synchronizes controls across mounted components and browser tabs.
 * @param key Storage key for the preference.
 * @param fallback Value used when no valid saved preference exists.
 * @returns The current value and a setter for the preference.
 * @example
 * ```ts
 * const [enabled, setEnabled] = useLocalStorageBoolean(localStorageKeys.graphTooltipAdvantage);
 * ```
 */
export default function useLocalStorageBoolean(key: string, fallback = false) {
  const [value, setValue] = useState(() => getLocalStorageBoolean(key, fallback));

  useEffect(() => {
    const unsubscribe = subscribeToLocalStorageBoolean(key, setValue, fallback);
    setValue(getLocalStorageBoolean(key, fallback));
    return unsubscribe;
  }, [key, fallback]);

  const update = useCallback((next: boolean) => {
    setValue(next);
    setLocalStorageBoolean(key, next);
  }, [key]);

  return [value, update] as const;
}
