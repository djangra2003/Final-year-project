import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import hero1 from "../assets/herosection1.jpg";
import hero2 from "../assets/herosection2.jpg";
import hero3 from "../assets/herosection3.jpg";
import hero4 from "../assets/herosection4.jpg";
import hero5 from  "../assets/herosection5.jpg";
import hero6 from  "../assets/herosection6.jpg";
import hero7 from  "../assets/herosection7.jpg";
import hero8 from  "../assets/herosection8.jpg";
import hero9 from  "../assets/herosection9.jpg";


interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  const images = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Automatically switch images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box
      component="section"
      position="relative"
      height="80vh"
      overflow="hidden"
      sx={{ width: "100%" }}
    >
      {/* Sliding Background Images */}
      <Box position="absolute" top={0} left={0} width="100%" height="100%">
        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrevImage}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            zIndex: 3,
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={handleNextImage}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.5)" },
            zIndex: 3,
          }}
        >
          <ChevronRight />
        </IconButton>

        {/* Dot Indicators */}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
            zIndex: 3,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={`dot-${index}`}
              onClick={() => setCurrentImageIndex(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: currentImageIndex === index ? "white" : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            />
          ))}
        </Box>

        {images.map((image, index) => (
          <Box
            key={index}
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            sx={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 1s ease-in-out",
              opacity: currentImageIndex === index ? 1 : 0,
            }}
          ></Box>
        ))}
      </Box>

      {/* Black Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        sx={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      ></Box>
      {/* Content */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        color="white"
        px={{ xs: 2, sm: 4 }}
        zIndex={2}
      >
        <Typography
          variant="h2"
          component="h1"
          fontWeight="bold"
          sx={{
            fontStyle: "italic",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.6)",
            fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          mt={2}
          sx={{
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
            fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;