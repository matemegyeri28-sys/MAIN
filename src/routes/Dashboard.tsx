import { useEffect, useMemo, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { startBroadcast, getBroadcastStatus } from '../api/broadcast';
import { configureAudienceHeaders } from '../api/client';
import type { BroadcastRequest, BroadcastResponse } from '../api/types';
import { usePolling } from '../hooks/usePolling';
import { CodeInputCard } from '../components/CodeInputCard';
import { ResultsTable } from '../components/ResultsTable';
import { useToast } from '../components/Toast';
import { exportToCSV, exportToJSON } from '../utils/export';

const pollInterval = Number(import.meta.env.VITE_POLL_INTERVAL_MS ?? 1000);
const pollTimeout = Number(import.meta.env.VITE_POLL_TIMEOUT_MS ?? 60000);

const DEFAULT_TARGETS = ['edge-1', 'edge-2', 'edge-3', 'edge-4', 'edge-5', 'edge-6', 'edge-7', 'edge-8'];

const Dashboard: React.FC = () => {
  const toast = useToast();
  const [currentRequestId, setCurrentRequestId] = useState<string | null>(null);
  const [latestResponse, setLatestResponse] = useState<BroadcastResponse | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: BroadcastRequest) => startBroadcast(payload),
    onSuccess: (data, variables) => {
      setCurrentRequestId(data.requestId);
      setLatestResponse(data);
      setTimedOut(false);
      toast.publish({
        title: 'Broadcast started',
        description: `Request ${data.requestId} queued for ${variables.targets?.length ?? DEFAULT_TARGETS.length} targets`,
        variant: 'success'
      });
    },
    onError: (error) => {
      console.error(error);
      toast.publish({
        title: 'Broadcast failed to start',
        description: error instanceof Error ? error.message : 'Unexpected error',
        variant: 'error'
      });
    }
  });

  const polling = usePolling<BroadcastResponse>({
    queryKey: ['broadcast-status', currentRequestId],
    queryFn: () => getBroadcastStatus(currentRequestId!),
    enabled: Boolean(currentRequestId),
    intervalMs: pollInterval,
    timeoutMs: pollTimeout,
    stopWhen: (data) => {
      if (!data) return false;
      return ['complete', 'failed', 'timeout'].includes(data.status);
    },
    onTimeout: () => {
      setTimedOut(true);
      toast.publish({
        title: 'Polling timed out',
        description: 'No final status received before the configured timeout.',
        variant: 'warning'
      });
    }
  });

  useEffect(() => {
    if (polling.data) {
      setLatestResponse(polling.data);
    }
  }, [polling.data]);

  const summary = latestResponse?.summary;
  const results = useMemo(() => latestResponse?.results ?? [], [latestResponse]);

  const handleSubmit = (values: {
    code: string;
    targets: string[];
    idempotencyKey: string;
    audience?: string;
    issuer?: string;
  }) => {
    configureAudienceHeaders({ audience: values.audience, issuer: values.issuer });
    mutation.mutate({
      code: values.code,
      targets: values.targets,
      idempotencyKey: values.idempotencyKey
    });
  };

  const statusBadge = latestResponse?.status ?? 'idle';

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Broadcast Control Center</h1>
          <p className="text-sm text-slate-600">
            Trigger broadcasts, monitor live status, and export delivery outcomes in real time.
          </p>
        </div>
        <div className="rounded-full bg-slate-200 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-600">
          Status: {statusBadge}
        </div>
      </div>

      <CodeInputCard defaultTargets={DEFAULT_TARGETS} onSubmit={handleSubmit} loading={mutation.isPending} />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard title="Total Targets" value={summary?.totalTargets ?? 0} tone="slate" />
        <MetricCard title="Succeeded" value={summary?.succeeded ?? 0} tone="green" />
        <MetricCard title="Failed" value={summary?.failed ?? 0} tone="red" />
        <MetricCard title="Pending" value={summary?.pending ?? 0} tone="amber" />
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <LatencyCard label="Min" value={summary?.latency.minMs} />
        <LatencyCard label="p50" value={summary?.latency.p50Ms} />
        <LatencyCard label="p95" value={summary?.latency.p95Ms} />
      </section>

      {timedOut ? (
        <div className="rounded-lg border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
          Polling timed out. You can retry fetching the latest status.
          <button
            className="ml-4 rounded-md border border-yellow-400 px-3 py-1 text-xs font-semibold text-yellow-800 hover:bg-yellow-100"
            onClick={() => {
              if (currentRequestId) {
                setTimedOut(false);
                polling.resume();
              }
            }}
          >
            Retry
          </button>
        </div>
      ) : null}

      <div className="flex items-center justify-end gap-2">
        <button
          onClick={() =>
            exportToCSV(
              `broadcast-${currentRequestId ?? 'latest'}`,
              results.map((result) => ({
                targetId: result.targetId,
                status: result.ok === null ? 'pending' : result.ok ? 'success' : 'failed',
                httpStatus: result.httpStatus ?? '',
                latencyMs: result.latencyMs ?? '',
                error: result.error ?? '',
                responseSnippet: result.responseSnippet ?? '',
                timestamp: result.timestamp
              }))
            )
          }
          className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100"
          disabled={results.length === 0}
        >
          Export CSV
        </button>
        <button
          onClick={() => exportToJSON(`broadcast-${currentRequestId ?? 'latest'}`, results)}
          className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-100"
          disabled={results.length === 0}
        >
          Export JSON
        </button>
      </div>

      <ResultsTable results={results} isLoading={polling.isFetching} />
    </div>
  );
};

const MetricCard: React.FC<{ title: string; value: number; tone: 'slate' | 'green' | 'red' | 'amber' }> = ({
  title,
  value,
  tone
}) => {
  const toneTextClass =
    tone === 'green'
      ? 'text-green-600'
      : tone === 'red'
        ? 'text-red-600'
        : tone === 'amber'
          ? 'text-amber-600'
          : 'text-slate-700';
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className={`mt-2 text-2xl font-semibold ${toneTextClass}`}>{value}</p>
    </div>
  );
};

const LatencyCard: React.FC<{ label: string; value: number | null | undefined }> = ({ label, value }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-sm font-medium text-slate-500">Latency {label}</p>
    <p className="mt-2 text-xl font-semibold text-slate-800">
      {value !== null && value !== undefined ? `${value.toFixed(0)} ms` : '—'}
    </p>
  </div>
);

export default Dashboard;
