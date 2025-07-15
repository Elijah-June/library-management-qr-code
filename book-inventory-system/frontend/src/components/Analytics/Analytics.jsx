import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

const ranges = [
  { label: 'Day', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];

const Analytics = () => {
  const [range, setRange] = useState('day');
  const [stats, setStats] = useState({ borrowed: 0, returned: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async (selectedRange) => {
    try {
      setLoading(true);
      const data = await apiFetch(`/transactions/analytics?range=${selectedRange}`);
      setStats(data);
    } catch (err) {
      setError('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(range);
  }, [range]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Data Analytics</h1>
      <div className="mb-4 flex gap-2">
        {ranges.map(r => (
          <button
            key={r.value}
            onClick={() => setRange(r.value)}
            className={`px-4 py-2 rounded ${range === r.value ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            {r.label}
          </button>
        ))}
      </div>
      {loading ? (
        <div>Loading analytics...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded text-center">
            <div className="text-2xl font-bold">{stats.borrowed}</div>
            <div>Books Borrowed ({range})</div>
          </div>
          <div className="bg-green-100 p-4 rounded text-center">
            <div className="text-2xl font-bold">{stats.returned}</div>
            <div>Books Returned ({range})</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;