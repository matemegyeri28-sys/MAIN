import { v4 as uuid } from 'uuid';
import { broadcastResponseSchema, paginatedAuditLogsSchema, healthSchema } from './schemas';
import type {
  BroadcastRequest,
  BroadcastResponse,
  PaginatedAuditLogs,
  HealthResponse
} from './types';

export class ApiError extends Error {
  public readonly status: number;
  public readonly payload?: unknown;

  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.payload = payload;
  }
}

type TokenSupplier = () => Promise<string | null> | string | null;

let tokenSupplier: TokenSupplier = () => null;
let customAudience: string | undefined;
let customIssuer: string | undefined;
let baseUrlOverride: string | undefined;

export const registerAuthTokenProvider = (supplier: TokenSupplier) => {
  tokenSupplier = supplier;
};

export const configureAudienceHeaders = ({
  audience,
  issuer
}: {
  audience?: string;
  issuer?: string;
}) => {
  customAudience = audience;
  customIssuer = issuer;
};

export const __internalSetBaseUrl = (value?: string) => {
  baseUrlOverride = value;
};

const ensureBaseUrl = () => {
  const baseUrl = baseUrlOverride ?? import.meta.env.VITE_BACKEND_BASE_URL;
  if (!baseUrl) {
    throw new Error('VITE_BACKEND_BASE_URL is not configured');
  }
  return baseUrl;
};

interface RequestOptions extends RequestInit {
  skipAuth?: boolean;
}

