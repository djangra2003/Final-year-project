import { Delete, Edit, Favorite, FavoriteBorder, Share } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Paper, Rating, Snackbar, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import beachesData from './beaches.json';
import Footer from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';

interface Beach {
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  activities: string[];
  bestTimeToVisit: string;
  howToReach: string;
  attractions: string[];
  accommodation: {
    [key: string]: string;
  };
  foodSpecialties: string[];
  tips: string[];
  location: string;
  nearbyPlaces: string[];
}

interface BeachesData {
  [key: string]: Beach;
}

interface Review {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: number;
  created_at: string;
}

const BeachDetails: React.FC = () => {
  const [favorite, setFavorite] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const { beachId } = useParams<{ beachId: string }>();
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editName, setEditName] = useState('');
  const [editReview, setEditReview] = useState('');
  const [editRating, setEditRating] = useState<number>(0);
  
  const convertUrlToJsonFormat = useCallback((urlName: string) => {
    return urlName.replace(/([A-Z])/g, ' $1').trim();
  }, []);

  // Debug logging
  console.log('BeachId from URL:', beachId);
  console.log('Converted beach name:', convertUrlToJsonFormat(beachId || ''));
  console.log('Available beach keys:', Object.keys(beachesData));
  
  // Access the beach data using the converted name
  const beach = (beachesData as unknown as BeachesData)[convertUrlToJsonFormat(beachId || '')];

  if (!beach) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3, bgcolor: '#f5f9fc' }}>
          <Typography variant="h4">Beach not found</Typography>
          <Typography variant="body1" color="text.secondary">
            The beach "{beachId}" could not be found. Please check the URL and try again.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Available beaches: {Object.keys(beachesData).join(', ')}
          </Typography>
        </Box>
        <Footer />
      </>
    );
  }

  const fetchReviews = useCallback(async () => {
    if (!beachId) return;
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${beachId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, [beachId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Beach Buddy - ${convertUrlToJsonFormat(beachId || '')}`,
          text: `Check out ${convertUrlToJsonFormat(beachId || '')} on Beach Buddy!`,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareSuccess(true);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview || rating === 0 || !name) {
      alert('Please provide your name, review, and rating');
      return;
    }

    setLoading(true);
    try {
      const reviewData = {
        name: name,
        location: beach.location,
        review: newReview,
        rating: rating
      };

      // Debug logs
      console.log('Submitting review with data:', reviewData);

      const response = await fetch(`http://localhost:5000/api/reviews/${beachId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.message || 'Failed to submit review');
      }
      
      alert('Thank you for your review!');
      setNewReview('');
      setRating(0);
      setName('');
      fetchReviews();
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
    setEditName(review.name);
    setEditReview(review.review);
    setEditRating(review.rating);
  };

  const handleUpdateReview = async () => {
    if (!editingReview) return;

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${editingReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editName,
          location: beach.location,
          review: editReview,
          rating: editRating
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update review');
      }

      setEditingReview(null);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      alert(error instanceof Error ? error.message : 'Failed to update review');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete review');
      }

      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete review');
    }
  };

  return (
    <>
      <Header />
      <HeroSection 
        title={convertUrlToJsonFormat(beachId || '')}
        subtitle={beach.location}
      />
      <Box sx={{ p: 3, bgcolor: '#f5f9fc' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4" sx={{ color: '#1a73e8' }} gutterBottom>
            {convertUrlToJsonFormat(beachId || '')}
            <IconButton
              onClick={() => setFavorite(!favorite)}
              sx={{ ml: 2, color: favorite ? '#ff1744' : 'grey.500' }}
            >
              {favorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <IconButton
              onClick={handleShare}
              sx={{ color: '#1a73e8' }}
            >
              <Share />
            </IconButton>
          </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {convertUrlToJsonFormat(beachId || '')}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {beach.location}
        </Typography>

        <Grid container spacing={3}>
          {/* Description */}
          <Grid item xs={12}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography>{beach.description}</Typography>
            </Paper>
          </Grid>

          {/* Google Maps */}
          <Grid item xs={12}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Location
              </Typography>
              <Box sx={{ width: '100%', height: '400px' }}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCw8zMhG94ABQhZjjOPSlUbks0hJoM474Q&q=${beach.coordinates.lat},${beach.coordinates.lng}`}
                  title={`${beachId} Location`}
                />
              </Box>
            </Paper>
          </Grid>

          {/* Activities */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Activities
              </Typography>
              <List>
                {beach.activities.map((activity: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={activity} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Attractions */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Attractions
              </Typography>
              <List>
                {beach.attractions.map((attraction: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={attraction} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Accommodation */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Accommodation
              </Typography>
              <List>
                {Object.entries(beach.accommodation).map(([key, value]) => (
                  <ListItem key={key}>
                    <ListItemText primary={`${key}: ${value}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Food Specialties */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Food Specialties
              </Typography>
              <List>
                {beach.foodSpecialties.map((food: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={food} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Best Time to Visit */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Best Time to Visit
              </Typography>
              <Typography>{beach.bestTimeToVisit}</Typography>
            </Paper>
          </Grid>

          {/* How to Reach */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                How to Reach
              </Typography>
              <Typography>{beach.howToReach}</Typography>
            </Paper>
          </Grid>

          {/* Tips */}
          <Grid item xs={12}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Tips
              </Typography>
              <List>
                {beach.tips.map((tip: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={tip} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Nearby Places */}
          <Grid item xs={12}>
            <Paper sx={{
                p: 2,
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  bgcolor: 'rgba(236, 246, 252, 0.8)'
                },
                bgcolor: 'rgba(236, 246, 252, 0.4)',
                borderRadius: 2
              }}>
              <Typography variant="h6" gutterBottom>
                Nearby Places
              </Typography>
              <List>
                {beach.nearbyPlaces.map((place: string, index: number) => (
                  <ListItem key={index}>
                    <ListItemText primary={place} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
          {/* Reviews Section */}
          <Grid item xs={12}>
            <Paper sx={{
              p: 2,
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
                bgcolor: 'rgba(236, 246, 252, 0.8)'
              },
              bgcolor: 'rgba(236, 246, 252, 0.4)',
              borderRadius: 2
            }}>
              <Typography variant="h6" gutterBottom>
                Reviews
              </Typography>

              {/* Add Review Form */}
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Write your review"
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography component="legend">Rating:</Typography>
                  <Rating
                    value={rating}
                    onChange={(_, newValue) => setRating(newValue || 0)}
                  />
                </Box>
                <Button
                  variant="contained"
                  onClick={handleSubmitReview}
                  disabled={loading}
                  sx={{ mt: 1 }}
                >
                  {loading ? 'Submitting...' : 'Submit Review'}
                </Button>
              </Box>

              {/* Edit Review Form */}
              {editingReview && (
                <Box sx={{ mb: 4, p: 2, bgcolor: 'rgba(255, 255, 255, 0.8)', borderRadius: 2 }}>
                  <Typography variant="h6" gutterBottom>Edit Review</Typography>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Write your review"
                    value={editReview}
                    onChange={(e) => setEditReview(e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography component="legend">Rating:</Typography>
                    <Rating
                      value={editRating}
                      onChange={(_, newValue) => setEditRating(newValue || 0)}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleUpdateReview}
                      disabled={loading}
                    >
                      Update Review
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setEditingReview(null)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              )}

              {/* Display Reviews */}
              <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {reviews.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">No reviews yet. Be the first to review!</Typography>
                ) : (
                  reviews.map((review) => (
                    <Paper
                      key={review.id}
                      sx={{
                        p: 2,
                        mb: 2,
                        bgcolor: 'white',
                        borderRadius: 3,
                        boxShadow: 3,
                        minWidth: 300,
                        maxWidth: 400,
                        flex: '1 1 320px',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px) scale(1.03)',
                          boxShadow: 6,
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        position: 'relative',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, width: '100%', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            mr: 2,
                            boxShadow: 1,
                            bgcolor: '#e3f2fd',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                            <img
                              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(review.name || 'User')}`}
                              alt={review.name}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#1976d2' }}>{review.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {review.location || ''}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          <IconButton
                            size="small"
                            onClick={() => handleEditReview(review)}
                            sx={{ color: '#1976d2' }}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteReview(review.id)}
                            sx={{ color: '#d32f2f' }}
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                          {new Date(review.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ mb: 1, color: '#333', fontStyle: 'italic' }}>
                        "{review.review}"
                      </Typography>
                    </Paper>
                  ))
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Snackbar
        open={showShareSuccess}
        autoHideDuration={3000}
        onClose={() => setShowShareSuccess(false)}
        message="Link copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
      <Footer />
    </>
  );
};

export default BeachDetails;