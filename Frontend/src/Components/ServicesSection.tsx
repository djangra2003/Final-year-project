import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import tidalImage from "../assets/games.png"; // Path to your image
import beachImage from "../assets/guides.png"; // Path to your image
import hotelImage from "../assets/hotel 1.png"; // Path to your image
import tidal from "../assets/tidal.png";

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: "Guide to India's Beaches",
    description:
      "Discover India's stunning beaches, from Goa's lively shores to Kerala's tranquil backwaters and Andaman's pristine beauty. Enjoy thrilling water sports, relax under palm trees, or savor fresh seafood. Let the waves guide you to unforgettable coastal adventures!",
    image: beachImage,
  },
  {
    title: "Tidal Insights: Plan Ahead",
    description:
      "Understanding tides is key to a safe and enjoyable beach visit. Check tidal timings to plan your activities, whether it's swimming, fishing, or exploring tidal pools. Stay informed and make the most of your coastal adventure!",
    image: tidalImage,
  },
  {
    title: "Hotel Bookings",
    description:
      "Find the perfect stay near your favorite beach! Explore a wide range of hotels, from cozy budget stays to luxurious beachfront resorts. Book hassle-free and enjoy a relaxing getaway by the sea.",
    image: hotelImage,
  },
  {
    title: "Tidal Insights",
    description:
      "Understanding tides is key to a safe and enjoyable beach visit. Check tidal timings to plan activities like swimming, fishing, or exploring tidal pools. Avoid venturing too far during high tide, and observe patterns for safety. With the right timing, every beach visit becomes memorable!",
    image: tidal,
  },
];

const ServicesSection: React.FC = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      {/* Container for Overlapping Text */}
      <Box sx={{ position: "relative", textAlign: "center", mb: { xs: 4, sm: 6 } }}>
        {/* Main Title */}
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom 
          color="primary" 
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            zIndex: 2 
          }}
        >
          Discover The Wide Range Of Services We Offer
        </Typography>

        {/* Overlapping SERVICES Text */}
        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: "50%", // Position vertically in the middle
            left: "50%",
            transform: "translate(-50%, -50%)", // Center horizontally and vertically
            zIndex: 1,
            color: "grey",
            opacity: 0.5, // Adjust opacity for overlap effect
            fontWeight: "bold",
            letterSpacing: 4,
          }}
        >
          SERVICES
        </Typography>
      </Box>

      {/* Service Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)"
          },
          gap: { xs: 2, sm: 3, md: 4 },
          mt: 4,
        }}
      >
        {services.map((service, index) => (
          <Card
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%", // Ensures the cards are all of equal height
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            {/* Image */}
            <CardMedia
              component="img"
              alt={service.title}
              height="150" // Reduced height for smaller boxes
              image={service.image}
              sx={{
                objectFit: "cover",
              }}
            />
            {/* Content */}
            <CardContent
              sx={{
                flexGrow: 1, // Ensures the content expands evenly
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: { xs: 2, sm: 3 }, // Reduced padding for smaller boxes
              }}
            >
              <Box>
                <Typography variant="h6" component="div" gutterBottom sx={{ mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1, mb: 2, lineHeight: 1.5, fontSize: { xs: "0.875rem", sm: "1rem", md: "1.25rem" } }} // Reduced font size
                >
                  {service.description}
                </Typography>
              </Box>
              {/* Learn More Button */}
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ mt: "auto" }} // Push the button to the bottom
                onClick={() => alert(`Learn more about ${service.title}`)}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesSection;
