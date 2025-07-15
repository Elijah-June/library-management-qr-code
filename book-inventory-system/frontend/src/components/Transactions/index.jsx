import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/transactions');
      setTransactions(data);
    } catch (err) {
      setError('Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) return <div>Loading transactions...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Borrow/Return Transactions</h1>
      <ul className="bg-white rounded shadow p-2">
        {transactions.length === 0 ? (
          <li className="text-gray-500">No transactions yet.</li>
        ) : (
          transactions.map(tx => (
            <li key={tx.id} className="border-b py-2">
              Book #{tx.book_id} - Student #{tx.student_id} - {tx.status} on {tx.borrow_date}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Transactions;