import { Box, Button, Grid, MenuItem, Select, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import beachesData from './name.json';
import HeroSection from '../Components/HeroSection';

interface Hotel {
  name: string;
  price: number;
  rating: number;
  address: string;
}

const HotelBookingPage: React.FC = () => {
  const [selectedBeach, setSelectedBeach] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([500, 5000]);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  const handleSearch = () => {
    // Mock data for demonstration
    const mockHotels: Hotel[] = [
      { name: 'Beachside Resort', price: 2500, rating: 4.5, address: '123 Beach Road' },
      { name: 'Ocean View Hotel', price: 3500, rating: 4.2, address: '456 Ocean Drive' },
      { name: 'Seaside Inn', price: 1500, rating: 3.8, address: '789 Coastal Avenue' },
    ];
    setHotels(mockHotels);
  };

  return (
    <>
      <Header />
      <HeroSection title="Book Hotels" subtitle="Search you hotels" />
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Book Hotels
        </Typography>
        <Box sx={{ mb: 4 }}>
          <Select
            fullWidth
            value={selectedBeach}
            onChange={(e) => setSelectedBeach(e.target.value as string)}
            displayEmpty
            sx={{ mb: 2 }}
          >
            <MenuItem value="">Select a Beach</MenuItem>
            {Object.entries(beachesData).map(([region, states]) => 
              Object.entries(states).map(([state, beaches]) => 
                beaches.map((beach: string) => (
                  <MenuItem key={beach} value={beach}>
                    {beach}
                  </MenuItem>
                ))
              )
            )}
          </Select>
          <Typography gutterBottom>Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={(_, newValue) => setPriceRange(newValue as number[])}
            valueLabelDisplay="auto"
            min={500}
            max={5000}
            step={100}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleSearch} fullWidth>
            Search Hotels
          </Button>
        </Box>
        <Grid container spacing={3}>
          {hotels.map((hotel) => (
            <Grid item xs={12} md={6} key={hotel.name}>
              <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: 2 }}>
                <Typography variant="h6">{hotel.name}</Typography>
                <Typography variant="body1">{hotel.address}</Typography>
                <Typography variant="body2">Price: ₹{hotel.price}</Typography>
                <Typography variant="body2">Rating: {hotel.rating}/5</Typography>
                <Button variant="contained" sx={{ mt: 1 }}>
                  Book Now
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default HotelBookingPage;