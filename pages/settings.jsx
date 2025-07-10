// pages/settings.jsx
import { useState, useEffect } from 'react';

const defaultFeeds = [
  { name: 'CNN', url: 'https://rss.cnn.com/rss/cnn_topstories.rss' },
  { name: 'Reuters', url: 'http://feeds.reuters.com/reuters/topNews' },
  { name: 'BBC', url: 'http://feeds.bbci.co.uk/news/rss.xml' },
];

export default function SettingsPage() {
  const [feeds, setFeeds] = useState([]);
  const [newFeed, setNewFeed] = useState('');

  // Load saved feeds from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('rssFeeds')) || defaultFeeds;
    setFeeds(saved);
  }, []);

  const saveFeeds = (updatedFeeds) => {
    setFeeds(updatedFeeds);
    localStorage.setItem('rssFeeds', JSON.stringify(updatedFeeds));
  };

  const handleAddFeed = () => {
    if (!newFeed.trim()) return;
    const name = newFeed.split('/')[2] || `Feed ${feeds.length + 1}`;
    const updated = [...feeds, { name, url: newFeed }];
    saveFeeds(updated);
    setNewFeed('');
  };

  const handleRemoveFeed = (index) => {
    const updated = feeds.filter((_, i) => i !== index);
    saveFeeds(updated);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RSS Feed Preferences</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newFeed}
          onChange={(e) => setNewFeed(e.target.value)}
          placeholder="Enter new RSS feed URL"
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={handleAddFeed}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Add Feed
        </button>
      </div>

      <ul className="space-y-2">
        {feeds.map((feed, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded"
          >
            <div>
              <p className="font-semibold">{feed.name}</p>
              <p className="text-sm">{feed.url}</p>
            </div>
            <button
              onClick={() => handleRemoveFeed(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
