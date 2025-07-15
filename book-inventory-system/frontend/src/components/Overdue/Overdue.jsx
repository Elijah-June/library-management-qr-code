import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api';
import Modal from '../Modal/Modal.jsx';

const Overdue = () => {
  const [overdue, setOverdue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState(null);

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

  const handleSendEmails = async () => {
    setSending(true);
    setSendResult(null);
    try {
      const res = await apiFetch('/transactions/send-overdue-emails', { method: 'POST' });
      setSendResult(`Sent ${res.sent} of ${res.total} overdue emails.`);
    } catch (err) {
      setSendResult('Failed to send emails: ' + err.message);
    } finally {
      setSending(false);
      setShowModal(false);
    }
  };

  if (loading) return <div>Loading overdue items...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Overdue Books & Students</h1>
      <button onClick={() => setShowModal(true)} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">Send Overdue Emails</button>
      {sendResult && <div className="mb-4 text-green-700">{sendResult}</div>}
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
      <Modal isOpen={showModal} title="Send Overdue Emails" onClose={() => setShowModal(false)}>
        <div>Are you sure you want to send overdue email notifications to all students with overdue books?</div>
        <div className="flex gap-2 mt-4">
          <button onClick={handleSendEmails} className="bg-blue-600 text-white px-4 py-2 rounded" disabled={sending}>{sending ? 'Sending...' : 'Yes, Send Emails'}</button>
          <button onClick={() => setShowModal(false)} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default Overdue;