const pool = require('../utils/db');

exports.getAllStudents = async () => {
  const { rows } = await pool.query('SELECT * FROM students ORDER BY id DESC');
  return rows;
};