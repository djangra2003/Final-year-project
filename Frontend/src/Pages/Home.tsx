import { Box, Grid } from "@mui/material";
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
import Reviews from "../Components/Reviews"; // ✅ Import Reviews component

const Home: React.FC = () => {
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
          <WelcomeSection />
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

      {/* ✅ Reviews Section placed just before Footer */}
      <Box sx={{ mt: 6, mx: "auto", maxWidth: "1500px" }}>
        <Reviews />
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
