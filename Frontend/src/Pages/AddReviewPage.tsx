import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Rating, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/AddReviewPage.css";

const beachesInIndia = [
  "Radhanagar Beach", "Elephant Beach", "Wandoor Beach", "Kala Patthar Beach", "Agonda Beach", "Anjuna Beach",
  "Arambol Beach", "Baga Beach", "Calangute Beach", "Candolim Beach", "Colva Beach", "Palolem Beach", "Vagator Beach",
  "Gokarna Beach", "Kudle Beach", "Om Beach", "Murudeshwar Beach", "Malpe Beach", "Maravanthe Beach", "Kapu Beach",
  "Kovalam Beach", "Varkala Beach", "Alappuzha Beach", "Marari Beach", "Cherai Beach", "Bekal Beach", "Muzhappilangad Drive-in Beach",
  "Juhu Beach", "Girgaum Chowpatty", "Aksa Beach", "Versova Beach", "Kashid Beach", "Ganpatipule Beach", "Alibaug Beach",
  "Marina Beach", "Elliot's Beach", "Covelong Beach", "Kanyakumari Beach", "Silver Beach", "Poompuhar Beach", "Dhanushkodi Beach",
  "Puri Beach", "Chandipur Beach", "Gopalpur Beach", "Chandrabhaga Beach", "Paradeep Beach", "Digha Beach", "Mandarmani Beach",
  "Shankarpur Beach", "Tajpur Beach", "Bakkhali Beach", "Ramakrishna Beach", "Rishikonda Beach", "Bheemunipatnam Beach", "Mypadu Beach", "Suryalanka Beach",
  "Promenade Beach", "Paradise Beach", "Auroville Beach", "Serenity Beach", "Mandvi Beach", "Chorwad Beach", "Gopnath Beach", "Tithal Beach",
  "Nagoa Beach", "Jallandhar Beach", "Ghoghla Beach"
];

const AddReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState<number | null>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!/^[A-Za-z ]+$/.test(name)) {
      alert("Name should only contain alphabets.");
      return;
    }
    if (!review || rating === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const reviewData = { name, location, review, rating };

    try {
      setLoading(true);
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

      alert("Thank you for your review!");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
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

          <Autocomplete
            fullWidth
            options={beachesInIndia}
            freeSolo
            value={location}
            onInputChange={(_, newValue) => setLocation(newValue)}
            renderInput={(params) => <TextField {...params} label="Location" variant="outlined" sx={{ mb: 3 }} />}
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
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AddReviewPage;
