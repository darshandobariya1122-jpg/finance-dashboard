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
    return <Dashboard />;
  }

  if (path === '/') {
    return <Dashboard />;
  }

  return <NotFound />;
}

export default App;
