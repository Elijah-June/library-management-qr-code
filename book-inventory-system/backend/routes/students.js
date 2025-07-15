const express = require('express');
const router = express.Router();
const students = require('../controllers/students');

router.get('/', students.getAllStudents);

module.exports = router;