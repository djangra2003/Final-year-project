import { Box, Grid, useTheme } from "@mui/material";
import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";
import Footer from "../Components/Footer";
import Gallery from "../Components/Gallery";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";
import Reviews from "../Components/Reviews";
import SearchBar from "../Components/SearchBar";
import ServicesSection from "../Components/ServicesSection";
import Sidebar from "../Components/Sidebar";
import TourBooking from "../Components/TourBooking";
import WelcomeSection from "../Components/WelcomeSection";
import { fadeUpVariants, scaleVariants, slideInVariants, staggerContainerVariants } from "../utils/animations";

const Home: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}'); // Fetch user data from local storage
  const theme = useTheme();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <Box
      component={motion.div}
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      sx={{
        fontFamily: "sans-serif",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        padding: 0,
        '&::before': {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
          pointerEvents: "none"
        },
        '& > *': {
          marginBottom: 0
        },
        '& > div': {
          borderRadius: 0,
          boxShadow: 'none'
        }
      }}
    >
      {/* Header and Hero Section */}
      <Header />
      <HeroSection title="Discover India's Coastal Gems" subtitle="Your ultimate guide to beaches across the nation" />

      {/* Main Content with Sidebar */}
      <Grid 
        component={motion.div}
        variants={fadeUpVariants}
        whileHover="hover"
        whileTap="tap"
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
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: 4,
          boxShadow: 'none',
          mb: 0
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
        variants={scaleVariants}
        whileHover="hover"
        whileTap="tap"
        sx={{
          mt: 0,
          pt: 4,
          pb: 2,
          mx: 'auto',
          maxWidth: '1500px',
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          borderRadius: 0,
          boxShadow: 'none',
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
        variants={slideInVariants}
        sx={{
          mt: 0,
          pt: 2,
          pb: 2,
          mx: 'auto',
          maxWidth: '1500px',
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          borderRadius: 0,
          boxShadow: 'none',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)'
          }
        }}
      >
        <TourBooking />
      </Box>

      {/* ✅ Reviews Section placed just before Footer */}
      <Box 
        component={motion.div}
        variants={scaleVariants}
        whileHover="hover"
        whileTap="tap"
        sx={{ 
          mt: 0, 
          pt: 2,
          pb: 4,
          mx: "auto", 
          maxWidth: "1500px",
          background: 'transparent',
          backdropFilter: 'blur(10px)',
          borderRadius: 0,
          boxShadow: 'none',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)'
          }
        }}
      >
        <Reviews />
      </Box>

      {/* Progress Bar */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          background: "linear-gradient(to right, #4fc3f7, #2196f3)",
          transformOrigin: "0%",
          scaleX,
          zIndex: 1000
        }}
      />

      {/* Footer */}
      <Box 
        component={motion.div} 
        variants={fadeUpVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default Home;
