import React from "react"; 
import { Card, CardContent, Typography, Avatar, Box, Container } from "@mui/material";
import { Star, StarBorder } from "@mui/icons-material"; // Importing icons for star ratings

const reviews = [
  { 
    id: 1, 
    name: "Amit Sharma", 
    location: "Goa, India", 
    review: "Beautiful beaches! Had an amazing experience.", 
    rating: 5, 
    avatar: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  { 
    id: 2, 
    name: "Priya Verma", 
    location: "Pondicherry, India", 
    review: "Absolutely loved the sunset views!", 
    rating: 4, 
    avatar: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  { 
    id: 3, 
    name: "Rahul Mehta", 
    location: "Andaman & Nicobar", 
    review: "Clean beaches and great weather. Highly recommended!", 
    rating: 5, 
    avatar: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  { 
    id: 4, 
    name: "Sneha Patel", 
    location: "Varkala, Kerala", 
    review: "The experience was breathtaking! Can't wait to visit again.", 
    rating: 4, 
    avatar: "https://randomuser.me/api/portraits/women/4.jpg"
  }
];

// Function to render star ratings
const renderStars = (rating: number) => {
  return (
    <Box display="flex" mt={1}>
      {Array.from({ length: 5 }).map((_, index) => (
        index < rating ? <Star key={index} className="text-yellow-500" /> : <StarBorder key={index} className="text-yellow-500" />
      ))}
    </Box>
  );
};

const Reviews: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden bg-gray-100 pt-4 pb-20"> 
      {/* Reduced padding-top (pt-4) and increased padding-bottom (pb-20) */}

      {/* Title Section */}
      <Box className="relative flex flex-col items-center justify-center h-32 text-center px-4">
        {/* Overlapping Background Text */}
        <Typography
          variant="h2"
          className="absolute text-4xl md:text-6xl font-bold text-gray-400 opacity-50 tracking-wider"
        >
          REVIEWS
        </Typography>

        {/* Main Title */}
        <Typography
          variant="h4"
          className="relative text-xl md:text-3xl font-semibold text-blue-600 z-10"
        >
          What Our Users Say
        </Typography>
      </Box>

      <Container maxWidth="lg">  
        {/* Reviews Container */}
        <Box className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {reviews.map((review) => (
            <Card 
              key={review.id}
              className="flex flex-col min-w-[320px] rounded-lg shadow-md bg-white"
            >
              {/* User Avatar, Name & Location with Dark Blue Background */}
              <Box className="bg-blue-900 text-white p-4 flex items-center rounded-t-lg">
                <Avatar src={review.avatar} alt={review.name} className="w-16 h-16 mr-3 border-2 border-white" />
                <div>
                  <Typography variant="h6" className="font-bold">{review.name}</Typography>
                  <Typography variant="body2" className="text-gray-300">{review.location}</Typography>
                </div>
              </Box>

              {/* Review Content */}
              <CardContent>
                <Typography variant="body2" className="text-gray-600">{review.review}</Typography>
                {/* Star Ratings */}
                {renderStars(review.rating)}
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Reviews;


