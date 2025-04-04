require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const pool = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use auth routes
app.use('/api/auth', authRoutes);
// Use contact routes
app.use('/api/contacts', contactRoutes);

// Create database tables
const createTablesQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

`;

// Initialize database
const initializeDatabase = async () => {
  try {
    await pool.query(createTablesQuery);
    console.log('Database tables created successfully');
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1); // Exit if table creation fails
  }
};

// Initialize database before starting server
initializeDatabase();

// Routes

// Test route
app.get('/', (req, res) => {
  res.send('Hello, Beach Backend is running! 🌊');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
