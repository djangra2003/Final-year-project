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
  Discover the beauty of India’s pristine coastlines with Beach Buddy. Whether you're planning a relaxing getaway or an adventure by the sea, we’ve got you covered.
Track live tide updates, explore beaches with integrated Google Maps, and uncover hidden gems along the shores.
Plan your next beach escape effortlessly and experience the perfect blend of serenity and adventure. With Beach Buddy, the waves are always calling.
      </Typography>
    </Box>
  );
};

export default WelcomeSection;