const { Pool } = require('pg');
require('dotenv').config();

const isLocal = process.env.DATABASE_URL.includes('localhost');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isLocal ? false : { rejectUnauthorized: false }, // Disable SSL for local DB
});

// Test the connection (using async/await for better error handling)
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Database connected successfully:', res.rows[0]);
  } catch (err) {
    console.error('❌ Database Connection Error:', err);
  }
};

// Call the test connection function
testConnection();

module.exports = pool;
