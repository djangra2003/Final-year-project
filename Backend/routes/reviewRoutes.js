const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Route to submit a review for a specific beach
router.post('/:beachId', async (req, res) => {
  const { beachId } = req.params;
  const { name, location, review, rating } = req.body;

  if (!beachId || !name || !location || !review || rating == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = await pool.query(
      'INSERT INTO reviews (beach_id, name, location, review, rating) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [beachId, name, location, review, rating]
    );

    res.status(201).json({ message: 'Review submitted successfully', review: newReview.rows[0] });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all reviews for a specific beach
router.get('/:beachId', async (req, res) => {
  const { beachId } = req.params;

  try {
    const beachReviews = await pool.query(
      'SELECT * FROM reviews WHERE beach_id = $1 ORDER BY created_at DESC',
      [beachId]
    );
    res.status(200).json(beachReviews.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get all reviews (for admin purposes)
router.get('/', async (req, res) => {
  try {
    const allReviews = await pool.query('SELECT * FROM reviews ORDER BY created_at DESC');
    res.status(200).json(allReviews.rows);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
