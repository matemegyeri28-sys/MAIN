interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, pageSize, total, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const goTo = (next: number) => {
    if (next < 1 || next > totalPages) return;
    onPageChange(next);
  };

  return (
    <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 text-sm text-slate-600">
      <p>
        Showing <span className="font-semibold">{Math.min(total, (page - 1) * pageSize + 1)}</span> to{' '}
        <span className="font-semibold">{Math.min(page * pageSize, total)}</span> of{' '}
        <span className="font-semibold">{total}</span> results
      </p>
      <div className="flex items-center gap-2">
        <button
          className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>
          Page <span className="font-semibold">{page}</span> of <span className="font-semibold">{totalPages}</span>
        </span>
        <button
          className="rounded-md border border-slate-300 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
