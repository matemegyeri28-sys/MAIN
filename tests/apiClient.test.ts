import { describe, expect, it, beforeEach } from 'vitest';
import { apiFetch, __internalSetBaseUrl } from '../src/api/client';

const sampleRequest = {
  code: 'console.log("hello")',
  idempotencyKey: 'test-key',
  targets: ['edge-1', 'edge-2']
};

describe('api/client', () => {
  beforeEach(() => {
    __internalSetBaseUrl(undefined);
  });

  it('throws when base URL is missing', async () => {
    await expect(apiFetch('/health')).rejects.toThrow('VITE_BACKEND_BASE_URL is not configured');
  });

  it('supports mock backend interactions', async () => {
    __internalSetBaseUrl('mock');
    const start = await apiFetch<any>('/push-code', {
      method: 'POST',
      body: JSON.stringify(sampleRequest)
    });

    expect(start).toHaveProperty('requestId');

    const status = await apiFetch<any>(`/requests/${start.requestId}`);
    expect(status).toHaveProperty('summary');
    expect(Array.isArray(status.results)).toBe(true);
  });
});
