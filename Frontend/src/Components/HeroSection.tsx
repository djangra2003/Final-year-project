import { ChevronLeft, ChevronRight, Search } from "@mui/icons-material";
import { Autocomplete, Box, IconButton, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import beachesData from "../Pages/name.json";
import hero1 from "../assets/herosection1.jpg";
import hero2 from "../assets/herosection2.jpg";
import hero3 from "../assets/herosection3.jpg";
import hero4 from "../assets/herosection4.jpg";
import hero5 from "../assets/herosection5.jpg";
import hero6 from "../assets/herosection6.jpg";
import hero7 from "../assets/herosection7.jpg";
import hero8 from "../assets/herosection8.jpg";
import hero9 from "../assets/herosection9.jpg";


interface HeroSectionProps {
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle }) => {
  const navigate = useNavigate();
  const images = [hero1, hero2, hero3, hero4, hero5, hero6, hero7, hero8, hero9];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prepare beach data for search with location information
  const allBeaches = useMemo(() => {
    const beaches: { name: string; region: string; state: string }[] = [];
    Object.entries(beachesData).forEach(([region, states]) => {
      Object.entries(states).forEach(([state, beachList]) => {
        beachList.forEach((beach: string) => {
          beaches.push({
            name: beach,
            region: region.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
            state: state
          });
        });
      });
    });
    return beaches;
  }, []);

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
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 2,
          width: "100%",
          maxWidth: "600px",
          px: 2
        }}
      >
        <Typography variant="h2" fontWeight="bold" mb={2}>
          {title}
        </Typography>
        <Typography variant="h5" mb={4}>{subtitle}</Typography>
        
        <Autocomplete
          options={allBeaches}
          getOptionLabel={(option) => `${option.name} - ${option.state}, ${option.region}`}
          groupBy={(option) => option.region}
          filterOptions={(options, { inputValue }) => {
            const searchValue = inputValue.toLowerCase();
            return options.filter(
              (option) =>
                option.name.toLowerCase().includes(searchValue) ||
                option.state.toLowerCase().includes(searchValue) ||
                option.region.toLowerCase().includes(searchValue)
            );
          }}
          value={null}
          onChange={(_, newValue) => {
            if (newValue) {
              const beachId = newValue.name.replace(/\s+/g, "");
              navigate(`/beaches/${beachId}`);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for beaches by name or location..."
              variant="outlined"
              fullWidth
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                borderRadius: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main",
                  },
                },
              }}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <Search sx={{ color: "text.secondary", ml: 1, mr: 0.5 }} />
                ),
              }}
            />
          )}
          renderOption={(props, option) => (
            <Box component="li" {...props}>
              <Typography variant="body1">{option.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                {option.state}
              </Typography>
            </Box>
          )}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;