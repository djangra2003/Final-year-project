import React from "react";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import SearchBar from "../Components/SearchBar";
import ServicesSection from "../Components/ServicesSection";
import Sidebar from "../Components/Sidebar";
import TourBooking from "../Components/TourBooking";
import Footer from "../Components/Footer";
import WelcomeSection from "../Components/WelcomeSection";
import { Grid, Box } from "@mui/material";


const Home: React.FC = () => {
  return (
    <Box sx={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>
      {/* Header and Hero Section */}
      <Header />
      <HeroSection />
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

      {/* Tour Booking */}
      <TourBooking />
      {/* Gallery */}
      <Gallery />

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
