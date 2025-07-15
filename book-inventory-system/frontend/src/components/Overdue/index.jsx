import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

const Overdue = () => {
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOverdue() {
      try {
        setLoading(true);
        const data = await apiFetch('/overdue');
        setOverdue(data);
      } catch (err) {
        setError('Failed to load overdue items');
      } finally {
        setLoading(false);
      }
    }
    fetchOverdue();
  }, []);

  if (loading) return <div>Loading overdue items...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Overdue Books & Students</h1>
      <ul className="bg-white rounded shadow p-2">
        {overdue.length === 0 ? (
          <li className="text-gray-500">No overdue books or students.</li>
        ) : (
          overdue.map((item, i) => (
            <li key={i} className="border-b py-2">
              Book #{item.book_id} - Student #{item.student_id} - Due: {item.due_date}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Overdue;