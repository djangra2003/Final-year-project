const pool = require('../config/db'); // or wherever your PostgreSQL config is

// Create table if not exists (run once)
const createChatTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS chats (
      id SERIAL PRIMARY KEY,
      user_message TEXT NOT NULL,
      bot_response TEXT NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await pool.query(query);
    console.log('✅ Chat table ensured');
  } catch (err) {
    console.error('❌ Error creating Chat table:', err);
  }
};

createChatTable();

const saveChat = async (userMessage, botResponse) => {
  const query = `
    INSERT INTO chats (user_message, bot_response)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [userMessage, botResponse];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw err;
  }
};

module.exports = {
  saveChat,
};