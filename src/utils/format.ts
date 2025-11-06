import { format, formatDistanceToNowStrict, parseISO } from 'date-fns';
import type { BroadcastResult } from '../api/types';

export const formatDate = (value: string) => {
  try {
    return format(parseISO(value), 'PPpp');
  } catch {
    return value;
  }
};

export const timeAgo = (value: string) => {
  try {
    return formatDistanceToNowStrict(parseISO(value), { addSuffix: true });
  } catch {
    return value;
  }
};

export const formatLatency = (value: number | null | undefined) => {
  if (value === null || value === undefined) return '—';
  return `${value.toFixed(0)} ms`;
};

export const formatResultStatus = (result: BroadcastResult) => {
  if (result.ok === null) return 'Pending';
  return result.ok ? 'Success' : 'Failed';
};
