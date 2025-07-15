const express = require('express');
const router = express.Router();
const staff = require('../controllers/staff');

router.get('/', staff.getAllStaff);
router.post('/login', staff.login);

module.exports = router;