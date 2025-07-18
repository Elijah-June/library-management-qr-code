const students = require('../queries/students');

exports.getAllStudents = async (req, res) => {
  try {
    const data = await students.getAllStudents();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};