import React from "react";
import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material";
import beachImage from "../assets/guides.png"; // Path to your image
import tidalImage from "../assets/games.png"; // Path to your image
import hotelImage from "../assets/hotel 1.png"; // Path to your image

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: "Guide to India's Beaches",
    description:
      "Discover India’s stunning beaches, from Goa’s lively shores to Kerala’s tranquil backwaters and Andaman’s pristine beauty. Enjoy thrilling water sports, relax under palm trees, or savor fresh seafood. Let the waves guide you to unforgettable coastal adventures!",
    image: beachImage,
  },
  {
    title: "Tidal Insights: Plan Ahead",
    description:
      "Understanding tides is key to a safe and enjoyable beach visit. Check tidal timings to plan your activities, whether it’s swimming, fishing, or exploring tidal pools. Stay informed and make the most of your coastal adventure!",
    image: tidalImage,
  },
  {
    title: "Hotel Bookings",
    description:
      "Find the perfect stay near your favorite beach! Explore a wide range of hotels, from cozy budget stays to luxurious beachfront resorts. Book hassle-free and enjoy a relaxing getaway by the sea.",
    image: hotelImage,
  },
];

const ServicesSection: React.FC = () => {
  return (
    <Box sx={{ p: 4 }}>
      {/* Container for Overlapping Text */}
      <Box sx={{ position: "relative", display: "inline-block", textAlign: "center" }}>
        {/* Main Title */}
        <Typography variant="h4" align="center" gutterBottom color="primary" sx={{ zIndex: 2 }}>
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
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
          gap: 4,
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
              height="200"
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
              }}
            >
              <Box>
                <Typography variant="h6" component="div" gutterBottom sx={{ mb: 1 }}>
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ flexGrow: 1, mb: 2, lineHeight: 1.5 , fontSize:15 }}
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
