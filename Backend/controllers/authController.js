const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // 🔒 Move to .env in production
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID; // ✅ Set this in your .env
const client = new OAuth2Client(CLIENT_ID);

console.log('Environment variables loaded:', {
  hasClientId: !!process.env.GOOGLE_CLIENT_ID,
  clientIdLength: process.env.GOOGLE_CLIENT_ID?.length,
  nodeEnv: process.env.NODE_ENV
});

if (!CLIENT_ID) {
  console.error('GOOGLE_CLIENT_ID is not set in environment variables');
}

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
  console.log('Received Google sign-in request');
  
  const { credential } = req.body;
  console.log('Request body:', {
    hasCredential: !!credential,
    credentialLength: credential?.length
  });

  if (!credential) {
    console.log('No credential provided in request');
    return res.status(400).json({ message: 'No credential provided' });
  }

  if (!CLIENT_ID) {
    console.error('GOOGLE_CLIENT_ID is not set in environment variables');
    return res.status(500).json({ 
      message: 'Server configuration error: Google Client ID not set',
      details: 'Please check your .env file'
    });
  }

  try {
    console.log('Attempting to verify token with client ID:', CLIENT_ID);
    
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: CLIENT_ID,
    });

    console.log('Token verification successful');
    const payload = ticket.getPayload();
    console.log('Token payload:', {
      email: payload.email,
      name: payload.name
    });

    // Extract payload from ticket
    const { email, name} = payload;

    // Check if user already exists in the database
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    let user;

    if (existingUser.rows.length === 0) {
      // If user doesn't exist, create a new user without password
      const newUser = await pool.query(
        'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id, username, email',
        [name, email]
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
        email: user.email
      },
    });
  } catch (error) {
    console.error('Google Sign-In error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    // More specific error messages
    if (error.message.includes('Token used too late')) {
      return res.status(400).json({ message: 'Token expired. Please try again.' });
    }
    
    if (error.message.includes('Invalid token signature')) {
      return res.status(400).json({ 
        message: 'Invalid token. Please try again.',
        details: 'Token signature verification failed'
      });
    }

    if (error.message.includes('Invalid audience')) {
      return res.status(400).json({ 
        message: 'Invalid client ID configuration',
        details: 'The Google Client ID does not match'
      });
    }

    res.status(500).json({ 
      message: 'Failed to verify Google token',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
