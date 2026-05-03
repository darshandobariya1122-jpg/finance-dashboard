import { SpeedInsights } from '@vercel/speed-insights/react';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function normalizePath(pathname) {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function App() {
  const path = normalizePath(window.location.pathname);

  if (path === '/dashboard') {
    return (
      <>
        <Dashboard />
        <SpeedInsights />
      </>
    );
  }

  if (path === '/') {
    return (
      <>
        <Dashboard />
        <SpeedInsights />
      </>
    );
  }

  return (
    <>
      <NotFound />
      <SpeedInsights />
    </>
  );
}

export default App;
