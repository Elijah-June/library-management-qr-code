import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        setLoading(true);
        const data = await apiFetch('/students');
        setStudents(data);
      } catch (err) {
        setError('Failed to load students');
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  if (loading) return <div>Loading students...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Student Management</h1>
      <ul className="bg-white rounded shadow p-2">
        {students.length === 0 ? (
          <li className="text-gray-500">No students to display.</li>
        ) : (
          students.map(student => (
            <li key={student.id} className="border-b py-2">
              {student.name} ({student.email})
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Students;