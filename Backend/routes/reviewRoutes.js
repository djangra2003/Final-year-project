const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pool = require('../config/db');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '..', 'uploads', 'reviews');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WebP are allowed.'));
    }
  }
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File too large. Maximum size is 10MB per file.' 
      });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ 
        message: 'Too many files. Maximum 5 files allowed.' 
      });
    }
    return res.status(400).json({ 
      message: 'Error uploading file: ' + err.message 
    });
  }
  next(err);
};

// Route to submit a review for a specific beach
router.post('/:beachId', upload.array('images', 5), handleMulterError, async (req, res) => {
  const { beachId } = req.params;
  const { name, location, review, rating } = req.body;

  // Debug log
  console.log('Received review data:', { beachId, name, location, review, rating });

  if (!beachId || !name || !location || !review || rating == null) {
    console.log('Missing fields:', { beachId, name, location, review, rating });
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Get image URLs if files were uploaded
    const imageUrls = req.files ? req.files.map(file => `/uploads/reviews/${file.filename}`) : [];

    const newReview = await pool.query(
      'INSERT INTO reviews (beach_id, name, location, review, rating, images) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [beachId, name, location, review, rating, imageUrls]
    );

    res.status(201).json({ message: 'Review submitted successfully', review: newReview.rows[0] });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to edit a review
router.put('/:reviewId', upload.array('images', 5), handleMulterError, async (req, res) => {
  const { reviewId } = req.params;
  const { name, location, review, rating } = req.body;

  if (!name || !location || !review || rating == null) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Get image URLs if files were uploaded
    const imageUrls = req.files ? req.files.map(file => `/uploads/reviews/${file.filename}`) : [];

    const updatedReview = await pool.query(
      'UPDATE reviews SET name = $1, location = $2, review = $3, rating = $4, images = $5 WHERE id = $6 RETURNING *',
      [name, location, review, rating, imageUrls, reviewId]
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
    // First get the review to delete associated images
    const review = await pool.query('SELECT images FROM reviews WHERE id = $1', [reviewId]);
    
    if (review.rows.length > 0) {
      // Delete associated images
      const images = review.rows[0].images || [];
      images.forEach(imageUrl => {
        const filename = imageUrl.split('/').pop();
        const imagePath = path.join(__dirname, '..', 'uploads', 'reviews', filename);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

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

