import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStaff() {
      try {
        setLoading(true);
        const data = await apiFetch('/staff');
        setStaff(data);
      } catch (err) {
        setError('Failed to load staff');
      } finally {
        setLoading(false);
      }
    }
    fetchStaff();
  }, []);

  if (loading) return <div>Loading staff...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Staff Management</h1>
      <ul className="bg-white rounded shadow p-2">
        {staff.length === 0 ? (
          <li className="text-gray-500">No staff to display.</li>
        ) : (
          staff.map(member => (
            <li key={member.id} className="border-b py-2">
              {member.name} ({member.email})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Staff;