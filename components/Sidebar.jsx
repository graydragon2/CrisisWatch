// src/components/Sidebar.jsx
import { useState } from 'react';

export default function Sidebar({ theme, toggleTheme }) {
  return (
    <aside className={`w-64 min-h-screen bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} text-${theme === 'dark' ? 'white' : 'black'} p-6`}>
      <h2 className="text-xl font-bold mb-6">CrisisWatch</h2>
      <nav className="space-y-4">
        <a href="#" className="block hover:text-purple-400">Dashboard</a>
        <a href="#" className="block hover:text-purple-400">Threat Log</a>
        <a href="#" className="block hover:text-purple-400">Settings</a>
      </nav>
      <div className="mt-10">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
        >
          Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </aside>
  );
}
