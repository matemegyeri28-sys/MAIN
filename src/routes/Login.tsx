import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', audience: '', issuer: '' });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: Location } };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    try {
      await login({
        email: form.email,
        password: form.password,
        audience: form.audience || undefined,
        issuer: form.issuer || undefined
      });
      navigate((location.state?.from as Location)?.pathname ?? '/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      setError('Unable to sign in. Please verify your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary-500">Lovable Admin</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Sign in</h1>
          <p className="mt-1 text-sm text-slate-600">
            Authenticate with your Lovable Cloud credentials to access the broadcast controls.
          </p>
        </div>
        <form className="mt-6 space-y-4" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              value={form.email}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
              value={form.password}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="audience" className="block text-sm font-medium text-slate-700">
                Audience (optional)
              </label>
              <input
                id="audience"
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={form.audience}
                onChange={(event) => setForm((prev) => ({ ...prev, audience: event.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="issuer" className="block text-sm font-medium text-slate-700">
                Issuer (optional)
              </label>
              <input
                id="issuer"
                type="text"
                className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200"
                value={form.issuer}
                onChange={(event) => setForm((prev) => ({ ...prev, issuer: event.target.value }))}
              />
            </div>
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
