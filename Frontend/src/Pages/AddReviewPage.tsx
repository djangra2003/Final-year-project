import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/AddReviewPage.css"; // Import the CSS file

const AddReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  // ✅ Function to handle form submission & send data to backend
  const handleSubmit = async () => {
    if (!name || !location || !review || rating === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const reviewData = { name, location, review, rating };

    try {
      setLoading(true); // Show loading state

      const response = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      console.log("Review Submitted:", reviewData);
      alert("Thank you for your review!");

      setTimeout(() => {
        navigate("/"); // Redirect to Home page after 1 second
      }, 1000);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false); // Remove loading state
    }
  };

  return (
    <Box className="add-review-page">
      <Container maxWidth="sm">
        <Box className="review-box">
          <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3}>
            Add Your Review
          </Typography>

          <TextField 
            fullWidth 
            label="Your Name" 
            variant="outlined" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            sx={{ mb: 3 }} 
          />

          <TextField 
            fullWidth 
            label="Location" 
            variant="outlined" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            sx={{ mb: 3 }} 
          />

          <TextField 
            fullWidth 
            label="Your Review" 
            variant="outlined" 
            multiline 
            rows={4} 
            value={review} 
            onChange={(e) => setReview(e.target.value)} 
            sx={{ mb: 3 }} 
          />

          <Typography variant="body1" mb={1}>Rate Your Experience:</Typography>
          <Rating 
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            sx={{ mb: 3 }}
          />

          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit} 
            disabled={loading} // Disable button when loading
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AddReviewPage;
