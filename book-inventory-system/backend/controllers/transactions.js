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