export const exportToJSON = <T>(filename: string, data: T) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  triggerDownload(filename.endsWith('.json') ? filename : `${filename}.json`, blob);
};

export const exportToCSV = <T extends Record<string, unknown>>(filename: string, rows: T[]) => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [headers.join(',')]
    .concat(
      rows.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (value === null || value === undefined) return '';
            const str = String(value).replace(/"/g, '""');
            return /[",\n]/.test(str) ? `"${str}"` : str;
          })
          .join(',')
      )
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  triggerDownload(filename.endsWith('.csv') ? filename : `${filename}.csv`, blob);
};

const triggerDownload = (filename: string, blob: Blob) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
