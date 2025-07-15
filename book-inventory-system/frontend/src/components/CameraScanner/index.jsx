import React, { useState } from 'react';
// import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { apiFetch } from '../../utils/api';

const CameraScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [message, setMessage] = useState('');

  // Placeholder for actual scanner
  const handleScan = async () => {
    // Simulate a scan result
    const result = prompt('Simulate scan: Enter barcode/QR/ID');
    if (result) {
      setScanResult(result);
      try {
        const res = await apiFetch('/scanner', {
          method: 'POST',
          body: JSON.stringify({ code: result }),
        });
        setMessage('Scan successful: ' + JSON.stringify(res));
      } catch (err) {
        setMessage('Scan failed: ' + err.message);
      }
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="font-semibold mb-2">Scan Barcode/QR Code</h2>
      {/* Replace with BarcodeScannerComponent for real camera */}
      <button onClick={handleScan} className="bg-blue-600 text-white px-4 py-2 rounded mb-2">Simulate Scan</button>
      {scanResult && <div className="mb-2">Scanned: {scanResult}</div>}
      {message && <div className="text-green-600">{message}</div>}
    </div>
  );
};

export default CameraScanner;