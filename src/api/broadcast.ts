import { apiFetch } from './client';
import { broadcastResponseSchema } from './schemas';
import type { BroadcastRequest, BroadcastResponse } from './types';

export const startBroadcast = async (payload: BroadcastRequest): Promise<BroadcastResponse> => {
  const response = await apiFetch<unknown>('/push-code', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
  return broadcastResponseSchema.parse(response);
};

export const getBroadcastStatus = async (requestId: string): Promise<BroadcastResponse> => {
  const response = await apiFetch<unknown>(`/requests/${requestId}`, {
    method: 'GET'
  });
  return broadcastResponseSchema.parse(response);
};
