// src/layout/MainLayout.jsx
export default function MainLayout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen">
      {children}
    </div>
  );
}
import { useRouter } from 'next/router';

export default function MainLayout({ children }) {
  const router = useRouter();

  const handleDashboardClick = () => router.push('/');
  const handleSettingsClick = () => router.push('/settings');
  const handleLogout = () => {
    // If using localStorage/session auth
    localStorage.clear(); 
    router.push('/');
  };

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <nav className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <div className="text-xl font-bold">CrisisWatch</div>
        <div className="space-x-4">
          <button onClick={handleDashboardClick}>Dashboard</button>
          <button onClick={handleSettingsClick}>Settings</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>
      <div>{children}</div>
    </div>
  );
}
