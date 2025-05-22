import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import tidalImage from "../assets/games.png";
import beachImage from "../assets/guides.png";
import hotelImage from "../assets/hotel 1.png";
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
    title: "Flight Bookings",
    description:
      "Find the perfect for your favorite beach! Explore a wide range of flight prices, from budget flights to business class. Book hassle-free and enjoy a relaxing getaway by the sea.",
    image: hotelImage,
  },
  {
    title: "Chat bot",
    description:
      "Meet our intelligent chatbot assistant, your personal guide to all things beach-related! Get instant answers about weather conditions, local attractions, safety tips, and more. Available 24/7 to help plan your perfect beach adventure with real-time information and friendly assistance!",
    image: tidal,
  },
];

const ServicesSection: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
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
        p: { xs: 2, sm: 4 },
        background: "linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
      }}
    >
      <Box sx={{ position: "relative", textAlign: "center", mb: { xs: 4, sm: 6 } }}>
        <Typography 
          variant="h4" 
          component={motion.h4}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            zIndex: 2,
            color: "#1a237e",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            fontWeight: "bold"
          }}
        >
          Discover The Wide Range Of Services We Offer
        </Typography>

        <Typography
          variant="h2"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            color: "rgba(25, 118, 210, 0.1)",
            fontWeight: 900,
            letterSpacing: 8,
            fontSize: { xs: '3rem', sm: '4rem', md: '5rem' }
          }}
        >
          SERVICES
        </Typography>
      </Box>

      <Box
        component={motion.div}
        variants={containerVariants}
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
            component={motion.div}
            variants={cardVariants}
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              borderRadius: 4,
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
              '&:hover': {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                '& .MuiCardMedia-root': {
                  transform: "scale(1.1)"
                }
              }
            }}
          >
            <CardMedia
              component="img"
              alt={service.title}
              height="200"
              image={service.image}
              sx={{
                transition: "transform 0.5s ease-in-out",
                objectFit: "cover"
              }}
            />
            <CardContent
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                p: { xs: 2, sm: 3 },
                background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)"
              }}
            >
              <Box>
                <Typography 
                  variant="h6" 
                  component="div" 
                  gutterBottom 
                  sx={{ 
                    mb: 1,
                    color: "#1a237e",
                    fontWeight: "bold"
                  }}
                >
                  {service.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ 
                    flexGrow: 1, 
                    mb: 2, 
                    lineHeight: 1.6,
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    color: "#37474f"
                  }}
                >
                  {service.description}
                </Typography>
              </Box>
              {/* <Button
                variant="contained"
                fullWidth
                sx={{
                  mt: "auto",
                  background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                  borderRadius: 2,
                  boxShadow: "0 3px 5px 2px rgba(26, 35, 126, .3)",
                  '&:hover': {
                    background: "linear-gradient(45deg, #283593 30%, #1a237e 90%)",
                    transform: "scale(1.02)"
                  }
                }}
                onClick={() => alert(`Learn more about ${service.title}`)}
              >
                Learn More
              </Button> */}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesSection;
