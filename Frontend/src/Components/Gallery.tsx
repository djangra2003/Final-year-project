import { ChevronLeft, ChevronRight, Close, Pause, PlayArrow } from "@mui/icons-material";
import { Box, Fade, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import tidalImage from "../assets/games.png"; // Path to your image
import beachImage from "../assets/guides.png"; // Path to your image
import hotelImage from "../assets/hotel 1.png";
import valkara from "../assets/varkala.jpg";

const images = [
  { src: beachImage, caption: "Scenic Beach Views" },
  { src: tidalImage, caption: "Tidal Waves" },
  { src: hotelImage, caption: "Luxury Hotel" },
  { src: valkara, caption: "Scenic Beach Views" },
  { src: tidalImage, caption: "Tidal Waves" },
  { src: hotelImage, caption: "Luxury Hotel" },
];

const Gallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<null | { src: string; caption: string }>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery || !isPlaying) return;

    const interval = setInterval(() => {
      if (!gallery) return;
      gallery.scrollBy({
        left: 1,
        behavior: "smooth",
      });
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleScroll = (direction: "left" | "right") => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const scrollDistance = 300;
    const newScrollAmount =
      direction === "left"
        ? gallery.scrollLeft - scrollDistance
        : gallery.scrollLeft + scrollDistance;

    gallery.scrollTo({
      left: newScrollAmount,
      behavior: "smooth",
    });
  };

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
    return () => {
      document.removeEventListener("keydown", handleKeyDownEvent);
    };
  }, [currentIndex, selectedImage, images]);

  return (
    <div className="relative w-full overflow-hidden bg-white py-10">
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
          className="bg-blue-100 hover:bg-blue-200"
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-blue-100 hover:bg-blue-200"
        >
          {isPlaying ? <Pause /> : <PlayArrow />}
        </IconButton>
        <IconButton
          onClick={() => handleScroll("right")}
          className="bg-blue-100 hover:bg-blue-200"
        >
          <ChevronRight />
        </IconButton>
      </div>

      {/* Image Gallery */}
      <div
        ref={galleryRef}
        className="mt-6 flex w-full overflow-x-auto whitespace-nowrap scrollbar-hide"
      >
        <div className="flex w-max">
          {images.map((image, index) => (
            <div key={index} className="relative mx-1 md:mx-2 group">
              <img
                src={image.src}
                alt={image.caption}
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentIndex(index);
                }}
                className="h-48 md:h-64 w-auto rounded-lg shadow-lg transition-transform duration-300 cursor-pointer
                         group-hover:scale-105 group-hover:shadow-xl"
              />
              <div
                className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Typography variant="body2" className="text-center">
                  {image.caption}
                </Typography>
              </div>
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
          <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] relative">
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
                <Typography variant="h6" className="text-center mt-4">
                  {selectedImage.caption}
                </Typography>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default Gallery;
