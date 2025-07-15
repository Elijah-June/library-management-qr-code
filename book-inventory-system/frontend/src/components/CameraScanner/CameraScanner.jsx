import React, { useState } from 'react';
import { apiFetch } from '../../utils/api';
import Modal from '../Modal';

const CameraScanner = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [message, setMessage] = useState('');

  const handleScan = () => setModalOpen(true);

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalOpen(false);
    setScanResult(scanInput);
    try {
      const res = await apiFetch('/scanner', {
        method: 'POST',
        body: JSON.stringify({ code: scanInput }),
      });
      setMessage('Scan successful: ' + JSON.stringify(res));
    } catch (err) {
      setMessage('Scan failed: ' + err.message);
    }
    setScanInput('');
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-2">Scan Barcode/QR Code</h2>
      <button onClick={handleScan} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">Simulate Scan</button>
      {scanResult && <div className="mb-2">Scanned: {scanResult}</div>}
      {message && <div className="text-green-600">{message}</div>}
      <Modal isOpen={modalOpen} title="Enter Barcode/QR/ID" onClose={() => setModalOpen(false)}>
        <form onSubmit={handleModalSubmit} className="flex flex-col gap-2">
          <input
            value={scanInput}
            onChange={e => setScanInput(e.target.value)}
            className="border p-2 rounded"
            placeholder="Barcode/QR/ID"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default CameraScanner;