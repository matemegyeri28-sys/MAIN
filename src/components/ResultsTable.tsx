import { useMemo, useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import clsx from 'clsx';
import { StatusPill } from './StatusPill';
import type { BroadcastResult } from '../api/types';
import { formatLatency, formatDate } from '../utils/format';

interface ResultsTableProps {
  results: BroadcastResult[];
  isLoading?: boolean;
}

export const ResultsTable: React.FC<ResultsTableProps> = ({ results, isLoading }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const rowVirtualizer = useVirtualizer({
    count: results.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64,
    overscan: 8
  });

  const empty = results.length === 0;

  const rows = useMemo(() => results, [results]);

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Live Results</h3>
          <p className="text-sm text-slate-600">Real-time status across all targets.</p>
        </div>
        {isLoading ? <span className="text-xs font-medium text-primary-600">Polling…</span> : null}
      </div>
      {empty ? (
        <div className="px-6 py-12 text-center text-sm text-slate-500">No results yet. Execute a broadcast to begin.</div>
      ) : (
        <div ref={parentRef} className="max-h-96 overflow-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Target ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  HTTP
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Latency
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Response
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td colSpan={6} className="p-0">
                  <div
                    style={{
                      height: `${rowVirtualizer.getTotalSize()}px`,
                      position: 'relative'
                    }}
                  >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                      const item = rows[virtualRow.index];
                      return (
                        <div
                          key={virtualRow.key}
                          className={clsx(
                            'grid grid-cols-6 items-center border-b border-slate-100 px-6 py-3 text-sm text-slate-700',
                            virtualRow.index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
                          )}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${virtualRow.start}px)`
                          }}
                        >
                          <div className="truncate font-medium">{item.targetId}</div>
                          <div>
                            <StatusPill
                              status={item.ok === null ? 'pending' : item.ok ? 'success' : 'failed'}
                            />
                          </div>
                          <div>{item.httpStatus ?? '—'}</div>
                          <div>{formatLatency(item.latencyMs)}</div>
                          <div className="truncate text-xs text-slate-500">{item.responseSnippet ?? '—'}</div>
                          <div className="text-xs text-slate-500">{formatDate(item.timestamp)}</div>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
