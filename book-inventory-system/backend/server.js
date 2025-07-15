require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const booksRoutes = require('./routes/books');
const studentsRoutes = require('./routes/students');
const staffRoutes = require('./routes/staff');
const transactionsRoutes = require('./routes/transactions');
const pool = require('./utils/db');

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/books', booksRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/transactions', transactionsRoutes);

// Dashboard stats
app.get('/api/dashboard', async (req, res) => {
  try {
    const totalBooks = (await pool.query('SELECT COUNT(*) FROM books')).rows[0].count;
    const borrowedBooks = (await pool.query("SELECT COUNT(*) FROM books WHERE status = 'borrowed' ")).rows[0].count;
    const overdueStudents = (await pool.query("SELECT COUNT(DISTINCT student_id) FROM transactions WHERE status = 'borrowed' AND due_date < NOW() ")).rows[0].count;
    const recentTransactions = (await pool.query('SELECT * FROM transactions ORDER BY borrow_date DESC LIMIT 5')).rows;
    res.json({
      totalBooks: Number(totalBooks),
      borrowedBooks: Number(borrowedBooks),
      overdueStudents: Number(overdueStudents),
      recentTransactions,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load dashboard stats' });
  }
});

// Overdue shortcut
app.get('/api/overdue', async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM transactions WHERE status = 'borrowed' AND due_date < NOW() ORDER BY due_date ASC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch overdue items' });
  }
});

// Scanner endpoint (register/borrow/return placeholder)
app.post('/api/scanner', async (req, res) => {
  // You can implement logic to register, borrow, or return books here
  res.json({ message: 'Scan received', code: req.body.code });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});