const express = require('express');
const router = express.Router();
const { login, signup, googleSignIn } = require('../controllers/authController');

// Define routes
router.post('/login', login);
router.post('/signup', signup);
router.post('/google', googleSignIn); // 👈 Add this line for Google Sign-In

module.exports = router;
