interface DateRangePickerProps {
  from?: string;
  to?: string;
  onChange: (range: { from?: string; to?: string }) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ from, to, onChange }) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
      <div className="flex flex-col">
        <label htmlFor="from" className="text-xs font-medium text-slate-600">
          From
        </label>
        <input
          id="from"
          type="datetime-local"
          className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          value={from ? from.substring(0, 16) : ''}
          onChange={(event) => onChange({ from: event.target.value ? new Date(event.target.value).toISOString() : undefined, to })}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="to" className="text-xs font-medium text-slate-600">
          To
        </label>
        <input
          id="to"
          type="datetime-local"
          className="mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
          value={to ? to.substring(0, 16) : ''}
          onChange={(event) => onChange({ from, to: event.target.value ? new Date(event.target.value).toISOString() : undefined })}
        />
      </div>
    </div>
  );
};
