const express = require('express');
const router = express.Router();
const transactions = require('../controllers/transactions');

router.get('/', transactions.getAllTransactions);
router.get('/overdue', transactions.getOverdue);

module.exports = router;