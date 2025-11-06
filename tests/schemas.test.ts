import { describe, expect, it } from 'vitest';
import {
  broadcastResponseSchema,
  auditLogEntrySchema,
  paginatedAuditLogsSchema,
  healthSchema
} from '../src/api/schemas';

describe('schemas', () => {
  it('validates broadcast response', () => {
    const payload = {
      requestId: 'req-123',
      status: 'running',
      submittedAt: new Date().toISOString(),
      summary: {
        totalTargets: 5,
        succeeded: 2,
        failed: 1,
        pending: 2,
        latency: {
          minMs: 120,
          p50Ms: 200,
          p95Ms: 320
        }
      },
      results: [
        {
          targetId: 'edge-1',
          ok: true,
          httpStatus: 200,
          latencyMs: 220,
          error: null,
          responseSnippet: 'OK',
          timestamp: new Date().toISOString()
        }
      ]
    };

    expect(() => broadcastResponseSchema.parse(payload)).not.toThrow();
  });

  it('validates audit log collection', () => {
    const entry = auditLogEntrySchema.parse({
      id: '1',
      requestId: 'req-1',
      targetId: 'edge-1',
      status: 'success',
      adminUser: 'ops@example.com',
      code: 'deploy',
      responseSnippet: 'OK',
      createdAt: new Date().toISOString(),
      latencyMs: 123
    });

    const collection = {
      data: [entry],
      page: 1,
      pageSize: 10,
      total: 1
    };

    expect(() => paginatedAuditLogsSchema.parse(collection)).not.toThrow();
  });

  it('validates health payload', () => {
    expect(() =>
      healthSchema.parse({
        status: 'ok',
        latencyMs: 42,
        timestamp: new Date().toISOString()
      })
    ).not.toThrow();
  });
});
