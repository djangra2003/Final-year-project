import { useEffect, useRef } from "react";
import beachImage from "../assets/guides.png"; // Path to your image
import tidalImage from "../assets/games.png"; // Path to your image
import hotelImage from "../assets/hotel 1.png";
import { Box, Typography } from "@mui/material";

const images = [beachImage, tidalImage, hotelImage];

const Gallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let scrollAmount = 0;
    const scrollSpeed = 1;

    const interval = setInterval(() => {
      if (!gallery) return;
      scrollAmount += scrollSpeed;
      if (scrollAmount >= gallery.scrollWidth / 2) {
        scrollAmount = 0;
      }
      gallery.scrollLeft = scrollAmount;
    }, 30); // Adjust timing for smooth scrolling

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white py-10">
      {/* Centered Heading */}
      <Box className="relative flex flex-col items-center justify-center h-40 text-center">
        {/* Overlapping Background Text */}
        <Typography
          variant="h2"
          className="absolute text-6xl font-bold text-gray-400 opacity-50 tracking-wider"
        >
          GALLERY
        </Typography>

        {/* Main Title */}
        <Typography
          variant="h4"
          className="relative text-3xl font-semibold text-blue-600 z-10"
        >
          Tides of Beauty: Photo Collection
        </Typography>
      </Box>

      {/* Image Gallery */}
      <div ref={galleryRef} className="mt-6 flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex w-max">
          {images.concat(images).map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Beach ${index + 1}`}
              className="mx-2 h-64 w-auto rounded-lg shadow-lg"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
