import { ArrowBack, ArrowForward, Close, Delete, Edit, Favorite, FavoriteBorder, Image as ImageIcon, Share } from '@mui/icons-material';
import { Alert, Box, Button, Grid, IconButton, List, ListItem, ListItemText, Modal, Paper, Rating, Snackbar, TextField, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import beachesData from './beaches.json';
import Footer from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';

const WEATHER_API_KEY = "d6415f00dd1055c7373167c1e14275fbc";
const STORMGLASS_API_KEY = "80144e12-2b5c-11f01-9b8b-0242ac130003-80144ea8-2b5c-11f0-9b8b-0242ac130003";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

interface TideData {
  height: number;
  time: string;
  type: 'high' | 'low';
}

interface StormglassTideData {
  height: number;
  time: string;
  type: string;
}

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
  images: string[];
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
  const [weatherAlert, setWeatherAlert] = useState<string | null>(null);
  const [tideAlert, setTideAlert] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editReview, setEditReview] = useState('');
  const [editRating, setEditRating] = useState<number>(0);
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [tideData, setTideData] = useState<TideData[]>([]);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingTide, setLoadingTide] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [editImages, setEditImages] = useState<File[]>([]);
  const [editImagePreviews, setEditImagePreviews] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedReviewImages, setSelectedReviewImages] = useState<string[]>([]);
  
  const convertUrlToJsonFormat = useCallback((urlName: string) => {
    return urlName.replace(/([A-Z])/g, ' $1').trim();
  }, []);

  const beach = (beachesData as unknown as BeachesData)[convertUrlToJsonFormat(beachId || '')];

  if (!beach) {
    return (
      <>
        <Header />
        <Box sx={{ p: 3, bgcolor: '#f5f9fc' }}>
      {(weatherAlert || tideAlert) && (
        <Box sx={{ mb: 3 }}>
          {weatherAlert && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {weatherAlert}
            </Alert>
          )}
          {tideAlert && (
            <Alert severity="info">
              {tideAlert}
            </Alert>
          )}
        </Box>
      )}
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

  const fetchWeatherData = useCallback(async (lat: number, lon: number) => {
    if (!lat || !lon) return;
    setLoadingWeather(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      setWeatherData({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
    } finally {
      setLoadingWeather(false);
    }
  }, []);

  const fetchTideData = useCallback(async (lat: number, lon: number) => {
    if (!lat || !lon) return;
    setLoadingTide(true);
    try {
      const response = await fetch(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lon}&start=${new Date().toISOString()}&end=${new Date(Date.now() + 86400000).toISOString()}`,
        {
          headers: {
            'Authorization': STORMGLASS_API_KEY
          }
        }
      );
      if (!response.ok) throw new Error('Failed to fetch tide data');
      const data = await response.json();
      const formattedTideData: TideData[] = data.data.map((tide: StormglassTideData) => ({
        height: tide.height,
        time: new Date(tide.time).toLocaleString(),
        type: tide.type as 'high' | 'low'
      }));
      setTideData(formattedTideData);
    } catch (error) {
      console.error('Error fetching tide data:', error);
      setTideData([]);
    } finally {
      setLoadingTide(false);
    }
  }, []);

  const checkWeatherConditions = useCallback(async (lat: number, lon: number) => {
    if (!lat || !lon) return;
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      if (!weatherResponse.ok) throw new Error('Failed to fetch weather data');
      const weatherJson = await weatherResponse.json();

      const tideResponse = await fetch(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lon}&start=${new Date().toISOString()}&end=${new Date(Date.now() + 86400000).toISOString()}`,
        {
          headers: {
            'Authorization': STORMGLASS_API_KEY
          }
        }
      );
      if (!tideResponse.ok) throw new Error('Failed to fetch tide data');
      const tideJson = await tideResponse.json();

      if (weatherJson.weather[0].main === 'Thunderstorm') {
        setWeatherAlert('Storm Alert: Dangerous weather conditions detected!');
      } else {
        setWeatherAlert(null);
      }

      const highTides = tideJson.data.filter((tide: StormglassTideData) => tide.height > 2.5);
      if (highTides.length > 0) {
        setTideAlert('High Tide Warning: Be cautious when visiting the beach!');
      } else {
        setTideAlert(null);
      }
    } catch (err) {
      console.error('Error checking conditions:', err);
      setWeatherAlert(null);
      setTideAlert(null);
    }
  }, []);

  useEffect(() => {
    if (beach?.coordinates) {
      fetchWeatherData(beach.coordinates.lat, beach.coordinates.lng);
      fetchTideData(beach.coordinates.lat, beach.coordinates.lng);
      checkWeatherConditions(beach.coordinates.lat, beach.coordinates.lng);
    }
  }, [beach?.coordinates, fetchWeatherData, fetchTideData, checkWeatherConditions]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isFavorite = wishlist.some((item: any) => item.id === beachId);
    setFavorite(isFavorite);
  }, [beachId]);
  
  useEffect(() => {
    if (beachId) {
      fetchReviews();
    }
  }, [beachId]);

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

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    if (selectedImages.length + newImages.length > 5) {
      alert('You can only upload up to 5 images');
      return;
    }

    setSelectedImages(prev => [...prev, ...newImages]);
    
    // Create previews
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files);
    if (editImages.length + newImages.length > 5) {
      alert('You can only upload up to 5 images');
      return;
    }

    setEditImages(prev => [...prev, ...newImages]);
    
    // Create previews
    newImages.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveEditImage = (index: number) => {
    setEditImages(prev => prev.filter((_, i) => i !== index));
    setEditImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      alert('Please log in to submit a review.');
      navigate('/login');
      return;
    }
    if (!newReview || rating === 0 || !name) {
      alert('Please provide your name, review, and rating');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('location', beach.location);
      formData.append('review', newReview);
      formData.append('rating', rating.toString());
      
      selectedImages.forEach(image => {
        formData.append('images', image);
      });

      const response = await fetch(`http://localhost:5000/api/reviews/${beachId}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }
      
      alert('Thank you for your review!');
      setNewReview('');
      setRating(0);
      setName('');
      setSelectedImages([]);
      setImagePreviews([]);
      fetchReviews();
    } catch (error) {
      console.error('Error:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit review. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (review: Review) => {
    if (!isAuthenticated) {
      alert('Please log in to edit reviews.');
      navigate('/login');
      return;
    }
    setEditingReview(review);
    setEditName(review.name);
    setEditReview(review.review);
    setEditRating(review.rating);
  };

  const handleUpdateReview = async () => {
    if (!isAuthenticated) {
      alert('Please log in to update a review.');
      navigate('/login');
      return;
    }
    if (!editingReview) return;

    try {
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('location', beach.location);
      formData.append('review', editReview);
      formData.append('rating', editRating.toString());
      
      editImages.forEach(image => {
        formData.append('images', image);
      });

      const response = await fetch(`http://localhost:5000/api/reviews/${editingReview.id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update review');
      }

      setEditingReview(null);
      setEditImages([]);
      setEditImagePreviews([]);
      fetchReviews();
    } catch (error) {
      console.error('Error updating review:', error);
      alert(error instanceof Error ? error.message : 'Failed to update review');
    }
  };

  const handleDeleteReview = async (reviewId: number) => {
    if (!isAuthenticated) {
      alert('Please log in to delete a review.');
      navigate('/login');
      return;
    }
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

  const handleImageClick = (images: string[], index: number) => {
    setSelectedReviewImages(images);
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
    setSelectedReviewImages([]);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex + 1) % selectedReviewImages.length);
  };

  const handlePreviousImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((selectedImageIndex - 1 + selectedReviewImages.length) % selectedReviewImages.length);
  };

  // Add keyboard event listener
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      switch (event.key) {
        case 'ArrowRight':
          handleNextImage();
          break;
        case 'ArrowLeft':
          handlePreviousImage();
          break;
        case 'Escape':
          handleCloseModal();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, selectedReviewImages]);

  return (
    <>
      <Header />
      <HeroSection 
        title={convertUrlToJsonFormat(beachId || '')}
        subtitle={beach.location}
      />
      <Box sx={{ p: { xs: 1, sm: 2, md: 3 }, bgcolor: '#f5f9fc' }}>
        {(weatherAlert || tideAlert) && (
          <Box sx={{ mb: 3 }}>
            {weatherAlert && (
              <Alert severity="warning" sx={{ mb: 2 }}>
                {weatherAlert}
              </Alert>
            )}
            {tideAlert && (
              <Alert severity="info">
                {tideAlert}
              </Alert>
            )}
          </Box>
        )}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' }, 
          justifyContent: 'space-between', 
          mb: 2,
          gap: 1
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#1a73e8',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
            }} 
            gutterBottom
          >
            {convertUrlToJsonFormat(beachId || '')}
            <IconButton
              onClick={() => {
                const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
                const index = wishlist.findIndex((item: any) => item.id === beachId);
            
                if (index !== -1) {
                  // Already in wishlist → remove it
                  wishlist.splice(index, 1);
                  localStorage.setItem('wishlist', JSON.stringify(wishlist));
                  setFavorite(false);
                } else {
                  // Not in wishlist → add it
                  wishlist.push({
                    id: beachId,
                    name: convertUrlToJsonFormat(beachId || ''),
                    location: beach.location,
                    image: `/images/${beach?.images?.[0] || 'default.jpg'}`, // use correct image path
                  });
                  localStorage.setItem('wishlist', JSON.stringify(wishlist));
                  setFavorite(true);
                }
              }}
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

        <Grid container spacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* Weather and Tide Information */}
          <Grid item xs={12} md={6}>
            <Paper sx={{
              p: { xs: 1, sm: 2 },
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
                bgcolor: 'rgba(236, 246, 252, 0.8)'
              },
              bgcolor: 'rgba(236, 246, 252, 0.4)',
              borderRadius: 2
            }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} gutterBottom>
                Current Weather
              </Typography>
              {loadingWeather ? (
                <Typography>Loading weather data...</Typography>
              ) : weatherData ? (
                <Box>
                  <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#1a73e8' }}>
                    {Math.round(weatherData.temperature)}°C
                  </Typography>
                  <Typography variant="body1" sx={{ textTransform: 'capitalize', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    {weatherData.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    Humidity: {weatherData.humidity}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
                    Wind Speed: {weatherData.windSpeed} m/s
                  </Typography>
                </Box>
              ) : (
                <Typography color="error">Failed to load weather data</Typography>
              )}
            </Paper>
          </Grid>

          {/* Tide Card */}
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
                Tide Information
              </Typography>
              {loadingTide ? (
                <Typography>Loading tide data...</Typography>
              ) : tideData.length > 0 ? (
                <Box>
                  {tideData.map((tide, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant="body1" sx={{ 
                        color: tide.type === 'high' ? '#1976d2' : '#2e7d32',
                        fontWeight: 'bold'
                      }}>
                        {tide.type === 'high' ? 'High Tide' : 'Low Tide'}: {tide.height.toFixed(2)}m
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {tide.time}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography color="error">Failed to load tide data</Typography>
              )}
            </Paper>
          </Grid>

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
              p: { xs: 1, sm: 2 },
              transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3,
                bgcolor: 'rgba(236, 246, 252, 0.8)'
              },
              bgcolor: 'rgba(236, 246, 252, 0.4)',
              borderRadius: 2
            }}>
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }} gutterBottom>
                Reviews
              </Typography>

              {/* Add Review Form */}
              {isAuthenticated ? (
                <Box sx={{ mb: 4 }}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 2 }}
                    size="small"
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Write your review"
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    sx={{ mb: 2 }}
                    size="small"
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                    <Typography component="legend" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>Rating:</Typography>
                    <Rating
                      value={rating}
                      onChange={(_, newValue) => setRating(newValue || 0)}
                      size="small"
                    />
                  </Box>
                  
                  {/* Image Upload Section */}
                  <Box sx={{ mb: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="image-upload"
                      type="file"
                      multiple
                      onChange={handleImageSelect}
                    />
                    <label htmlFor="image-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<ImageIcon />}
                        size="small"
                        sx={{ mr: 2 }}
                      >
                        Add Images
                      </Button>
                    </label>
                    <Typography variant="caption" color="text.secondary">
                      (Up to 5 images)
                    </Typography>
                  </Box>

                  {/* Image Previews */}
                  {imagePreviews.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {imagePreviews.map((preview, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: 'relative',
                            width: { xs: 80, sm: 100 },
                            height: { xs: 80, sm: 100 },
                          }}
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveImage(index)}
                            sx={{
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              bgcolor: 'white',
                              '&:hover': { bgcolor: 'grey.100' },
                              padding: { xs: 0.5, sm: 1 },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleSubmitReview}
                    disabled={loading || !isAuthenticated}
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    {loading ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </Box>
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                  Please <Button onClick={() => navigate('/login')} size="small">log in</Button> to add a review.
                </Typography>
              )}

              {/* Edit Review Form */}
              {isAuthenticated && editingReview && (
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

                  {/* Image Upload Section for Edit */}
                  <Box sx={{ mb: 2 }}>
                    <input
                      accept="image/*"
                      style={{ display: 'none' }}
                      id="edit-image-upload"
                      type="file"
                      multiple
                      onChange={handleEditImageSelect}
                    />
                    <label htmlFor="edit-image-upload">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<ImageIcon />}
                        sx={{ mr: 2 }}
                      >
                        Add Images
                      </Button>
                    </label>
                    <Typography variant="caption" color="text.secondary">
                      (Up to 5 images)
                    </Typography>
                  </Box>

                  {/* Image Previews for Edit */}
                  {editImagePreviews.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {editImagePreviews.map((preview, index) => (
                        <Box
                          key={index}
                          sx={{
                            position: 'relative',
                            width: 100,
                            height: 100,
                          }}
                        >
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              borderRadius: '4px',
                            }}
                          />
                          <IconButton
                            size="small"
                            onClick={() => handleRemoveEditImage(index)}
                            sx={{
                              position: 'absolute',
                              top: -8,
                              right: -8,
                              bgcolor: 'white',
                              '&:hover': { bgcolor: 'grey.100' },
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={handleUpdateReview}
                      disabled={loading || !isAuthenticated}
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
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                    No reviews yet. Be the first to review!
                  </Typography>
                ) : (
                  reviews.map((review) => (
                    <Paper
                      key={review.id}
                      sx={{
                        p: { xs: 1, sm: 2 },
                        mb: 2,
                        bgcolor: 'white',
                        borderRadius: 3,
                        boxShadow: 3,
                        width: { xs: '100%', sm: 'calc(50% - 16px)', md: 'calc(33.33% - 16px)' },
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
                            width: { xs: 36, sm: 48 },
                            height: { xs: 36, sm: 48 },
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
                            <Typography variant="subtitle1" sx={{ 
                              fontWeight: 600, 
                              color: '#1976d2',
                              fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}>
                              {review.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                              {review.location || ''}
                            </Typography>
                          </Box>
                        </Box>
                        <Box>
                          {isAuthenticated && (
                            <>
                              <IconButton
                                size="small"
                                onClick={() => handleEditReview(review)}
                                sx={{ color: '#1976d2', padding: { xs: 0.5, sm: 1 } }}
                              >
                                <Edit fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteReview(review.id)}
                                sx={{ color: '#d32f2f', padding: { xs: 0.5, sm: 1 } }}
                              >
                                <Delete fontSize="small" />
                              </IconButton>
                            </>
                          )}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={review.rating} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                          {new Date(review.created_at).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body1" sx={{ 
                        mb: 1, 
                        color: '#333', 
                        fontStyle: 'italic',
                        fontSize: { xs: '0.9rem', sm: '1rem' }
                      }}>
                        "{review.review}"
                      </Typography>
                      
                      {/* Display Review Images */}
                      {review.images && review.images.length > 0 && (
                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {review.images.map((image, index) => (
                            <Box
                              key={index}
                              sx={{
                                position: 'relative',
                                width: { xs: 80, sm: 100 },
                                height: { xs: 80, sm: 100 },
                                cursor: 'pointer',
                                '&:hover': {
                                  opacity: 0.8,
                                },
                              }}
                              onClick={() => handleImageClick(review.images, index)}
                            >
                              <img
                                src={`http://localhost:5000${image}`}
                                alt={`Review image ${index + 1}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  borderRadius: '4px',
                                }}
                              />
                            </Box>
                          ))}
                        </Box>
                      )}
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
      {/* Image Gallery Modal */}
      <Modal
        open={selectedImageIndex !== null}
        onClose={handleCloseModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0, 0, 0, 0.9)',
        }}
      >
        <Box sx={{ 
          position: 'relative', 
          width: { xs: '100%', sm: '90vw' }, 
          height: { xs: '100%', sm: '90vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {/* Close button */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: { xs: 8, sm: 16 },
              right: { xs: 8, sm: 16 },
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              zIndex: 1,
              padding: { xs: 0.5, sm: 1 }
            }}
          >
            <Close fontSize="small" />
          </IconButton>

          {/* Navigation buttons */}
          <IconButton
            onClick={handlePreviousImage}
            sx={{
              position: 'absolute',
              left: { xs: 8, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              zIndex: 1,
              padding: { xs: 0.5, sm: 1 }
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>

          <IconButton
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              right: { xs: 8, sm: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.7)' },
              zIndex: 1,
              padding: { xs: 0.5, sm: 1 }
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>

          {/* Image counter */}
          <Typography
            variant="h6"
            sx={{
              position: 'absolute',
              bottom: { xs: 8, sm: 16 },
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              padding: { xs: '2px 8px', sm: '4px 12px' },
              borderRadius: '16px',
              zIndex: 1,
              fontSize: { xs: '0.9rem', sm: '1.25rem' }
            }}
          >
            {selectedImageIndex !== null ? `${selectedImageIndex + 1} / ${selectedReviewImages.length}` : ''}
          </Typography>

          {/* Main image */}
          {selectedImageIndex !== null && (
            <img
              src={`http://localhost:5000${selectedReviewImages[selectedImageIndex]}`}
              alt={`Review image ${selectedImageIndex + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          )}
        </Box>
      </Modal>
    </>
  );
};

export default BeachDetails;