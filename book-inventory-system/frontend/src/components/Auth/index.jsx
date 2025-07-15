import React, { useState } from 'react';
import { apiFetch } from '../../utils/api';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      window.location.href = '/';
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Staff Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="border p-2 rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="border p-2 rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Auth;