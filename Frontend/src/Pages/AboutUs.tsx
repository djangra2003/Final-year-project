import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import tidalImage from "../assets/games.png";
import beachImage from "../assets/guides.png";
import hotelImage from "../assets/hotel 1.png";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeroSection from "../Components/HeroSection";

const AboutUs: React.FC = () => {
  const theme = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.1) 100%)",
          pointerEvents: "none"
        }
      }}>
      <Header />
      <HeroSection
        title="About Us"
        subtitle="Learn more about us"
      />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ pt: 12, pb: 8 }}>
        {/* Welcome Section */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            mb: 8,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            p: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
          <Typography variant="h4" className="text-2xl font-bold mb-4" color="primary">
            Welcome to Beach Buddy
          </Typography>
          <Typography variant="body1" className="text-lg mb-4">
            Welcome to Beach Buddy, your ultimate guide to exploring the breathtaking beaches of India. Our platform is dedicated to providing you with up-to-date information on all the beautiful coastal destinations across the country. Whether you are looking for serene getaways, adventure-packed shores, or hidden gems, we have you covered.
          </Typography>
          <Typography variant="body1" className="text-lg mb-4">
            India's coastline is vast and diverse, offering a unique blend of culture, adventure, and relaxation. From the pristine shores of the Andaman and Nicobar Islands to the vibrant beaches of Goa, and from the tranquil backwaters of Kerala to the untouched beauty of Odisha's coastline, Beach Buddy brings you all the essential details to make your trip memorable.
          </Typography>
          <Typography variant="body1" className="text-lg mb-4">
            We aim to be more than just a travel guide. Our platform connects you with local experiences, must-visit attractions, and expert insights to help you explore the best beaches India has to offer. Whether you are a sun-seeker, a thrill-seeker, or someone looking to unwind by the waves, Beach Buddy is your perfect companion.
          </Typography>
        </Box>

        {/* Our Mission Section */}
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{
            mb: 8,
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: 2,
            p: 4,
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
          <Typography variant="h4" className="text-2xl font-bold mb-4" color="primary">
            Our Mission
          </Typography>
          <Box className="flex flex-col md:flex-row gap-8">
            <Box className="flex-1">
              <Typography variant="body1" className="text-lg mb-4">
                At Beach Buddy, our mission is to help travelers discover the unparalleled beauty of India's coastline. We strive to offer accurate insights, travel tips, and exclusive recommendations to ensure an unforgettable beach experience. Our goal is to inspire exploration and promote responsible tourism while preserving the natural charm and cultural heritage of India's coastal regions.
              </Typography>
              <Typography variant="body1" className="text-lg mb-4">
                We believe that every traveler deserves a seamless and enjoyable journey. That's why we are committed to curating reliable, user-friendly content and partnering with local experts to bring you the best travel experiences. Whether you're planning a peaceful retreat, an adventure-filled vacation, or an immersive cultural experience, our platform is here to guide you every step of the way.
              </Typography>
              <Typography variant="body1" className="text-lg">
                Additionally, we advocate for eco-friendly travel practices, encouraging sustainable tourism that protects marine ecosystems and supports local communities. By providing essential information and resources, we aim to foster a deeper appreciation for India's beaches and ensure they remain pristine for generations to come.
              </Typography>
            </Box>
            <Grid container spacing={2} className="flex-1">
              <Grid item xs={12} sm={6}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={beachImage} alt="Beach Sunset" className="w-full h-48 object-cover rounded-lg shadow-md" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={hotelImage} alt="Beach Waves" className="w-full h-48 object-cover rounded-lg shadow-md" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={tidalImage} alt="Palm Trees" className="w-full h-48 object-cover rounded-lg shadow-md" />
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={tidalImage} alt="Aerial Beach View" className="w-full h-48 object-cover rounded-lg shadow-md" />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* What We Offer Section */}
        <Box>
          <Typography variant="h4" className="text-2xl font-bold mb-4" color="primary">
            What We Offer
          </Typography>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            <li>
              <strong>Guide to India's Beaches:</strong> Detailed insights into every beach, including location, attractions, activities, and travel tips.
            </li>
            <li>
              <strong>Coastal Hidden Gems:</strong> Discover lesser-known, untouched beaches perfect for solitude and relaxation.
            </li>
            <li>
              <strong>Tidal Insights: Plan Ahead:</strong> Stay informed with tide schedules, weather updates, and best times to visit.
            </li>
            <li>
              <strong>Hotel Bookings:</strong> Find and book the best beach-side accommodations for a hassle-free vacation.
            </li>
          </ul>
          <Typography variant="body1" className="text-lg mt-6">
            Our team of travel enthusiasts and beach lovers is committed to curating the best experiences for you. Whether you are planning a solo retreat, a family vacation, or an adventure-filled trip, Beach Buddy is your trusted companion in exploring India's stunning beaches. Start your journey with us and let the waves guide you to unforgettable memories!
          </Typography>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default AboutUs;
