import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainLayout from '../layout/MainLayout';

export default function Dashboard() {
  const [threats, setThreats] = useState([]);
  const [risk, setRisk] = useState('Unknown');
  const [email, setEmail] = useState('');
  const [darkwebStatus, setDarkwebStatus] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    async function fetchThreats() {
      try {
        const res = await fetch('/api/threats');
        const data = await res.json();
        setThreats(data.threats || []);

        const scoreRes = await fetch('/api/risk-score', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ threats: data.threats })
        });
        const scoreData = await scoreRes.json();
        setRisk(scoreData.risk);
      } catch (err) {
        console.error('Error loading threats:', err);
      }
    }
    fetchThreats();
  }, []);

  const handleDarkwebScan = async () => {
    try {
      const res = await fetch('/api/darkweb-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const result = await res.json();
      setDarkwebStatus(result.message);
    } catch (err) {
      setDarkwebStatus('Scan failed');
    }
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <MainLayout>
      <div className="flex">
        <Sidebar theme={theme} toggleTheme={toggleTheme} />
        <main className={`flex-1 p-6 text-${theme === 'dark' ? 'white' : 'black'} space-y-6 bg-${theme === 'dark' ? 'gray-900' : 'gray-100'}`}>
          <Header />
          <h1 className="text-3xl font-bold">CrisisWatch Dashboard</h1>

          </main>
      </div>
    </MainLayout>
  );
}
