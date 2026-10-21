/**
 * @file useEsportsData.ts
 * @description Loads list responses from OpenDota with independent loading, error, cancellation, and retry state.
 * @remarks A null path disables fetching. Obsolete responses are discarded when the path changes or the component unmounts.
 */

import { useEffect, useState } from "react";
import config from "../../config";

/**
 * Fetches an OpenDota list and manages request cancellation and manual retries.
 * @template T The element type expected in the API response.
 * @param path API-relative path, such as leagues; null disables the request.
 * @returns The current data, loading/error flags, and a retry callback.
 * @example
 * const { data, loading, error, retry } = useEsportsData<League>("leagues");
 * // Inside a component: data becomes the league array after a successful request.
 * const history = useEsportsData<ProfessionalMatch>(leagueId ? `leagues/${leagueId}/matches` : null);
 * // No history request is made when leagueId is absent.
 */
export default function useEsportsData<T>(path: string | null) {
  const [state, setState] = useState<{
    path: string | null;
    data: T[];
    loading: boolean;
    error: boolean;
  }>({ path, data: [], loading: !!path, error: false });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    setState({ path, data: [], loading: true, error: false });
    fetch(`${config.VITE_API_HOST}/api/${path}`, {
      credentials: "include",
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("Expected a list");
        if (!controller.signal.aborted) {
          setState({ path, data, loading: false, error: false });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ path, data: [], loading: false, error: true });
        }
      });
    return () => controller.abort();
  }, [path, attempt]);

  return {
    ...(state.path === path ? state : { data: [], loading: !!path, error: false }),
    retry: () => setAttempt((value) => value + 1),
  };
}
