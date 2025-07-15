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