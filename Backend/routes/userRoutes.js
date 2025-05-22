const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const bcrypt = require('bcrypt');

// Get user profile
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await pool.query(
      'SELECT id, username, email, profile_picture, created_at FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Error fetching user profile' });
  }
});

// Update user profile
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { username, email, currentPassword, newPassword } = req.body;

    // First get the user
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userResult.rows[0];
    let updateFields = [];
    let queryParams = [];
    let paramCount = 1;

    // Update username if provided
    if (username) {
      updateFields.push(`username = $${paramCount}`);
      queryParams.push(username);
      paramCount++;
    }

    // Update email if provided
    if (email) {
      updateFields.push(`email = $${paramCount}`);
      queryParams.push(email);
      paramCount++;
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      // Verify current password
      const validPassword = await bcrypt.compare(currentPassword, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      
      updateFields.push(`password = $${paramCount}`);
      queryParams.push(hashedPassword);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // Add userId to query params
    queryParams.push(userId);

    // Update user
    const updateQuery = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, username, email, profile_picture, created_at
    `;

    const result = await pool.query(updateQuery, queryParams);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

// Get user reviews
router.get('/:userId/reviews', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // First check if user exists
    const userExists = await pool.query('SELECT id FROM users WHERE id = $1', [userId]);
    if (userExists.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get user's reviews with beach names
    const result = await pool.query(
      `SELECT r.*, b.name as beach_name 
       FROM reviews r 
       LEFT JOIN beaches b ON r.beach_id = b.id 
       WHERE r.user_id = $1 
       ORDER BY r.created_at DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    res.status(500).json({ message: 'Error fetching user reviews' });
  }
});

module.exports = router; 