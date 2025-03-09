import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Footer from "../Components/Footer";
import Gallery from "../Components/Gallery";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import SearchBar from "../Components/SearchBar";
import ServicesSection from "../Components/ServicesSection";
import Sidebar from "../Components/Sidebar";
import TourBooking from "../Components/TourBooking";
import WelcomeSection from "../Components/WelcomeSection";

const Home: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Fetch user data from local storage

  return (
    <Box sx={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>
      {/* Header and Hero Section */}
      <Header />
      <HeroSection title="Discover India's Coastal Gems" subtitle="Your ultimate guide to beaches across the nation" />

      {/* Main Content with Sidebar */}
      <Grid 
        container 
        spacing={{ xs: 2, md: 4 }} 
        sx={{ 
          px: { xs: 2, sm: 4 },
          flexDirection: { xs: 'column-reverse', md: 'row' } 
        }}
      >
        <Grid item xs={12} md={8}>
          {/* Welcome Section */}
          <WelcomeSection />
          {/* SearchBar */}
          <SearchBar />
          <ServicesSection />
        </Grid>
        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
      </Grid>

      {/* Gallery */}
      <Gallery />

      {/* Tour Booking */}
      <TourBooking />

      {/* Footer */}
      <Footer />

    </Box>
  );
};

export default Home;