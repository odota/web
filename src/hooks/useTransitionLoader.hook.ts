import { useState, useEffect, useRef } from "react";

/**
 * Hook that smoothly transitions from loader to content with a minimum display duration
 * @param loading - Current loading state
 * @param delayMs - Minimum duration to show loader in milliseconds (default: 1200ms)
 * @returns shouldShowLoader - Whether to show the loader (true if loading OR delay hasn't passed)
 */
const useTransitionLoader = (loading: boolean, delayMs = 1200): boolean => {
  const [shouldShowLoader, setShouldShowLoader] = useState(loading);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const loadingStartTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (loading) {
      // Started loading
      loadingStartTimeRef.current = Date.now();
      setShouldShowLoader(true);
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else if (loadingStartTimeRef.current) {
      // Loading finished
      const elapsedTime = Date.now() - loadingStartTimeRef.current;
      const remainingDelay = Math.max(0, delayMs - elapsedTime);

      if (remainingDelay > 0) {
        // Schedule the hide for the remaining delay
        timeoutRef.current = setTimeout(() => {
          setShouldShowLoader(false);
          loadingStartTimeRef.current = null;
        }, remainingDelay);
      } else {
        // Already waited long enough
        setShouldShowLoader(false);
        loadingStartTimeRef.current = null;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading, delayMs]);

  return shouldShowLoader;
};

export default useTransitionLoader;
