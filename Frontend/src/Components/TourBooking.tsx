import React, { useState } from "react";
import { Box, Typography, TextField, Button, Grid, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const TourBooking: React.FC = () => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);

  const incrementAdults = () => setAdults((prev) => prev + 1);
  const decrementAdults = () => setAdults((prev) => (prev > 0 ? prev - 1 : 0));
  const incrementChildren = () => setChildren((prev) => prev + 1);
  const decrementChildren = () => setChildren((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: "url('/assets/search-flight.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 8,
        px: 4,
      }}
    >
      {/* Overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 8,
          textAlign: "center",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Left Text Section */}
        <Box sx={{ spaceY: 4 }}>
          <Typography variant="h3" fontWeight="bold" color="white">
            The Trip of Your Dream
          </Typography>
          <Typography variant="body1" color="white">
            Our travel agency offers personalized vacations, from exotic cruises
            to your favorite resorts, ensuring your best experience.
          </Typography>
        </Box>

        {/* Booking Form */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="textPrimary" mb={2}>
            FIND YOUR TOUR
          </Typography>
          <form>
            <Grid container spacing={2}>
              {/* Input Fields */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="To"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Depart Date"
                  variant="outlined"
                  type="date"
                  sx={{ mb: 2 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Duration"
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Children"
                  variant="outlined"
                  type="number"
                  value={children}
                  onChange={(e) => setChildren(Number(e.target.value))}
                  sx={{ mb: 2 }}
                />
              </Grid>

              {/* Adults Counter */}
              <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  Adults
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={decrementAdults}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ mx: 2 }}>
                    {adults}
                  </Typography>
                  <IconButton onClick={incrementAdults}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>

              {/* Children Counter */}
              <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  Children
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={decrementChildren}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ mx: 2 }}>
                    {children}
                  </Typography>
                  <IconButton onClick={incrementChildren}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  sx={{ mt: 2 , borderRadius:"50px" }}
                >
                  SEARCH FLIGHT
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default TourBooking;
