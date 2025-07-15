import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';
import Modal from '../Modal/Modal.jsx';

const Returns = () => {
  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [returningTx, setReturningTx] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchBorrowed = async () => {
    try {
      setLoading(true);
      const data = await apiFetch('/transactions');
      setBorrowed(data.filter(tx => tx.status === 'borrowed'));
    } catch (err) {
      setError('Failed to load borrowed books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBorrowed();
  }, []);

  const handleReturnClick = (tx) => {
    setReturningTx(tx);
    setShowModal(true);
  };

  const handleReturn = async () => {
    try {
      await apiFetch('/transactions/return', {
        method: 'POST',
        body: JSON.stringify({ transaction_id: returningTx.id }),
      });
      setSuccessMsg('Book returned successfully!');
      setShowModal(false);
      setReturningTx(null);
      fetchBorrowed();
    } catch (err) {
      setError('Failed to return book');
    }
  };

  if (loading) return <div>Loading borrowed books...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Process Book Returns</h1>
      {successMsg && <div className="mb-4 text-green-700">{successMsg}</div>}
      <ul className="bg-white rounded shadow p-2">
        {borrowed.length === 0 ? (
          <li className="text-gray-500">No borrowed books to return.</li>
        ) : (
          borrowed.map(tx => (
            <li key={tx.id} className="flex justify-between items-center border-b py-2">
              <span>Book #{tx.book_id} - Student #{tx.student_id} - Borrowed: {tx.borrow_date} - Due: {tx.due_date}</span>
              <button onClick={() => handleReturnClick(tx)} className="bg-green-600 text-white px-3 py-1 rounded">Return</button>
            </li>
          ))
        )}
      </ul>
      <Modal isOpen={showModal} title="Confirm Return" onClose={() => setShowModal(false)}>
        <div>Mark this book as returned?</div>
        <div className="flex gap-2 mt-4">
          <button onClick={handleReturn} className="bg-green-600 text-white px-4 py-2 rounded">Yes, Return</button>
          <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Returns;