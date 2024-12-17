import React from "react";
import { Typography, Card, CardMedia, CardContent, Paper, Grid } from "@mui/material";
import beachImage from "../assets/guides.png"; // Path to your image
import tidalImage from "../assets/games.png"; // Path to your image
import hotelImage from "../assets/hotel 1.png"; // Path to your image


interface Beach {
  name: string;
  location: string;
  image: string;
}

const beaches: Beach[] = [
  { name: "Varkala Beach", location: "Kerala", image: beachImage },
  { name: "Marina Beach", location: "Tamil Nadu", image:tidalImage  },
  { name: "Baga Beach", location: "Goa", image:hotelImage  },
  { name: "Radhanagar Beach", location: "Andaman", image:beachImage  },
  { name: "Varca Beach", location: "Goa", image: tidalImage },
  { name: "Varca Beach", location: "Goa", image: hotelImage },

];

const Sidebar: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "grey.100",
        borderRadius: 2,
        boxShadow: 3,
        maxWidth: "24rem",
        margin: "auto", // Center the paper
        padding: 2, // Minimal padding
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        align="center"
        fontWeight="600"
        color="grey.700"
        mb={2}
        textTransform="uppercase"
      >
        Explore India's Pristine Shores
      </Typography>

      {/* Beach Cards Grid */}
      <Grid container spacing={2} justifyContent="center">
        {beaches.map((beach, index) => (
          <Grid item xs={6} key={index} display="flex" justifyContent="center">
            <Card
              sx={{
                width: "160px", // Fixed square size
                height: "200px",
                border: "1px solid",
                borderColor: "grey.300",
                borderRadius: 2,
                boxShadow: 1,
                transition: "transform 0.2s ease-in-out, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                image={beach.image}
                alt={beach.name}
                sx={{
                  width: "100%",
                  height: "70%",
                  objectFit: "cover",
                }}
              />
              {/* Content */}
              <CardContent
                sx={{
                  padding: "4px",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  fontWeight="600"
                  color="grey.800"
                  lineHeight="1.2"
                >
                  {beach.name}
                </Typography>
                <Typography variant="caption" color="grey.500">
                  {beach.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Sidebar;
