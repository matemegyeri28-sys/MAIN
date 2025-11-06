import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { AuthGuard } from './components/AuthGuard';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import AuditLogs from './routes/AuditLogs';
import Settings from './routes/Settings';
import { useAuth } from './hooks/useAuth';

const APP_NAME = typeof __APP_NAME__ !== 'undefined' ? __APP_NAME__ : 'Lovable Broadcast Admin';
const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const AppLayout: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 flex-col border-r border-slate-200 bg-white/80 px-4 py-6 shadow-sm backdrop-blur lg:flex">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">{APP_NAME}</span>
        </div>
        <nav className="mt-8 space-y-2 text-sm font-medium text-slate-600">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 transition ${
                isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/audit-logs"
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 transition ${
                isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            Audit Logs
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block rounded-lg px-3 py-2 transition ${
                isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            Settings
          </NavLink>
        </nav>
        <div className="mt-auto rounded-lg bg-slate-50 px-3 py-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-700">Signed in</p>
          <p>{user?.email}</p>
          <button
            className="mt-3 inline-flex items-center rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100"
            onClick={() => logout()}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1">
        {!BACKEND_URL ? (
          <div className="bg-red-50 px-6 py-3 text-sm font-medium text-red-700">
            Fatal configuration error: VITE_BACKEND_BASE_URL is missing.
          </div>
        ) : null}
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

const NotFound: React.FC = () => (
  <div className="flex h-full items-center justify-center">
    <div className="rounded-xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">404</p>
      <h1 className="mt-2 text-2xl font-semibold text-slate-900">Page not found</h1>
      <p className="mt-2 text-sm text-slate-600">The page you are looking for could not be found.</p>
    </div>
  </div>
);

const App: React.FC = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<AuthGuard />}>
      <Route path="/*" element={<AppLayout />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
