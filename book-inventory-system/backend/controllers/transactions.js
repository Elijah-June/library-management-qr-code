const transactions = require('../queries/transactions');
const pool = require('../utils/db');
const { sendMail } = require('../utils/email');

exports.getAllTransactions = async (req, res) => {
  try {
    const data = await transactions.getAllTransactions();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

exports.getOverdue = async (req, res) => {
  try {
    const data = await transactions.getOverdue();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch overdue items' });
  }
};

// Borrow a book and notify student
exports.borrowBook = async (req, res) => {
  const { book_id, student_id, due_date } = req.body;
  try {
    // Insert transaction
    const { rows } = await pool.query(
      `INSERT INTO transactions (book_id, student_id, due_date, status) VALUES ($1, $2, $3, 'borrowed') RETURNING *`,
      [book_id, student_id, due_date]
    );
    // Update book status
    await pool.query(`UPDATE books SET status = 'borrowed' WHERE id = $1`, [book_id]);
    // Get student and book info
    const student = (await pool.query('SELECT * FROM students WHERE id = $1', [student_id])).rows[0];
    const book = (await pool.query('SELECT * FROM books WHERE id = $1', [book_id])).rows[0];
    // Send email
    if (student?.email) {
      await sendMail({
        to: student.email,
        subject: `Book Borrowed: ${book.title}`,
        text: `Dear ${student.name},\n\nYou have borrowed the book "${book.title}". It is due on ${due_date}.\n\nPlease return it on time.`,
      });
    }
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to borrow book', details: err.message });
  }
};

// Return a book and notify student
exports.returnBook = async (req, res) => {
  const { transaction_id } = req.body;
  try {
    // Update transaction
    const { rows } = await pool.query(
      `UPDATE transactions SET return_date = NOW(), status = 'returned' WHERE id = $1 RETURNING *`,
      [transaction_id]
    );
    const tx = rows[0];
    if (!tx) return res.status(404).json({ error: 'Transaction not found' });
    // Update book status
    await pool.query(`UPDATE books SET status = 'available' WHERE id = $1`, [tx.book_id]);
    // Get student and book info
    const student = (await pool.query('SELECT * FROM students WHERE id = $1', [tx.student_id])).rows[0];
    const book = (await pool.query('SELECT * FROM books WHERE id = $1', [tx.book_id])).rows[0];
    // Send email
    if (student?.email) {
      await sendMail({
        to: student.email,
        subject: `Book Returned: ${book.title}`,
        text: `Dear ${student.name},\n\nThank you for returning the book "${book.title}".\n\nWe appreciate your cooperation.`,
      });
    }
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: 'Failed to return book', details: err.message });
  }
};

// Send overdue email notifications to students
exports.sendOverdueEmails = async (req, res) => {
  try {
    // Get all overdue transactions with student info
    const { rows } = await pool.query(`
      SELECT t.id, t.due_date, s.email, s.name, b.title
      FROM transactions t
      JOIN students s ON t.student_id = s.id
      JOIN books b ON t.book_id = b.id
      WHERE t.status = 'borrowed' AND t.due_date < NOW()
    `);
    let sent = 0;
    for (const row of rows) {
      if (!row.email) continue;
      await sendMail({
        to: row.email,
        subject: `Overdue Book: ${row.title}`,
        text: `Dear ${row.name},\n\nYour borrowed book "${row.title}" was due on ${row.due_date.toISOString().slice(0,10)}. Please return it as soon as possible.`,
      });
      sent++;
    }
    res.json({ sent, total: rows.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send overdue emails', details: err.message });
  }
};

// Analytics for borrowed/returned books
exports.analytics = async (req, res) => {
  const { range } = req.query;
  let interval = 'day';
  if (['day', 'week', 'month', 'year'].includes(range)) interval = range;
  let borrowedQuery = '', returnedQuery = '';
  if (interval === 'day') {
    borrowedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'borrowed' AND borrow_date::date = CURRENT_DATE`;
    returnedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'returned' AND return_date::date = CURRENT_DATE`;
  } else if (interval === 'week') {
    borrowedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'borrowed' AND borrow_date >= date_trunc('week', CURRENT_DATE)`;
    returnedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'returned' AND return_date >= date_trunc('week', CURRENT_DATE)`;
  } else if (interval === 'month') {
    borrowedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'borrowed' AND borrow_date >= date_trunc('month', CURRENT_DATE)`;
    returnedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'returned' AND return_date >= date_trunc('month', CURRENT_DATE)`;
  } else if (interval === 'year') {
    borrowedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'borrowed' AND borrow_date >= date_trunc('year', CURRENT_DATE)`;
    returnedQuery = `SELECT COUNT(*) FROM transactions WHERE status = 'returned' AND return_date >= date_trunc('year', CURRENT_DATE)`;
  }
  try {
    const borrowed = Number((await pool.query(borrowedQuery)).rows[0].count);
    const returned = Number((await pool.query(returnedQuery)).rows[0].count);
    res.json({ borrowed, returned });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch analytics', details: err.message });
  }
};