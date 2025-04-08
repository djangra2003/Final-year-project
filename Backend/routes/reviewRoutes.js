const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// ✅ Route to submit a review
router.post('/', async (req, res) => {
  const { name, location, review, rating } = req.body;

  if (!name || !location || !review || rating == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newReview = await pool.query(
      'INSERT INTO reviews (name, location, review, rating) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, location, review, rating]
    );

    res.status(201).json({ message: 'Review submitted successfully', review: newReview.rows[0] });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// ✅ Route to get all reviews
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
