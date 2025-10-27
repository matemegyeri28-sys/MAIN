import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { login, registerUser } from '../lib/api';
import { persistAuth } from '../lib/auth';

type AuthMode = 'signin' | 'signup';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('founder@lumina.ai');
  const [password, setPassword] = useState('demo1234');
  const [fullName, setFullName] = useState('');
  const [company, setCompany] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleMode = () => {
    setMode((current) => (current === 'signin' ? 'signup' : 'signin'));
    setError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        await registerUser({ email, full_name: fullName || 'New Marketer', password, company });
      }

      const tokenResponse = await login(email, password);
      persistAuth(tokenResponse.access_token, tokenResponse.user);
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Authentication failed. Please verify your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout title="Access Lumina Automate">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-8 rounded-3xl border border-slate-200 bg-white/80 p-10 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-500">{mode === 'signin' ? 'Welcome back' : 'Create account'}</p>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {mode === 'signin' ? 'Sign in to orchestrate your campaigns' : 'Start automating your marketing'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-300">
            Use the seeded demo credentials or register a new workspace for your team.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Avery Stone"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          )}

          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                Company
              </label>
              <input
                id="company"
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Lumina Labs"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              />
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={8}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isLoading ? 'Processing…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>
        </form>

        <div className="text-center text-sm text-slate-500 dark:text-slate-300">
          {mode === 'signin' ? (
            <button onClick={toggleMode} className="font-semibold text-primary-500 hover:text-primary-600">
              Need an account? Sign up instead.
            </button>
          ) : (
            <button onClick={toggleMode} className="font-semibold text-primary-500 hover:text-primary-600">
              Already onboard? Sign in to continue.
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
}
