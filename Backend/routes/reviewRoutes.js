const express = require('express');
const pool = require('../config/db');
const router = express.Router();

// Route to submit a review for a specific beach
router.post('/:beachId', async (req, res) => {
  const { beachId } = req.params;
  const { name, location, review, rating } = req.body;

  // Debug log
  console.log('Received review data:', { beachId, name, location, review, rating });

  if (!beachId || !name || !location || !review || rating == null) {
    console.log('Missing fields:', { beachId, name, location, review, rating });
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

// Route to edit a review
router.put('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { name, location, review, rating } = req.body;

  if (!name || !location || !review || rating == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const updatedReview = await pool.query(
      'UPDATE reviews SET name = $1, location = $2, review = $3, rating = $4 WHERE id = $5 RETURNING *',
      [name, location, review, rating, reviewId]
    );

    if (updatedReview.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review: updatedReview.rows[0] });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to delete a review
router.delete('/:reviewId', async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deletedReview = await pool.query(
      'DELETE FROM reviews WHERE id = $1 RETURNING *',
      [reviewId]
    );

    if (deletedReview.rows.length === 0) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
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
