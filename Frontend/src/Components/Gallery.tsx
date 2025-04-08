import { ChevronLeft, ChevronRight, Close, Pause, PlayArrow } from "@mui/icons-material";
import { Box, Fade, IconButton, Modal, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
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
  { src: hero1, caption: "" },
  { src: hero2, caption: "" },
  { src: hero3, caption: "" },
  { src: hero4, caption: "" },
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
      const maxScroll = gallery.scrollWidth - gallery.clientWidth;
      
      if (gallery.scrollLeft >= maxScroll) {
        gallery.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        gallery.scrollBy({
          left: 2,
          behavior: "smooth",
        });
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleScroll = (direction: "left" | "right") => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const scrollDistance = 300;
    const maxScroll = gallery.scrollWidth - gallery.clientWidth;
    let newScrollAmount = direction === "left"
      ? gallery.scrollLeft - scrollDistance
      : gallery.scrollLeft + scrollDistance;

    // Handle edge cases
    if (newScrollAmount < 0) {
      newScrollAmount = maxScroll;
    } else if (newScrollAmount > maxScroll) {
      newScrollAmount = 0;
    }

    gallery.scrollTo({
      left: newScrollAmount,
      behavior: "smooth",
    });

    // Pause auto-scroll when manual navigation is used
    setIsPlaying(false);
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
    <div className="relative w-full overflow-hidden bg-white py-10 px-4 md:px-8 lg:px-12">
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
      <motion.div
        ref={galleryRef}
        className="mt-6 relative w-full overflow-hidden"
        style={{ height: "400px" }}
      >
        <motion.div
          className="flex absolute"
          animate={{
            x: isPlaying ? ["-100%", "0%"] : undefined,
          }}
          transition={{
            x: {
              repeat: isPlaying ? Infinity : 0,
              duration: 20,
              ease: "linear",
            },
          }}
          style={{ paddingLeft: "100%" }}
        >
          <AnimatePresence>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative mx-3 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  onClick={() => {
                    setSelectedImage(image);
                    setCurrentIndex(index);
                  }}
                  className="h-80 w-auto rounded-lg shadow-lg cursor-pointer object-cover"
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <Typography variant="body2" className="text-center">
                    {image.caption}
                  </Typography>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

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
