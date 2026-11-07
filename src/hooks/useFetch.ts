import { useState, useEffect, useCallback } from "react";

export interface UseFetchResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Generic data fetching hook with AbortController, error handling,
 * loading states, and refetch capability.
 *
 * @param fetchFn - Memoized async function taking an optional AbortSignal and returning Promise<T>
 * @returns {UseFetchResult<T>} data, isLoading, error, refetch
 */
export function useFetch<T>(
  fetchFn: (signal?: AbortSignal) => Promise<T>,
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(false);

  const refetch = useCallback(() => {
    setTrigger((prev) => !prev);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function execute() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchFn(controller.signal);
        setData(result);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    execute();

    return () => {
      controller.abort();
    };
  }, [trigger, fetchFn]);

  return { data, isLoading, error, refetch };
}

export default useFetch;
