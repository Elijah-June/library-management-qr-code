const staff = require('../queries/staff');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAllStaff = async (req, res) => {
  try {
    const data = await staff.getAllStaff();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch staff' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await staff.findByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};