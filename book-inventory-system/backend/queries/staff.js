const pool = require('../utils/db');

exports.getAllStaff = async () => {
  const { rows } = await pool.query('SELECT * FROM staff ORDER BY id DESC');
  return rows;
};

exports.findByEmail = async (email) => {
  const { rows } = await pool.query('SELECT * FROM staff WHERE email = $1', [email]);
  return rows[0];
};