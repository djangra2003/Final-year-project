import { Box, Grid, useTheme } from "@mui/material";
import { motion } from "framer-motion";
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
  const theme = useTheme();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <Box
      component={motion.div}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      sx={{ fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}
    >
      {/* Header and Hero Section */}
      <Header />
      <HeroSection title="Discover India's Coastal Gems" subtitle="Your ultimate guide to beaches across the nation" />

      {/* Main Content with Sidebar */}
      <Grid 
        component={motion.div}
        variants={itemVariants}
        container 
        spacing={{ xs: 2, md: 4 }} 
        sx={{ 
          px: { xs: 2, sm: 4 },
          flexDirection: { xs: 'column-reverse', md: 'row' },
          '& > *': {
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'translateY(-5px)'
            }
          }
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
      <Box component={motion.div} variants={itemVariants}>
        <Gallery />
      </Box>

      {/* Tour Booking */}
      <Box component={motion.div} variants={itemVariants}>
        <TourBooking />
      </Box>

      {/* Footer */}
      <Box component={motion.div} variants={itemVariants}>
        <Footer />
      </Box>

    </Box>
  );
};

export default Home;