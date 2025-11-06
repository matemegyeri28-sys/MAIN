import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../api/client';
import { healthSchema } from '../api/schemas';
import type { HealthResponse } from '../api/types';

const Settings: React.FC = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_BASE_URL ?? 'Not configured';
  const pollInterval = import.meta.env.VITE_POLL_INTERVAL_MS ?? '1000';
  const pollTimeout = import.meta.env.VITE_POLL_TIMEOUT_MS ?? '60000';
  const appName = typeof __APP_NAME__ !== 'undefined' ? __APP_NAME__ : 'Lovable Broadcast Admin';
  const appVersion = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.0';

  const healthQuery = useQuery({
    queryKey: ['health-check'],
    queryFn: async () => {
      const response = await apiFetch<unknown>('/health', { method: 'GET' });
      return healthSchema.parse(response);
    },
    retry: 1
  });

  const [testResult, setTestResult] = useState<HealthResponse | null>(null);
  const [testError, setTestError] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const handleTestConnection = async () => {
    setTesting(true);
    setTestError(null);
    const started = performance.now();
    try {
      const response = await apiFetch<unknown>('/health', { method: 'GET' });
      const parsed = healthSchema.parse(response);
      setTestResult({ ...parsed, latencyMs: Math.round(performance.now() - started) });
    } catch (error) {
      console.error(error);
      setTestError(error instanceof Error ? error.message : 'Unexpected error');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-600">
          Inspect environment configuration, monitor backend health, and validate connectivity.
        </p>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Environment</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <Detail label="App name" value={appName} />
          <Detail label="App version" value={appVersion} />
          <Detail label="Backend URL" value={backendUrl} masked={backendUrl.startsWith('http') ? false : undefined} />
          <Detail label="Polling interval" value={`${pollInterval} ms`} />
          <Detail label="Polling timeout" value={`${pollTimeout} ms`} />
          <Detail label="Mock mode" value={backendUrl === 'mock' ? 'Enabled' : 'Disabled'} />
        </dl>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Backend Health</h2>
            <p className="text-sm text-slate-600">Latest health status from the FastAPI backend.</p>
          </div>
          <button
            onClick={() => healthQuery.refetch()}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            Refresh
          </button>
        </div>
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
          {healthQuery.isLoading && <p>Checking health…</p>}
          {healthQuery.isError && <p className="text-red-600">Health check failed.</p>}
          {healthQuery.data && (
            <div className="space-y-1">
              <p>
                <span className="font-semibold">Status:</span> {healthQuery.data.status}
              </p>
              {healthQuery.data.latencyMs !== undefined && healthQuery.data.latencyMs !== null ? (
                <p>
                  <span className="font-semibold">Latency:</span> {healthQuery.data.latencyMs} ms
                </p>
              ) : null}
              {healthQuery.data.timestamp ? (
                <p>
                  <span className="font-semibold">Timestamp:</span> {healthQuery.data.timestamp}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Test Connection</h2>
        <p className="text-sm text-slate-600">
          Execute a live round-trip request to validate connectivity and measure latency.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleTestConnection}
            disabled={testing}
            className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {testing ? 'Testing…' : 'Test Connection'}
          </button>
          {testResult ? (
            <span className="text-sm font-medium text-green-600">OK • {testResult.latencyMs ?? '—'} ms</span>
          ) : null}
          {testError ? <span className="text-sm font-medium text-red-600">{testError}</span> : null}
        </div>
      </section>
    </div>
  );
};

const Detail: React.FC<{ label: string; value: string; masked?: boolean }> = ({ label, value, masked }) => (
  <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-medium text-slate-800">{masked ? maskValue(value) : value}</p>
  </div>
);

const maskValue = (value: string) => {
  if (value.length <= 6) return '•••••';
  return `${value.slice(0, 4)}••••${value.slice(-4)}`;
};

export default Settings;