export const apiFetch = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const baseUrl = ensureBaseUrl();

  if (baseUrl === 'mock') {
    return mockBackend.handle<T>(path, options);
  }

  const url = `${baseUrl.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
  const headers = new Headers(options.headers ?? {});

  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }

  if (!options.skipAuth) {
    const token = await tokenSupplier();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    if (customAudience) {
      headers.set('X-Audience', customAudience);
    }
    if (customIssuer) {
      headers.set('X-Issuer', customIssuer);
    }
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  const contentType = response.headers.get('content-type');
  const payload = contentType && contentType.includes('application/json') ? await response.json() : await response.text();

  if (!response.ok) {
    throw new ApiError(response.statusText || 'Request failed', response.status, payload);
  }

  return payload as T;
};

class MockBackend {
  private requests = new Map<
    string,
    {
      request: BroadcastRequest;
      submittedAt: string;
      totalTargets: number;
      seedTargets: string[];
    }
  >();

  private auditLogs: PaginatedAuditLogs['data'] = Array.from({ length: 42 }).map((_, idx) => ({
    id: uuid(),
    requestId: `req-${Math.floor(idx / 3)}`,
    targetId: `edge-${(idx % 5) + 1}`,
    status: idx % 7 === 0 ? 'fail' : 'success',
    adminUser: idx % 2 === 0 ? 'ops@example.com' : 'sre@example.com',
    code: idx % 7 === 0 ? 'hotfix-rollback' : 'release-2024-03-01',
    responseSnippet: idx % 7 === 0 ? 'Traceback...Error' : '200 OK',
    createdAt: new Date(Date.now() - idx * 3600 * 1000).toISOString(),
    latencyMs: idx % 7 === 0 ? 1200 : 380
  }));

  async handle<T>(path: string, options: RequestOptions = {}): Promise<T> {
    if (path.startsWith('/push-code')) {
      return this.handlePushCode(options) as unknown as T;
    }
    if (path.startsWith('/requests/')) {
      const requestId = path.replace('/requests/', '').split('?')[0];
      return this.handleRequestStatus(requestId) as unknown as T;
    }
    if (path.startsWith('/audit-logs')) {
      const url = new URL(`https://mock${path}`);
      return this.handleAuditLogs(url.searchParams) as unknown as T;
    }
    if (path.startsWith('/health')) {
      return this.handleHealth() as unknown as T;
    }
    throw new ApiError(`Mock endpoint not implemented for ${path}`, 404);
  }

  private async handlePushCode(options: RequestOptions) {
    const body = typeof options.body === 'string' ? JSON.parse(options.body) : options.body;
    const requestId = uuid();
    const targets: string[] = Array.isArray(body?.targets) && body.targets.length > 0
      ? body.targets
      : Array.from({ length: 8 }).map((_, idx) => `edge-${idx + 1}`);

    this.requests.set(requestId, {
      request: body,
      submittedAt: new Date().toISOString(),
      totalTargets: targets.length,
      seedTargets: targets
    });

    return {
      requestId,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      summary: {
        totalTargets: targets.length,
        succeeded: 0,
        failed: 0,
        pending: targets.length,
        latency: {
          minMs: null,
          p50Ms: null,
          p95Ms: null
        }
      },
      results: []
    } satisfies BroadcastResponse;
  }

  private async handleRequestStatus(requestId: string) {
    const state = this.requests.get(requestId);
    if (!state) {
      throw new ApiError('Request not found', 404);
    }

    const elapsed = Date.now() - new Date(state.submittedAt).getTime();
    const results = state.seedTargets.map((target, idx) => {
      const stage = (idx + 1) * 1200;
      if (elapsed < stage) {
        return {
          targetId: target,
          ok: null,
          httpStatus: null,
          latencyMs: null,
          error: null,
          responseSnippet: null,
          timestamp: new Date(state.submittedAt).toISOString()
        };
      }
      const failed = idx % 5 === 0;
      return {
        targetId: target,
        ok: !failed,
        httpStatus: failed ? 500 : 200,
        latencyMs: 200 + idx * 37,
        error: failed ? 'Synthetic failure for demo' : null,
        responseSnippet: failed ? 'Traceback (most recent call last)...' : 'Success',
        timestamp: new Date(new Date(state.submittedAt).getTime() + stage).toISOString()
      };
    });

    const completed = results.filter((r) => r.ok !== null);
    const succeeded = completed.filter((r) => r.ok).length;
    const failed = completed.filter((r) => r.ok === false).length;
    const pending = results.length - completed.length;
    const latencies = completed.map((r) => r.latencyMs ?? 0).sort((a, b) => a - b);
    const percentile = (p: number) => {
      if (latencies.length === 0) return null;
      const idx = Math.min(latencies.length - 1, Math.floor((p / 100) * latencies.length));
      return latencies[idx];
    };

    const status = pending > 0 ? 'running' : failed > 0 ? 'failed' : 'complete';

    const payload = {
      requestId,
      status,
      submittedAt: state.submittedAt,
      summary: {
        totalTargets: state.totalTargets,
        succeeded,
        failed,
        pending,
        latency: {
          minMs: latencies.length > 0 ? latencies[0] : null,
          p50Ms: percentile(50),
          p95Ms: percentile(95)
        }
      },
      results
    } satisfies BroadcastResponse;

    return broadcastResponseSchema.parse(payload);
  }

  private async handleAuditLogs(params: URLSearchParams) {
    const page = Number(params.get('page') ?? '1');
    const pageSize = Number(params.get('pageSize') ?? '10');
    const status = params.get('status');
    const targetId = params.get('target_id');
    const adminUser = params.get('adminUser');

    const filtered = this.auditLogs.filter((entry) => {
      if (status && entry.status !== status) return false;
      if (targetId && entry.targetId !== targetId) return false;
      if (adminUser && entry.adminUser !== adminUser) return false;
      return true;
    });

    const start = (page - 1) * pageSize;
    const data = filtered.slice(start, start + pageSize);

    return paginatedAuditLogsSchema.parse({
      data,
      page,
      pageSize,
      total: filtered.length
    });
  }

  private async handleHealth(): Promise<HealthResponse> {
    return healthSchema.parse({
      status: 'ok',
      latencyMs: 42,
      timestamp: new Date().toISOString()
    });
  }
}

const mockBackend = new MockBackend();

export { mockBackend };
