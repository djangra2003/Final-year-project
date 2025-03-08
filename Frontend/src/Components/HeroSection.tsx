import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import hero4 from "../assets/candolim.png";
import hero5 from "../assets/dhanushkodi.png";
import hero1 from "../assets/herosection1.png";
import hero2 from "../assets/herosection2.png";
import hero3 from "../assets/herosection3.png";

interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  const images = [hero1, hero2, hero3,hero4,hero5];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
