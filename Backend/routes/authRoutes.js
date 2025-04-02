const express = require('express');
 const router = express.Router();
 const { login, signup } = require('../controllers/authController');
 
 // Define routes with the imported controller functions
 router.post('/login', login);
 router.post('/signup', signup);
 
 module.exports = router;