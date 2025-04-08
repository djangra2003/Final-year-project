import { Box, Grid, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import Footer from "../Components/Footer";
import Gallery from "../Components/Gallery";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import Reviews from "../Components/Reviews"; // ✅ Import Reviews component
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
      sx={{
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        position: "relative",
        overflow: "hidden",
        '&::before': {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none"
        }
      }}
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
          py: 4,
          flexDirection: { xs: 'column-reverse', md: 'row' },
          '& > *': {
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
              filter: 'brightness(1.1)'
            }
          },
          position: 'relative',
          zIndex: 1,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
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
      <Box 
        component={motion.div} 
        variants={itemVariants}
        sx={{
          mt: 6,
          mx: 'auto',
          maxWidth: '1500px',
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.01)'
          }
        }}
      >
        <Gallery />
      </Box>

      {/* Tour Booking */}
      <Box 
        component={motion.div} 
        variants={itemVariants}
        sx={{
          mt: 6,
          mx: 'auto',
          maxWidth: '1500px',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <TourBooking />
      </Box>

      {/* ✅ Reviews Section placed just before Footer */}
      <Box 
        component={motion.div}
        variants={itemVariants}
        sx={{ 
          mt: 6, 
          mx: "auto", 
          maxWidth: "1500px",
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)'
          }
        }}
      >
        <Reviews />
      </Box>

      {/* Footer */}
      <Box component={motion.div} variants={itemVariants}>
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
