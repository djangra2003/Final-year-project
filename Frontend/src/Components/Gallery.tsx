import { ChevronLeft, ChevronRight, Close, Pause, PlayArrow } from "@mui/icons-material";
import { Box, Fade, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import tidalImage from "../assets/games.png";
import beachImage from "../assets/guides.png";
import hero from "../assets/herosection1.jpg";
import hero1 from "../assets/herosection2.jpg";
import hero2 from "../assets/herosection3.jpg";
import hero3 from "../assets/herosection4.jpg";
import hotelImage from "../assets/hotel 1.png";
import hero4 from "../assets/marina.png";
import valkara from "../assets/varkala.jpg";

const images = [
  { src: beachImage, caption: "Scenic Beach Views" },
  { src: tidalImage, caption: "Tidal Waves" },
  { src: hotelImage, caption: "Luxury Hotel" },
  { src: valkara, caption: "Scenic Beach Views" },
  { src: hero, caption: "Good pic" },
  { src: hero1, caption: "Best Beach" },
  { src: hero2, caption: "" },
  { src: hero3, caption: "" },
  { src: hero4, caption: "" },
];

const Gallery = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<null | { src: string; caption: string }>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle auto-scroll
  useEffect(() => {
    if (!isPlaying) return;

    const scrollSpeed = 1; // pixels per frame
    const frameRate = 60; // frames per second
    const interval = 1000 / frameRate;

    const scroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      setScrollPosition(prev => {
        const newPosition = prev + scrollSpeed;
        if (newPosition >= maxScroll) {
          return 0;
        }
        return newPosition;
      });
    };

    const scrollInterval = setInterval(scroll, interval);
    return () => clearInterval(scrollInterval);
  }, [isPlaying]);

  // Apply scroll position
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const handleScroll = (direction: "left" | "right") => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    let newPosition = direction === "left"
      ? scrollPosition - scrollAmount
      : scrollPosition + scrollAmount;

    // Handle edge cases
    if (newPosition < 0) {
      newPosition = maxScroll;
    } else if (newPosition > maxScroll) {
      newPosition = 0;
    }

    setScrollPosition(newPosition);
    setIsPlaying(false);
  };

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDownEvent = (event: KeyboardEvent) => {
      if (selectedImage) {
        if (event.key === "ArrowRight") {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setSelectedImage(images[(currentIndex + 1) % images.length]);
        } else if (event.key === "ArrowLeft") {
          setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
          setSelectedImage(images[(currentIndex - 1 + images.length) % images.length]);
        }
      }
    };
    
    document.addEventListener("keydown", handleKeyDownEvent);
    return () => document.removeEventListener("keydown", handleKeyDownEvent);
  }, [currentIndex, selectedImage]);

  return (
    <div className="relative w-full overflow-hidden py-10 px-4 md:px-8 lg:px-12" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      borderRadius: '200px'
    }}>
      <Box className="relative flex flex-col items-center justify-center h-40 text-center px-4">
        {/* Overlapping Background Text */}
        <Typography
          variant="h2"
          className="absolute text-4xl md:text-6xl font-bold text-gray-400 opacity-50 tracking-wider"
        >
          GALLERY
        </Typography>

        {/* Main Title */}
        <Typography
          variant="h4"
          className="relative text-xl md:text-3xl font-semibold text-blue-600 z-10"
        >
          Tides of Beauty: Photo Collection
        </Typography>
      </Box>

      {/* Controls */}
      <div className="flex justify-center gap-2 md:gap-4 mb-4">
        <IconButton
          onClick={() => handleScroll("left")}
          className="hover:bg-blue-50 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.1)'
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={() => setIsPlaying(!isPlaying)}
          className="hover:bg-blue-50 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.1)'
          }}
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton
          onClick={() => handleScroll("right")}
          className="hover:bg-blue-50 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.1)'
          }}
        >
          <ChevronRight />
        </IconButton>
      </div>

      {/* Image Gallery */}
      <div
        ref={containerRef}
        className="mt-6 relative w-full overflow-hidden"
        style={{ 
          height: "400px",
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch"
        }}
      >
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative mx-3 flex-shrink-0"
              style={{
                transition: "transform 0.3s ease-out",
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <img
                src={image.src}
                alt={image.caption}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentIndex(index);
                }}
                className="h-80 w-auto rounded-lg shadow-lg cursor-pointer object-cover transition-all duration-300 hover:shadow-xl"
                loading="lazy"
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Typography variant="body2" className="text-center">
                    {image.caption}
                  </Typography>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged image view */}
      <Modal
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        closeAfterTransition
        className="flex items-center justify-center"
      >
        <Fade in={!!selectedImage}>
          <div className="p-4 rounded-lg max-w-4xl max-h-[90vh] relative" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
          }}>
            <IconButton
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-white"
            >
              <Close />
            </IconButton>
            {selectedImage && (
              <>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  className="max-h-[80vh] w-auto object-contain"
                />
                {selectedImage.caption && (
                  <Typography variant="h6" className="text-center mt-4">
                    {selectedImage.caption}
                  </Typography>
                )}
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Gallery;
