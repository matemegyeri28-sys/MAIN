import clsx from 'clsx';

interface StatusPillProps {
  status: 'success' | 'failed' | 'pending';
}

export const StatusPill: React.FC<StatusPillProps> = ({ status }) => {
  const style =
    status === 'success'
      ? 'bg-green-100 text-green-800 border-green-200'
      : status === 'failed'
        ? 'bg-red-100 text-red-800 border-red-200'
        : 'bg-slate-100 text-slate-700 border-slate-200';

  return (
    <span className={clsx('inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold', style)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
