const express = require('express');
const router = express.Router();
const transactions = require('../controllers/transactions');

router.get('/', transactions.getAllTransactions);
router.get('/overdue', transactions.getOverdue);
router.post('/send-overdue-emails', transactions.sendOverdueEmails);
router.post('/borrow', transactions.borrowBook);

module.exports = router;