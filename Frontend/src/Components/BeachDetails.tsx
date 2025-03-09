import { Box, Container, Grid, ImageList, ImageListItem, Paper, Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import HeroSection from './HeroSection';
import { BeachAccess, DirectionsBoatFilled, LocalDining, LocalHotel, SportsVolleyball } from '@mui/icons-material';

// Import beach images
import kovalam1 from '../assets/booking.jpg';
import marina1 from '../assets/candolim.png';
import rushikonda1 from '../assets/dhanushkodi.png';
import kadmat1 from '../assets/footer.png';
import eden1 from '../assets/games.png';
import { default as kappad1, default as minicoy1 } from '../assets/guides.png';
import patiSonepur1 from '../assets/herosection1.png';
import ghoghla1 from '../assets/herosection2.png';
import { default as padubidri1, default as puri1 } from '../assets/hotel 1.png';
import kasarkod1 from '../assets/kovalam.png';
import radhanagar1 from '../assets/radhanagar.png';

interface BeachData {
  id: string;
  name: string;
  location: string;
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
  entryFee?: string;
  timings?: string;
  nearbyPlaces: string[];
}

const beaches: { [key: string]: BeachData } = {
  'puri': {
    id: 'puri',
    name: 'Puri Beach',
    location: 'Odisha',
    description: 'Puri Beach is one of the finest beaches in Eastern India. Known for its spiritual significance and natural beauty, this beach attracts millions of visitors annually. The golden sands stretch for kilometers along the Bay of Bengal, offering spectacular sunrise views and religious importance due to its proximity to the Jagannath Temple.',
    coordinates: {
      lat: 19.7985,
      lng: 85.8248
    },
    images: [puri1, patiSonepur1],
    activities: [
      'Swimming',
      'Surfing',
      'Temple visits',
      'Sand art exhibitions',
      'Camel rides',
      'Beach volleyball',
      'Fishing'
    ],
    bestTimeToVisit: 'October to February when the weather is pleasant with temperatures ranging from 15°C to 28°C',
    howToReach: 'Nearest airport is Biju Patnaik International Airport, Bhubaneswar (60 km). Regular trains connect Puri to major cities. Well-connected by road network.',
    attractions: [
      'Jagannath Temple',
      'Swargadwar Beach',
      'Sand Art Park',
      'Chilika Lake nearby'
    ],
    accommodation: {
      budget: 'Beachside guesthouses starting from ₹800/night',
      luxury: 'Premium hotels with ocean view from ₹5000/night'
    },
    foodSpecialties: [
      'Fresh seafood',
      'Mahaprasad',
      'Local Odia cuisine'
    ],
    tips: [
      'Visit during Rath Yatra festival',
      'Early morning visits recommended for photography',
      'Carry sunscreen and water'
    ],
    nearbyPlaces: [
      'Konark Sun Temple (35 km)',
      'Chilika Lake (40 km)',
      'Raghurajpur Artist Village (14 km)'
    ]
  },
  'kovalam': {
    id: 'kovalam',
    name: 'Kovalam Beach',
    location: 'Kerala',
    description: 'Kovalam is an internationally renowned beach destination featuring three adjacent crescent beaches. The southernmost, Lighthouse Beach, is the most popular. Known for its pristine waters and ayurvedic treatments, it offers a perfect blend of leisure and wellness.',
    coordinates: {
      lat: 8.3988,
      lng: 76.9782
    },
    images: [kovalam1],
    activities: [
      'Ayurvedic treatments',
      'Swimming',
      'Sunbathing',
      'Catamaran cruising',
      'Water sports',
      'Yoga sessions'
    ],
    bestTimeToVisit: 'September to March when the weather is pleasant and ideal for water activities',
    howToReach: 'Trivandrum International Airport is just 15 km away. Well-connected by road and rail networks.',
    attractions: [
      'Lighthouse Beach',
      'Hawah Beach',
      'Samudra Beach',
      'Vizhinjam Lighthouse'
    ],
    accommodation: {
      budget: 'Beach hostels from ₹1000/night',
      luxury: 'Beach resorts from ₹8000/night'
    },
    foodSpecialties: [
      'Kerala seafood',
      'Traditional Kerala cuisine',
      'Fresh coconut water'
    ],
    tips: [
      'Book ayurvedic treatments in advance',
      'Best sunset views from lighthouse',
      'Carry appropriate swimwear'
    ],
    nearbyPlaces: [
      'Trivandrum city (12 km)',
      'Poovar Island (15 km)',
      'Neyyar Dam (32 km)'
    ]
  },
  'radhanagar': {
    id: 'radhanagar',
    name: 'Radhanagar Beach',
    location: 'Andaman and Nicobar Islands',
    description: 'Often rated as Asia\'s best beach, Radhanagar Beach (Beach No. 7) is known for its pristine white sands, turquoise waters, and lush green forest backdrop. This beach offers one of the most spectacular sunset views in India.',
    coordinates: {
      lat: 11.9832,
      lng: 92.9512
    },
    images: [radhanagar1],
    activities: [
      'Swimming',
      'Snorkeling',
      'Scuba diving',
      'Nature walks',
      'Photography',
      'Sunset watching'
    ],
    bestTimeToVisit: 'October to May, avoiding monsoon season',
    howToReach: 'Fly to Port Blair, then take a ferry to Havelock Island. The beach is 12 km from the jetty.',
    attractions: [
      'Pristine shoreline',
      'Coral reefs',
      'Marine life',
      'Sunset point'
    ],
    accommodation: {
      budget: 'Beach huts from ₹2000/night',
      luxury: 'Premium resorts from ₹12000/night'
    },
    foodSpecialties: [
      'Fresh seafood',
      'Coconut-based dishes',
      'Local delicacies'
    ],
    tips: [
      'Carry snorkeling gear',
      'Visit during early morning or sunset',
      'Limited food options, plan accordingly'
    ],
    nearbyPlaces: [
      'Elephant Beach (5 km)',
      'Kaala Pathar Beach (7 km)',
      'Neil Island (nearby)'
    ]
  },
  'marina': {
    id: 'marina',
    name: 'Marina Beach',
    location: 'Tamil Nadu',
    description: 'Marina Beach is the second-longest urban beach in the world, stretching for 13 kilometers along the Bay of Bengal. This historic beach features numerous landmarks, monuments, and is a cultural hub of Chennai.',
    coordinates: {
      lat: 13.0500,
      lng: 80.2824
    },
    images: [marina1],
    activities: [
      'Walking',
      'Horse riding',
      'Beach games',
      'Street food tasting',
      'Historical sightseeing'
    ],
    bestTimeToVisit: 'November to February when the weather is pleasant',
    howToReach: 'Chennai International Airport is 15 km away. Well-connected by local transport.',
    attractions: [
      'Marina Beach Lighthouse',
      'Statues and monuments',
      'Anna Square',
      'Aquarium'
    ],
    accommodation: {
      budget: 'City hotels from ₹1500/night',
      luxury: 'Beachfront hotels from ₹7000/night'
    },
    foodSpecialties: [
      'Sundal (beach snack)',
      'Fresh seafood',
      'Local street food'
    ],
    tips: [
      'Swimming not allowed',
      'Visit during sunrise',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Fort St. George',
      'San Thome Basilica',
      'Kapaleeshwarar Temple'
    ]
  },
  'rushikonda': {
    id: 'rushikonda',
    name: 'Rushikonda Beach',
    location: 'Andhra Pradesh',
    description: 'Rushikonda Beach is known for its golden sands and clear waters. It is a popular spot for water sports and offers a serene environment for relaxation.',
    coordinates: {
      lat: 17.7000,
      lng: 83.3500
    },
    images: [rushikonda1],
    activities: [
      'Swimming',
      'Surfing',
      'Water skiing',
      'Beach volleyball',
      'Sunbathing'
    ],
    bestTimeToVisit: 'October to February when the weather is pleasant',
    howToReach: 'Visakhapatnam Airport is 20 km away. Well-connected by road and rail networks.',
    attractions: [
      'Golden sands',
      'Water sports facilities',
      'Scenic views'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹1000/night',
      luxury: 'Luxury resorts from ₹5000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'Andhra cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Kailasagiri Park (5 km)',
      'Visakhapatnam city (20 km)',
      'Borra Caves (70 km)'
    ]
  },
  'eden': {
    id: 'eden',
    name: 'Eden Beach',
    location: 'Puducherry',
    description: 'Eden Beach is a serene and less-crowded beach in Puducherry. It is known for its clean waters and peaceful environment.',
    coordinates: {
      lat: 11.9132,
      lng: 79.8144
    },
    images: [eden1],
    activities: [
      'Swimming',
      'Sunbathing',
      'Beach walks',
      'Photography'
    ],
    bestTimeToVisit: 'October to March when the weather is pleasant',
    howToReach: 'Puducherry Airport is 10 km away. Well-connected by road and rail networks.',
    attractions: [
      'Clean waters',
      'Peaceful environment',
      'Scenic views'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹1000/night',
      luxury: 'Luxury resorts from ₹5000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'French cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Auroville (10 km)',
      'Puducherry city (10 km)',
      'Paradise Beach (15 km)'
    ]
  },
  'minicoy-thundi': {
    id: 'minicoy-thundi',
    name: 'Minicoy Thundi Beach',
    location: 'Lakshadweep',
    description: 'Minicoy Thundi Beach is known for its white sands and clear blue waters. It is a popular spot for water sports and offers a serene environment for relaxation.',
    coordinates: {
      lat: 8.2833,
      lng: 73.0167
    },
    images: [minicoy1],
    activities: [
      'Swimming',
      'Snorkeling',
      'Scuba diving',
      'Water sports',
      'Sunbathing'
    ],
    bestTimeToVisit: 'October to May when the weather is pleasant',
    howToReach: 'Fly to Agatti Airport, then take a boat to Minicoy Island.',
    attractions: [
      'White sands',
      'Clear blue waters',
      'Water sports facilities'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹2000/night',
      luxury: 'Luxury resorts from ₹8000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'Malabar cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Agatti Island (50 km)',
      'Kavaratti Island (70 km)',
      'Bangaram Island (80 km)'
    ]
  },
  'kadmat': {
    id: 'kadmat',
    name: 'Kadmat Beach',
    location: 'Lakshadweep',
    description: 'Kadmat Beach is known for its pristine white sands and clear blue waters. It is a popular spot for water sports and offers a serene environment for relaxation.',
    coordinates: {
      lat: 11.1833,
      lng: 72.7667
    },
    images: [kadmat1],
    activities: [
      'Swimming',
      'Snorkeling',
      'Scuba diving',
      'Water sports',
      'Sunbathing'
    ],
    bestTimeToVisit: 'October to May when the weather is pleasant',
    howToReach: 'Fly to Agatti Airport, then take a boat to Kadmat Island.',
    attractions: [
      'White sands',
      'Clear blue waters',
      'Water sports facilities'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹2000/night',
      luxury: 'Luxury resorts from ₹8000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'Malabar cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Agatti Island (50 km)',
      'Kavaratti Island (70 km)',
      'Bangaram Island (80 km)'
    ]
  },
  'kappad': {
    id: 'kappad',
    name: 'Kappad Beach',
    location: 'Kerala',
    description: 'Kappad Beach is historically significant as it is the place where Vasco da Gama landed in 1498. It is known for its serene environment and clear waters.',
    coordinates: {
      lat: 11.8667,
      lng: 75.3333
    },
    images: [kappad1],
    activities: [
      'Swimming',
      'Sunbathing',
      'Beach walks',
      'Photography'
    ],
    bestTimeToVisit: 'October to March when the weather is pleasant',
    howToReach: 'Calicut International Airport is 20 km away. Well-connected by road and rail networks.',
    attractions: [
      'Historical significance',
      'Serene environment',
      'Clear waters'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹1000/night',
      luxury: 'Luxury resorts from ₹5000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'Kerala cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Kozhikode city (20 km)',
      'Beypore Beach (10 km)',
      'Payyoli Beach (30 km)'
    ]
  },
  'kasarkod': {
    id: 'kasarkod',
    name: 'Kasarkod Beach',
    location: 'Karnataka',
    description: 'Kasarkod Beach is known for its clean waters and serene environment. It is a popular spot for relaxation and offers a peaceful getaway.',
    coordinates: {
      lat: 12.9167,
      lng: 74.8833
    },
    images: [kasarkod1],
    activities: [
      'Swimming',
      'Sunbathing',
      'Beach walks',
      'Photography'
    ],
    bestTimeToVisit: 'October to March when the weather is pleasant',
    howToReach: 'Mangalore International Airport is 30 km away. Well-connected by road and rail networks.',
    attractions: [
      'Clean waters',
      'Serene environment',
      'Scenic views'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹1000/night',
      luxury: 'Luxury resorts from ₹5000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'Coastal cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Mangalore city (30 km)',
      'Ullal Beach (20 km)',
      'Someshwar Beach (40 km)'
    ]
  },
  'padubidri': {
    id: 'padubidri',
    name: 'Padubidri Beach',
    location: 'Karnataka',
    description: 'Padubidri Beach is known for its clean waters and serene environment. It is a popular spot for relaxation and offers a peaceful getaway.',
    coordinates: {
      lat: 13.1667,
      lng: 74.7500
    },
    images: [padubidri1],
    activities: [
      'Swimming',
      'Sunbathing',
      'Beach walks',
      'Photography'
    ],
    bestTimeToVisit: 'October to March when the weather is pleasant',
    howToReach: 'Mangalore International Airport is 30 km away. Well-connected by road and rail networks.',
    attractions: [
      'Clean waters',
      'Serene environment',
      'Scenic views'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹1000/night',
      luxury: 'Luxury resorts from ₹5000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'Coastal cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Mangalore city (30 km)',
      'Ullal Beach (20 km)',
      'Someshwar Beach (40 km)'
    ]
  },
  'ghoghla': {
    id: 'ghoghla',
    name: 'Ghoghla Beach',
    location: 'Diu and Daman',
    description: 'Ghoghla Beach is known for its clean waters and serene environment. It is a popular spot for relaxation and offers a peaceful getaway.',
    coordinates: {
      lat: 20.7167,
      lng: 70.9667
    },
    images: [ghoghla1,patiSonepur1,kovalam1],
    activities: [
      'Swimming',
      'Sunbathing',
      'Beach walks',
      'Photography'
    ],
    bestTimeToVisit: 'October to March when the weather is pleasant',
    howToReach: 'Diu Airport is 10 km away. Well-connected by road and rail networks.',
    attractions: [
      'Clean waters',
      'Serene environment',
      'Scenic views'
    ],
    accommodation: {
      budget: 'Beachside guesthouses from ₹1000/night',
      luxury: 'Luxury resorts from ₹5000/night'
    },
    foodSpecialties: [
      'Local seafood',
      'Gujarati cuisine',
      'Street food'
    ],
    tips: [
      'Carry sunscreen and water',
      'Visit during early morning or evening',
      'Try local street food'
    ],
    nearbyPlaces: [
      'Diu city (10 km)',
      'Nagoa Beach (5 km)',
      'Jalandhar Beach (10 km)'
    ]
  }
};

const BeachDetails: React.FC = () => {
  const { beachId } = useParams<{ beachId: string }>();
  const beach = beaches[beachId || ''];

  if (!beach) {
    return (
      <Box>
        <Header />
        <Container>
          <Typography variant="h4">Beach not found</Typography>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f5f5f5' }}>
      <Header />
      <HeroSection
        title={beach.name}
        subtitle={`Discover the beauty of ${beach.name}, ${beach.location}`}
      />

      <Container maxWidth="lg" sx={{ my: 8, flex: 1 }}>
        <Grid container spacing={4}>
          {/* Beach Information */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, mb: 4, backgroundColor: '#fff' }}>
              <Typography variant="h4" gutterBottom sx={{ borderBottom: '2px solid #f0f0f0', pb: 2, mb: 4 }}>
                About {beach.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {beach.description}
              </Typography>

              {/* Updated Images Section */}
              <Box sx={{ width: '100%', mb: 3 }}>
                <ImageList
                  variant="quilted"
                  cols={3}
                  rowHeight={200}
                  sx={{
                    mb: 2,
                    '& .MuiImageListItem-root': {
                      overflow: 'hidden',
                      borderRadius: 2,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    },
                  }}
                >
                  {beach.images.map((img, index) => (
                    <ImageListItem
                      key={index}
                      cols={index === 0 ? 2 : 1}
                      rows={index === 0 ? 2 : 1}
                    >
                      <img
                        src={img}
                        alt={`${beach.name} view ${index + 1}`}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </Box>

              {/* Activities section with reduced spacing */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    borderBottom: '2px solid #f0f0f0',
                    pb: 1,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SportsVolleyball sx={{ mr: 1 }} />
                  Activities
                </Typography>
                <Grid container spacing={2}>
                  {beach.activities.map((activity, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography
                        component="div"
                        sx={{
                          p: 2,
                          bgcolor: 'background.paper',
                          borderRadius: 2,
                          boxShadow: 1,
                          transition: 'background-color 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                      >
                        • {activity}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Attractions with consistent styling */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    borderBottom: '2px solid #f0f0f0',
                    pb: 1,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <BeachAccess sx={{ mr: 1 }} />
                  Key Attractions
                </Typography>
                <Grid container spacing={2}>
                  {beach.attractions.map((attraction, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Typography
                        component="div"
                        sx={{
                          p: 2,
                          bgcolor: 'background.paper',
                          borderRadius: 2,
                          boxShadow: 1,
                          transition: 'background-color 0.3s ease-in-out',
                          '&:hover': {
                            bgcolor: 'action.hover',
                          },
                        }}
                      >
                        • {attraction}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* Rest of the sections with consistent spacing */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    borderBottom: '2px solid #f0f0f0',
                    pb: 1,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LocalHotel sx={{ mr: 1 }} />
                  Accommodation Options
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                  <Typography variant="body1" paragraph>
                    Budget: {beach.accommodation.budget}
                  </Typography>
                  <Typography variant="body1">
                    Luxury: {beach.accommodation.luxury}
                  </Typography>
                </Box>
              </Box>

              {/* Food Specialties */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    borderBottom: '2px solid #f0f0f0',
                    pb: 1,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LocalDining sx={{ mr: 1 }} />
                  Local Cuisine
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                  <Box component="ul" sx={{ pl: 3 }}>
                    {beach.foodSpecialties.map((food, index) => (
                      <Typography component="li" key={index} paragraph>
                        {food}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Travel Tips */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    borderBottom: '2px solid #f0f0f0',
                    pb: 1,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <DirectionsBoatFilled sx={{ mr: 1 }} />
                  Travel Tips
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                  <Box component="ul" sx={{ pl: 3 }}>
                    {beach.tips.map((tip, index) => (
                      <Typography component="li" key={index} paragraph>
                        {tip}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>

              <Typography variant="h5" gutterBottom sx={{ mt: 4, borderBottom: '2px solid #f0f0f0', pb: 1, mb: 2 }}>
                Best Time to Visit
              </Typography>
              <Typography variant="body1" paragraph>
                {beach.bestTimeToVisit}
              </Typography>

              <Typography variant="h5" gutterBottom sx={{ mt: 4, borderBottom: '2px solid #f0f0f0', pb: 1, mb: 2 }}>
                How to Reach
              </Typography>
              <Typography variant="body1" paragraph>
                {beach.howToReach}
              </Typography>

              {/* Nearby Places */}
              <Box sx={{ mt: 4 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    borderBottom: '2px solid #f0f0f0',
                    pb: 1,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <BeachAccess sx={{ mr: 1 }} />
                  Nearby Attractions
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
                  <Box component="ul" sx={{ pl: 3 }}>
                    {beach.nearbyPlaces.map((place, index) => (
                      <Typography component="li" key={index} paragraph>
                        {place}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Google Maps */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2, borderRadius: 2, height: '400px', position: 'sticky', top: '20px', backgroundColor: '#fff' }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD2g-C9ct5FYg8mQOZZn-h2IDCu47-p6kg&q=${beach.coordinates.lat},${beach.coordinates.lng}&zoom=15`}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
};

export default BeachDetails;