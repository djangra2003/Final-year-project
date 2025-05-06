import { Box, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

const WelcomeSection: React.FC = () => {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  useEffect(() => {
    // Add any additional initialization logic here
  }, []);
  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      p={4}
      bgcolor="white"
      boxShadow={2}
      borderRadius={2}
      sx={{
        '&:hover': {
          transform: 'scale(1.01)',
          transition: 'transform 0.3s ease-in-out',
          boxShadow: 4,
        },
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        {`Welcome${user.name ? `, ${user.name}` : ''} to Beach Buddy`}
      </Typography>

      {/* Description Paragraph 1 */}
      <Typography
        variant="body1"
        color="text.secondary"
        lineHeight={1.8}
        textAlign="left"
      >
  Your ultimate guide to exploring India’s beautiful and diverse coastlines. Whether you’re planning a peaceful beach retreat, a thrilling day of water sports, or a spontaneous weekend by the sea, Beach Buddy is here to make your coastal travel smooth and exciting. Discover the best beaches in India, from popular destinations to hidden gems that offer peace, beauty, and unforgettable views. With detailed beach guides, local travel tips, and curated experiences, we help you find the perfect coastal escape tailored to your style.
  <br/>
  Beach Buddy goes beyond just beach recommendations. Get live tide updates, accurate weather forecasts, and easy navigation with our integrated Google Maps feature. Whether you're searching for family-friendly beaches, romantic sunset spots, or offbeat coastal adventures, we’ve got everything you need. Find the best time to visit, explore beach activities, and discover eco-friendly tips to travel responsibly.
  <br/>
  Plan your stay with recommended hotels and explore top-rated food spots near the shoreline. Beach Buddy is more than just a travel guide—it’s your one-stop platform for everything beach-related in India. Join our growing community of beach lovers and make every wave count. The coast is calling—let’s go!
      </Typography>
    </Box>
  );
};

export default WelcomeSection;