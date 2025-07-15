import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BookManagement from './components/BookManagement';
import CameraScanner from './components/CameraScanner';
import Alerts from './components/Alerts';
import Auth from './components/Auth';
import Overdue from './components/Overdue';
import Transactions from './components/Transactions';
import Students from './components/Students';
import Staff from './components/Staff';
import './App.css';

function App() {
  // TODO: Replace with real auth state
  const isAuthenticated = true;

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-blue-700 text-white p-4 flex gap-4">
          <Link to="/">Dashboard</Link>
          <Link to="/books">Books</Link>
          <Link to="/scanner">Scan</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/overdue">Overdue</Link>
          <Link to="/students">Students</Link>
          <Link to="/staff">Staff</Link>
          <Link to="/login">Login</Link>
        </nav>
        <div className="max-w-4xl mx-auto p-4">
          <Alerts />
          <Routes>
            <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/books" element={isAuthenticated ? <BookManagement /> : <Navigate to="/login" />} />
            <Route path="/scanner" element={isAuthenticated ? <CameraScanner /> : <Navigate to="/login" />} />
            <Route path="/transactions" element={isAuthenticated ? <Transactions /> : <Navigate to="/login" />} />
            <Route path="/overdue" element={isAuthenticated ? <Overdue /> : <Navigate to="/login" />} />
            <Route path="/students" element={isAuthenticated ? <Students /> : <Navigate to="/login" />} />
            <Route path="/staff" element={isAuthenticated ? <Staff /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
