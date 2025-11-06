import { Fragment, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { getAuditLogs } from '../api/logs';
import type { AuditLogEntry } from '../api/types';
import { DateRangePicker } from '../components/DateRangePicker';
import { Pagination } from '../components/Pagination';
import { formatDate } from '../utils/format';

const PAGE_SIZE = 10;

const AuditLogs: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  const filters = useMemo(() => {
    return {
      page: Number(searchParams.get('page') ?? '1'),
      pageSize: Number(searchParams.get('pageSize') ?? PAGE_SIZE),
      targetId: searchParams.get('target_id') ?? undefined,
      status: (searchParams.get('status') as 'success' | 'fail' | null) ?? undefined,
      adminUser: searchParams.get('adminUser') ?? undefined,
      from: searchParams.get('from') ?? undefined,
      to: searchParams.get('to') ?? undefined
    };
  }, [searchParams]);

  const query = useQuery({
    queryKey: ['audit-logs', filters],
    queryFn: () =>
      getAuditLogs({
        page: filters.page,
        pageSize: filters.pageSize,
        targetId: filters.targetId,
        status: filters.status,
        adminUser: filters.adminUser,
        from: filters.from,
        to: filters.to
      })
  });

  const logs = query.data?.data ?? [];

  const updateParams = (next: Record<string, string | number | undefined | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    setSearchParams(params);
  };

  const countByDay = useMemo(() => {
    const counts: Record<string, { date: string; success: number; fail: number }> = {};
    logs.forEach((log) => {
      const day = log.createdAt.slice(0, 10);
      if (!counts[day]) {
        counts[day] = { date: day, success: 0, fail: 0 };
      }
      counts[day][log.status] += 1;
    });
    return Object.values(counts).sort((a, b) => a.date.localeCompare(b.date));
  }, [logs]);

  const successRate = useMemo(() => {
    if (!logs.length) return 0;
    const success = logs.filter((log) => log.status === 'success').length;
    return Number(((success / logs.length) * 100).toFixed(1));
  }, [logs]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Audit Logs</h1>
          <p className="text-sm text-slate-600">
            Inspect historical broadcast executions with server-side pagination and filtering.
          </p>
        </div>
        <div className="rounded-full bg-slate-200 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Success rate: {successRate}%
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Target</label>
            <input
              type="text"
              value={filters.targetId ?? ''}
              onChange={(event) => updateParams({ target_id: event.target.value || undefined, page: 1 })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="edge-123"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Status</label>
            <select
              value={filters.status ?? ''}
              onChange={(event) => updateParams({ status: event.target.value || undefined, page: 1 })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
            >
              <option value="">All</option>
              <option value="success">Success</option>
              <option value="fail">Fail</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Admin</label>
            <input
              type="text"
              value={filters.adminUser ?? ''}
              onChange={(event) => updateParams({ adminUser: event.target.value || undefined, page: 1 })}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              placeholder="ops@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Date Range</label>
            <DateRangePicker
              from={filters.from}
              to={filters.to}
              onChange={(range) =>
                updateParams({ from: range.from ?? undefined, to: range.to ?? undefined, page: 1 })
              }
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700">Daily delivery counts</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={countByDay}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="success" stackId="a" fill="#22c55e" name="Success" />
                <Bar dataKey="fail" stackId="a" fill="#ef4444" name="Fail" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-700">Success trend</h2>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={countByDay.map((item) => ({
                  date: item.date,
                  rate: item.success + item.fail > 0 ? Math.round((item.success / (item.success + item.fail)) * 100) : 0
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="rate" stroke="#0ea5e9" strokeWidth={2} dot={false} name="Success %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {query.isLoading ? (
          <div className="px-4 py-12 text-center text-sm text-slate-500">Loading audit logs…</div>
        ) : logs.length === 0 ? (
          <div className="px-4 py-12 text-center text-sm text-slate-500">No audit logs found for the selected filters.</div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Request</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Target</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Admin</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Latency</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() => setSelectedLog(log)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-slate-800">{log.requestId}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{log.targetId}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-700">
                      {log.status === 'success' ? (
                        <span className="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          Success
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                          Fail
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-700">{log.adminUser}</td>
                    <td className="px-4 py-3 text-sm text-slate-700">{log.latencyMs ? `${log.latencyMs} ms` : '—'}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{formatDate(log.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              page={filters.page}
              pageSize={filters.pageSize}
              total={query.data?.total ?? 0}
              onPageChange={(page) => updateParams({ page })}
            />
          </>
        )}
      </div>

      <Transition show={Boolean(selectedLog)} as={Fragment}>
        <Dialog onClose={() => setSelectedLog(null)} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-slate-900/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-4"
          >
            <div className="fixed inset-0 flex items-end justify-center p-4 sm:items-center">
              <Dialog.Panel className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                <Dialog.Title className="text-lg font-semibold text-slate-900">Audit Log Details</Dialog.Title>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <DetailRow label="Request ID" value={selectedLog?.requestId} />
                  <DetailRow label="Target" value={selectedLog?.targetId} />
                  <DetailRow label="Status" value={selectedLog?.status ?? undefined} />
                  <DetailRow label="Admin" value={selectedLog?.adminUser} />
                  <DetailRow
                    label="Latency"
                    value={selectedLog?.latencyMs ? `${selectedLog.latencyMs} ms` : undefined}
                  />
                  <DetailRow label="Timestamp" value={selectedLog ? formatDate(selectedLog.createdAt) : undefined} />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Response Snippet</p>
                    <pre className="mt-1 max-h-48 overflow-auto rounded-md bg-slate-900/90 p-3 text-xs text-slate-100">
                      {selectedLog?.responseSnippet ?? 'No response captured.'}
                    </pre>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                    onClick={() => setSelectedLog(null)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm text-slate-800">{value ?? '—'}</p>
  </div>
);

export default AuditLogs;
