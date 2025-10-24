import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import Layout from '../components/Layout';
import { api, CreativeAsset, DashboardSummary, fetcher } from '../lib/api';

export default function Dashboard() {
  const { data: summary } = useSWR<DashboardSummary>('/dashboard', fetcher);
  const { data: creatives, mutate: refreshCreatives } = useSWR<CreativeAsset[]>('/creatives', fetcher);
  const [url, setUrl] = useState('https://openai.com');
  const [objective, setObjective] = useState('Drive qualified demos');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsGenerating(true);
      setStatusMessage('Extracting source content...');
      const sourceResponse = await api.post('/sources', { url });
      setStatusMessage('Generating ad creatives...');
      await api.post('/creatives', {
        source_id: sourceResponse.data.id,
        objectives: [objective],
        creative_types: ['text', 'image']
      });
      setStatusMessage('Creatives ready!');
      await refreshCreatives();
    } catch (error) {
      setStatusMessage('Something went wrong while generating creatives.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Layout title="Dashboard | Lumina Automate">
      <div className="space-y-10">
        <div className="grid gap-4 rounded-3xl border border-slate-200/60 bg-white/70 p-8 shadow-lg shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/60 md:grid-cols-4">
          {summary ? (
            <>
              <DashboardTile label="Sources" value={summary.total_sources} />
              <DashboardTile label="Creatives" value={summary.total_creatives} />
              <DashboardTile label="Pending posts" value={summary.pending_posts} />
              <DashboardTile label="Published" value={summary.posted_this_month} />
            </>
          ) : (
            <p className="text-sm text-slate-500">Loading insights...</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex flex-col gap-2">
            <label htmlFor="url" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Website URL
            </label>
            <input
              id="url"
              type="url"
              required
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="objective" className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Campaign objective
            </label>
            <input
              id="objective"
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Drive qualified demos"
            />
          </div>
          <button
            type="submit"
            disabled={isGenerating}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isGenerating ? 'Generating creatives...' : 'Generate creatives'}
          </button>
          {statusMessage && <p className="text-sm text-slate-500 dark:text-slate-300">{statusMessage}</p>}
        </form>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Generated creatives</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {creatives?.length ? (
              creatives.map((creative) => (
                <article
                  key={creative.id}
                  className="flex h-full flex-col justify-between rounded-3xl border border-slate-200 bg-white/80 p-6 shadow dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                      {creative.type}
                    </span>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{creative.headline}</h3>
                    <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-line">
                      {creative.body}
                    </p>
                  </div>
                  {creative.call_to_action && (
                    <div className="mt-4">
                      <span className="text-xs uppercase text-slate-400">CTA</span>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{creative.call_to_action}</p>
                    </div>
                  )}
                </article>
              ))
            ) : (
              <p className="text-sm text-slate-500">No creatives yet. Generate your first set above.</p>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}

interface DashboardTileProps {
  label: string;
  value: number;
}

function DashboardTile({ label, value }: DashboardTileProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow dark:border-slate-800 dark:bg-slate-900/70">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
