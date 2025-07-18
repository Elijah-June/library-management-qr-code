const express = require('express');
const router = express.Router();
const transactions = require('../controllers/transactions');

router.get('/', transactions.getAllTransactions);
router.get('/overdue', transactions.getOverdue);
router.post('/send-overdue-emails', transactions.sendOverdueEmails);
router.post('/borrow', transactions.borrowBook);
router.post('/return', transactions.returnBook);
router.get('/analytics', transactions.analytics);

module.exports = router;