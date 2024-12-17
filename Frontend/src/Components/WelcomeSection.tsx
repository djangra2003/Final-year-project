import React from "react";
import { Box, Typography } from "@mui/material";

const WelcomeSection: React.FC = () => {
  return (
    <Box
      component="section"
      p={4}
      bgcolor="white"
      boxShadow={2}
      borderRadius={2}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        color="primary"
        mb={2}
      >
        WELCOME TO BEACH BUDDY
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
