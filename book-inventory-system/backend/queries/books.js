const pool = require('../utils/db');

exports.getAllBooks = async () => {
  const { rows } = await pool.query('SELECT * FROM books ORDER BY id DESC');
  return rows;
};

exports.addBook = async ({ title, author }) => {
  const { rows } = await pool.query(
    'INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *',
    [title, author]
  );
  return rows[0];
};