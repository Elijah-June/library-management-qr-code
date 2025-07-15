const pool = require('../utils/db');

exports.getAllTransactions = async () => {
  const { rows } = await pool.query('SELECT * FROM transactions ORDER BY id DESC');
  return rows;
};

exports.getOverdue = async () => {
  const { rows } = await pool.query("SELECT * FROM transactions WHERE status = 'borrowed' AND due_date < NOW() ORDER BY due_date ASC");
  return rows;
};