import React from "react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import SearchBar from "../Components/SearchBar";
import ServicesSection from "../Components/ServicesSection";
import Sidebar from "../Components/Sidebar";
import TourBooking from "../Components/TourBooking";
import Footer from "../Components/Footer";
import WelcomeSection from "../Components/WelcomeSection";
import Gallery from "../Components/Gallery";
import { Grid, Box } from "@mui/material";


const Home: React.FC = () => {
  return (
    <Box sx={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>
      {/* Header and Hero Section */}
      <Header />
      <HeroSection title="Discover India's Coastal Gems" subtitle="Your ultimate guide to beaches across the nation" />
      {/* Main Content with Sidebar on the Right */}
      <Grid container spacing={4} sx={{ px: 2 }}>
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
