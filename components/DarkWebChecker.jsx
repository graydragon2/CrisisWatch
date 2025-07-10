import { useState } from 'react';

export default function DarkWebChecker() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkDarkWeb = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch(`/api/darkweb?email=${encodeURIComponent(email)}`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded p-6 shadow max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Dark Web Email Check</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="email"
          className="flex-1 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={checkDarkWeb}
          className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Checking...' : 'Scan'}
        </button>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {result && (
        <div className="mt-4 text-sm text-gray-900 dark:text-gray-100">
          <p><strong>Email:</strong> {result.email}</p>
          <p><strong>Leaked:</strong> {result.found ? 'Yes' : 'No'}</p>
          {result.found && (
            <ul className="mt-2 list-disc list-inside">
              {result.sources.map((src, i) => (
                <li key={i}>{src}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
