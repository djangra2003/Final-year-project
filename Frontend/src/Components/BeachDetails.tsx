import { Favorite, FavoriteBorder, Share } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Paper, Rating, Snackbar, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
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
    budget: string;
    luxury: string;
  };
  foodSpecialties: string[];
  tips: string[];
  location: string;
  nearbyPlaces: string[];
}

interface BeachesData {
  [key: string]: Beach;
}

const BeachDetails: React.FC = () => {
  const [favorite, setFavorite] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { beachId } = useParams<{ beachId: string }>();
  
  // Convert URL format (e.g., "PuriBeach") to JSON format (e.g., "Puri Beach")
  const convertUrlToJsonFormat = (urlName: string) => {
    // Add space before capital letters and trim
    return urlName.replace(/([A-Z])/g, ' $1').trim();
  };

  // Debug logging
  console.log('BeachId from URL:', beachId);
  console.log('Converted beach name:', convertUrlToJsonFormat(beachId || ''));
  console.log('Available beach keys:', Object.keys(beachesData));
  
  // Access the beach data using the converted name
  const beach = (beachesData as BeachesData)[convertUrlToJsonFormat(beachId || '')];

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

  useEffect(() => {
    if (beachId) {
      fetchReviews();
    }
  }, [beachId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${beachId}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (!newReview || rating === 0) {
      alert('Please provide both a review and rating');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${beachId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          location: beach.location,
          review: newReview,
          rating
        }),
      });

      if (!response.ok) throw new Error('Failed to submit review');
      
      alert('Thank you for your review!');
      setNewReview('');
      setRating(0);
      setName('');
      fetchReviews(); // Refresh reviews after submission
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
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

              {/* Display Reviews */}
              <Box sx={{ mt: 4 }}>
                {reviews.map((review, index) => (
                  <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'white' }}>
                    <Typography variant="h6">{review.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                      <Rating value={review.rating} readOnly />
                    </Box>
                    <Typography variant="body1">{review.review}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(review.created_at).toLocaleDateString()}
                    </Typography>
                  </Paper>
                ))}
              </Box>
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
                <ListItem>
                  <ListItemText primary={`Budget: ${beach.accommodation.budget}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Luxury: ${beach.accommodation.luxury}`} />
                </ListItem>
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