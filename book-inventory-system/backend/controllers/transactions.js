const transactions = require('../queries/transactions');

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