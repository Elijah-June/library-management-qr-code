const express = require('express');
const router = express.Router();
const books = require('../controllers/books');

router.get('/', books.getAllBooks);
router.post('/', books.addBook);

module.exports = router;