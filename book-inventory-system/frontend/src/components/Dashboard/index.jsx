import React from 'react';

const Dashboard = () => {
  // Placeholder stats
  const stats = {
    totalBooks: 0,
    borrowedBooks: 0,
    overdueStudents: 0,
    recentTransactions: [],
  };

  return (
    <div className="p-4 grid gap-4">
      <h1 className="text-2xl font-bold mb-4">Library Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 p-4 rounded">Total Books: {stats.totalBooks}</div>
        <div className="bg-yellow-100 p-4 rounded">Borrowed: {stats.borrowedBooks}</div>
        <div className="bg-red-100 p-4 rounded">Overdue Students: {stats.overdueStudents}</div>
        <div className="bg-green-100 p-4 rounded">Recent Transactions: {stats.recentTransactions.length}</div>
      </div>
      {/* Recent transactions list placeholder */}
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