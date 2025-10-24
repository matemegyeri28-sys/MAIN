import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Layout from '../components/Layout';
import {
  ConnectedAccount,
  CreativeAsset,
  DashboardSummary,
  Subscription,
  SubscriptionPlan,
  api,
  fetcher
} from '../lib/api';
import { getStoredToken } from '../lib/auth';

export default function Dashboard() {
  const router = useRouter();
  const { data: summary } = useSWR<DashboardSummary>('/dashboard', fetcher);
  const { data: creatives, mutate: refreshCreatives } = useSWR<CreativeAsset[]>('/creatives', fetcher);
  const { data: subscription, mutate: refreshSubscription } = useSWR<Subscription | null>('/subscriptions/me', fetcher);
  const { data: plans } = useSWR<SubscriptionPlan[]>('/plans', fetcher);
  const { data: accounts, mutate: refreshAccounts } = useSWR<ConnectedAccount[]>('/accounts', fetcher);
  const [url, setUrl] = useState('https://openai.com');
  const [objective, setObjective] = useState('Drive qualified demos');
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [subscriptionMessage, setSubscriptionMessage] = useState<string | null>(null);
  const [accountPlatform, setAccountPlatform] = useState('linkedin');
  const [accountHandle, setAccountHandle] = useState('');
  const [accountToken, setAccountToken] = useState('');
  const [accountMessage, setAccountMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = getStoredToken();
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  const availablePlans = useMemo(() => {
    if (!plans) return [];
    if (subscription) {
      return plans.filter((plan) => plan.id !== subscription.plan.id);
    }
    return plans;
  }, [plans, subscription]);

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

  const handleSubscribe = async (planId: number) => {
    try {
      setSubscriptionMessage('Activating your plan...');
      await api.post('/subscriptions', { plan_id: planId, auto_renew: true });
      await refreshSubscription();
      setSubscriptionMessage('Subscription activated!');
    } catch (error) {
      console.error(error);
      setSubscriptionMessage('Unable to update subscription. Please try again later.');
    }
  };

  const handleAccountSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAccountMessage(null);
    try {
      await api.post('/accounts', {
        platform: accountPlatform,
        account_handle: accountHandle,
        access_token: accountToken,
        profile_metadata: {}
      });
      setAccountHandle('');
      setAccountToken('');
      await refreshAccounts();
      setAccountMessage('Account connected. Start scheduling posts!');
    } catch (error) {
      console.error(error);
      setAccountMessage('Unable to connect account. Check the credentials and try again.');
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

        <section className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Subscription</h2>
            {subscription ? (
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                <p className="text-base font-semibold text-slate-900 dark:text-white">{subscription.plan.name}</p>
                <p>Status: <span className="font-medium uppercase tracking-wide text-primary-500">{subscription.status}</span></p>
                <p>Billing: ${subscription.plan.price_monthly}/month — ${subscription.plan.price_yearly}/year</p>
                {subscription.ends_at && (
                  <p>Trial ends: {new Date(subscription.ends_at).toLocaleDateString()}</p>
                )}
                <p>Auto renew: {subscription.auto_renew ? 'Enabled' : 'Disabled'}</p>
                {availablePlans.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Switch plans</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {availablePlans.map((plan) => (
                        <button
                          key={plan.id}
                          onClick={() => handleSubscribe(plan.id)}
                          className="rounded-full border border-primary-200 px-3 py-1 text-xs font-semibold text-primary-600 transition hover:border-primary-400 hover:bg-primary-50"
                        >
                          {plan.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-300">Choose a plan to unlock campaign automation.</p>
                <div className="space-y-3">
                  {plans?.map((plan) => (
                    <div key={plan.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{plan.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-300">${plan.price_monthly}/month · ${plan.price_yearly}/year</p>
                        </div>
                        <button
                          onClick={() => handleSubscribe(plan.id)}
                          className="rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-700"
                        >
                          Activate trial
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {subscriptionMessage && <p className="text-xs text-slate-500 dark:text-slate-300">{subscriptionMessage}</p>}
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow dark:border-slate-800 dark:bg-slate-900/70">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Connected accounts</h2>
            <form onSubmit={handleAccountSubmit} className="space-y-3">
              <div className="flex flex-col gap-2">
                <label htmlFor="platform" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Platform
                </label>
                <select
                  id="platform"
                  value={accountPlatform}
                  onChange={(event) => setAccountPlatform(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="x">X (Twitter)</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="handle" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Account handle
                </label>
                <input
                  id="handle"
                  value={accountHandle}
                  onChange={(event) => setAccountHandle(event.target.value)}
                  placeholder="@lumina-labs"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="token" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                  Access token / OAuth secret
                </label>
                <input
                  id="token"
                  value={accountToken}
                  onChange={(event) => setAccountToken(event.target.value)}
                  placeholder="Provide a valid access token"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-700"
              >
                Connect account
              </button>
            </form>
            {accountMessage && <p className="text-xs text-slate-500 dark:text-slate-300">{accountMessage}</p>}
            <div className="space-y-3">
              {accounts?.length ? (
                accounts.map((account) => (
                  <div key={account.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-3 text-sm dark:border-slate-700">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{account.platform}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-300">{account.account_handle}</p>
                    </div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${account.active ? 'text-primary-500' : 'text-slate-400'}`}>
                      {account.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No connectors yet. Link your social accounts to begin publishing.</p>
              )}
            </div>
          </div>
        </section>

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
