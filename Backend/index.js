require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const helmet = require('helmet'); // Added helmet for security headers
const { OAuth2Client } = require('google-auth-library');

// Routes
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet()); // Added security headers

// API Routes
app.use('/api/auth', authRoutes);           // Includes Google Sign-In now
app.use('/api/contacts', contactRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Create database tables (only for development)
const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NULL,
    profile_picture TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );


  CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    beach_id VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    review TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    images TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`;

// Initialize database (only in development environment)
const initializeDatabase = async () => {
  if (process.env.NODE_ENV === 'development') { // Only run in development
    try {
      await pool.query(createTablesQuery);
      console.log('✅ Database tables created successfully');
    } catch (err) {
      console.error('❌ Error creating tables:', err);
      process.exit(1); // Exit if table creation fails
    }
  }
};

// Initialize DB before starting server
initializeDatabase();

// Test route
app.get('/', (req, res) => {
  res.send('🌊 Hello, Beach Backend is running! 🚀');
});

// 404 handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Graceful shutdown for production (optional)
process.on('SIGINT', () => {
  console.log('Server shutting down gracefully...');
  pool.end(() => {
    console.log('Database connection closed');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  // ...
}
