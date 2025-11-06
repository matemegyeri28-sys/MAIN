export type BroadcastStatus = 'pending' | 'running' | 'complete' | 'failed' | 'timeout';

export interface BroadcastRequest {
  code: string;
  targets?: string[];
  idempotencyKey: string;
}

export interface BroadcastSummary {
  totalTargets: number;
  succeeded: number;
  failed: number;
  pending: number;
  latency: {
    minMs: number | null;
    p50Ms: number | null;
    p95Ms: number | null;
  };
}

export interface BroadcastResult {
  targetId: string;
  ok: boolean | null;
  httpStatus: number | null;
  latencyMs: number | null;
  error: string | null;
  responseSnippet: string | null;
  timestamp: string;
}

export interface BroadcastResponse {
  requestId: string;
  status: BroadcastStatus;
  submittedAt: string;
  summary: BroadcastSummary;
  results: BroadcastResult[];
}

export interface AuditLogEntry {
  id: string;
  requestId: string;
  targetId: string;
  status: 'success' | 'fail';
  adminUser: string;
  code: string;
  responseSnippet: string | null;
  createdAt: string;
  latencyMs: number | null;
}

export interface PaginatedAuditLogs {
  data: AuditLogEntry[];
  page: number;
  pageSize: number;
  total: number;
}

export interface AuditLogFilters {
  page?: number;
  pageSize?: number;
  targetId?: string;
  status?: 'success' | 'fail';
  adminUser?: string;
  from?: string;
  to?: string;
}

export interface HealthResponse {
  status: string;
  latencyMs?: number;
  timestamp?: string;
}
