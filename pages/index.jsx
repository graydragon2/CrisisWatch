// pages/index.jsx
import MainLayout from '../layout/MainLayout';

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold">CrisisWatch Dashboard</h1>

        {/* Section: Live Alerts */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Live Threat Alerts</h2>
          <ul className="list-disc list-inside text-sm">
            <li>🔥 Wildfire detected in Okefenokee region.</li>
            <li>⚠️ Possible phishing attack targeting state officials.</li>
            <li>🛰️ GPS jamming reported near Kings Bay Naval Base.</li>
          </ul>
        </section>

        {/* Section: System Status */}
        <section className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">System Status</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>Status: ✅ Online</div>
            <div>Threat Feeds: 🟢 Active</div>
            <div>Radio Monitor: 🟡 Standby</div>
            <div>Dark Web Scan: 🔴 Offline</div>
          </div>
        </section>

        {/* Future buttons or charts */}
        <section className="mt-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">
            Refresh Threat Feed
          </button>
        </section>
      </div>
    </MainLayout>
  );
}
