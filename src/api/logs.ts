import qs from 'qs';
import { apiFetch } from './client';
import { paginatedAuditLogsSchema } from './schemas';
import type { AuditLogFilters, PaginatedAuditLogs } from './types';

export const getAuditLogs = async (filters: AuditLogFilters): Promise<PaginatedAuditLogs> => {
  const query = qs.stringify(filters, { addQueryPrefix: true, skipNulls: true });
  const response = await apiFetch<unknown>(`/audit-logs${query}`);
  return paginatedAuditLogsSchema.parse(response);
};
