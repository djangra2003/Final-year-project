const express = require('express');
const router = express.Router();
const { handleContactForm } = require('../controllers/contactController');

router.post('/submit', handleContactForm);

module.exports = router; 