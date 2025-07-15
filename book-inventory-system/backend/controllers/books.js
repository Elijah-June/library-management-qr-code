const books = require('../queries/books');

exports.getAllBooks = async (req, res) => {
  try {
    const data = await books.getAllBooks();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.addBook = async (req, res) => {
  try {
    const book = await books.addBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};