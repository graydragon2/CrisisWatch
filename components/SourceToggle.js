// File: components/SourceToggle.jsx
import { useState } from 'react';

export default function SourceToggle({ mode, setMode }) {
  return (
    <div className="flex items-center space-x-4 p-4">
      <label className="font-semibold">Data Source:</label>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="rss">RSS Only</option>
        <option value="gdelt">GDELT Only</option>
        <option value="hybrid">Hybrid</option>
      </select>
    </div>
  );
}
