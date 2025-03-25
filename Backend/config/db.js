require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL from Render's environment variables
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // Needed for cloud databases
});

// Test the connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database!"))
  .catch(err => console.error("❌ Database Connection Error:", err));

module.exports = pool;
