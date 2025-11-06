import { z } from 'zod';

export const broadcastSummarySchema = z.object({
  totalTargets: z.number().int().nonnegative(),
  succeeded: z.number().int().nonnegative(),
  failed: z.number().int().nonnegative(),
  pending: z.number().int().nonnegative(),
  latency: z.object({
    minMs: z.number().nullable(),
    p50Ms: z.number().nullable(),
    p95Ms: z.number().nullable()
  })
});

export const broadcastResultSchema = z.object({
  targetId: z.string(),
  ok: z.boolean().nullable(),
  httpStatus: z.number().int().nullable(),
  latencyMs: z.number().nullable(),
  error: z.string().nullable(),
  responseSnippet: z.string().nullable(),
  timestamp: z.string()
});

export const broadcastResponseSchema = z.object({
  requestId: z.string(),
  status: z.enum(['pending', 'running', 'complete', 'failed', 'timeout']),
  submittedAt: z.string(),
  summary: broadcastSummarySchema,
  results: z.array(broadcastResultSchema)
});

export const auditLogEntrySchema = z.object({
  id: z.string(),
  requestId: z.string(),
  targetId: z.string(),
  status: z.enum(['success', 'fail']),
  adminUser: z.string(),
  code: z.string(),
  responseSnippet: z.string().nullable(),
  createdAt: z.string(),
  latencyMs: z.number().nullable()
});

export const paginatedAuditLogsSchema = z.object({
  data: z.array(auditLogEntrySchema),
  page: z.number().int(),
  pageSize: z.number().int(),
  total: z.number().int()
});

export const healthSchema = z.object({
  status: z.string(),
  latencyMs: z.number().optional(),
  timestamp: z.string().optional()
});

export type BroadcastResponseSchema = z.infer<typeof broadcastResponseSchema>;
export type AuditLogEntrySchema = z.infer<typeof auditLogEntrySchema>;
export type PaginatedAuditLogsSchema = z.infer<typeof paginatedAuditLogsSchema>;
export type HealthSchema = z.infer<typeof healthSchema>;
