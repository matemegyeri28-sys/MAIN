import { useEffect, useRef, useState } from 'react';
import { useQuery, QueryKey } from '@tanstack/react-query';

interface UsePollingOptions<T> {
  queryKey: QueryKey;
  queryFn: () => Promise<T>;
  enabled?: boolean;
  intervalMs: number;
  timeoutMs: number;
  stopWhen?: (data: T | undefined) => boolean;
  onTimeout?: () => void;
}

export const usePolling = <T,>({
  queryKey,
  queryFn,
  enabled = true,
  intervalMs,
  timeoutMs,
  stopWhen,
  onTimeout
}: UsePollingOptions<T>) => {
  const [stopped, setStopped] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!enabled || stopped) return;
    timerRef.current = setTimeout(() => {
      setStopped(true);
      onTimeout?.();
    }, timeoutMs);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [enabled, onTimeout, stopped, timeoutMs]);

  useEffect(() => {
    if (stopped && timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [stopped]);

  const query = useQuery({
    queryKey,
    queryFn,
    enabled: enabled && !stopped,
    refetchInterval: (data) => {
      if (stopped) return false;
      if (stopWhen && stopWhen(data as T)) {
        setStopped(true);
        return false;
      }
      return intervalMs;
    },
    retry: 3,
    retryDelay: (attempt) => Math.min(2 ** attempt * 500, 4000)
  });

  useEffect(() => {
    if (!enabled) {
      setStopped(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [enabled]);

  return {
    ...query,
    stopped,
    stop: () => setStopped(true),
    resume: () => {
      setStopped(false);
      query.refetch();
    }
  };
};
