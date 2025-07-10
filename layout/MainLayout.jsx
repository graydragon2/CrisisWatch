// layout/MainLayout.jsx
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function MainLayout({ children }) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);

  const handleDashboardClick = () => router.push('/');
  const handleSettingsClick = () => router.push('/settings');
  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };
  const toggleDarkMode = () => setDarkMode(prev => !prev);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <nav className="flex justify-between items-center px-4 py-2 bg-gray-800 dark:bg-gray-900 shadow">
        <div className="text-xl font-bold">CrisisWatch</div>
        <div className="space-x-4">
          <button onClick={handleDashboardClick} className="hover:underline">Dashboard</button>
          <button onClick={handleSettingsClick} className="hover:underline">Settings</button>
          <button onClick={handleLogout} className="hover:underline">Logout</button>
          <button
            onClick={toggleDarkMode}
            className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-500"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>

      <main className="p-4">
        {children}
      </main>
    </div>
  );
}

