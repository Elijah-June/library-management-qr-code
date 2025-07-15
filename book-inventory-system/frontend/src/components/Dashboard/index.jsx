import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    borrowedBooks: 0,
    overdueStudents: 0,
    recentTransactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const data = await apiFetch('/dashboard');
        setStats(data);
      } catch (err) {
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold mb-4">Library Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded">Total Books: {stats.totalBooks}</div>
        <div className="bg-yellow-100 p-4 rounded">Borrowed: {stats.borrowedBooks}</div>
        <div className="bg-red-100 p-4 rounded">Overdue Students: {stats.overdueStudents}</div>
        <div className="bg-green-100 p-4 rounded">Recent Transactions: {stats.recentTransactions.length}</div>
      </div>
      <div className="mt-6">
        <h2 className="font-semibold mb-2">Recent Transactions</h2>
        <ul className="bg-white rounded shadow p-2">
          {stats.recentTransactions.length === 0 ? (
            <li className="text-gray-500">No recent transactions.</li>
          ) : (
            stats.recentTransactions.map((tx, i) => (
              <li key={i}>{tx}</li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;