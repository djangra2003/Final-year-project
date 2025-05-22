const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // 🔒 Move to .env in production
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // ✅ Set this in your .env
const client = new OAuth2Client(CLIENT_ID);

// ------------------ Normal Login ------------------
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const userResult = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------ Normal Signup ------------------
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: 'Username or email already exists',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashedPassword]
    );

    const token = jwt.sign(
      { userId: newUser.rows[0].id, username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ------------------ Google Sign-In ------------------
exports.googleSignIn = async (req, res) => {
  const { credential } = req.body;

  try {
    // Log the received credential for debugging
    console.log('Credential received:', credential);

    // Verify Google ID Token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID, // Ensure this matches the Google client ID
    });

    // Extract payload from ticket
    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check if user already exists in the database
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    let user;

    if (existingUser.rows.length === 0) {
      // If user doesn't exist, create a new user without password
      const newUser = await pool.query(
        'INSERT INTO users (username, email, profile_picture) VALUES ($1, $2, $3) RETURNING id, username, email, profile_picture',
        [name, email, picture]
      );
      user = newUser.rows[0];
    } else {
      user = existingUser.rows[0];
    }

    // Generate JWT for the logged-in user
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Google Sign-In successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profile_picture: user.profile_picture,
      },
    });
  } catch (error) {
    console.error('Google Sign-In error:', error);
    
    // Return a more specific error message for debugging
    res.status(500).json({ message: 'Failed to verify Google token' });
  }
};
