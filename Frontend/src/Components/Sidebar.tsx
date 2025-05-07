import { Box, Card, CardContent, CardMedia, Grid, Paper, Tooltip, Typography } from "@mui/material"
import type React from "react"
import { Link } from "react-router-dom"
import baga from "../assets/baga.png"
import candolim from "../assets/candolim.png"
import dhanushkodi from "../assets/dhanushkodi.png"
import kovalam from "../assets/kovalam.png"
import marina from "../assets/marina.png"
import om from "../assets/om.png"
import palolem from "../assets/palolem.png"
import radhanagar from "../assets/radhanagar.png"
import varca from "../assets/varca.png"
import varkala from "../assets/varkala.jpg"

interface Beach {
  name: string
  location: string
  image: string
  description?: string
  bestTimeToVisit?: string
}

const beaches: Beach[] = [
  { 
    name: "Marina Beach", 
    location: "Tamil Nadu", 
    image: marina,
    description: "One of the longest urban beaches in the world with a length of 13km.",
    bestTimeToVisit: "October to March"
  },
  { 
    name: "Radhanagar Beach", 
    location: "Havelock Island", 
    image: radhanagar,
    description: "Known for its pristine white sand and turquoise waters, often rated among Asia's best beaches.",
    bestTimeToVisit: "November to April"
  },
  { 
    name: "Baga Beach", 
    location: "Goa", 
    image: baga,
    description: "Famous for water sports and nightlife with numerous beach shacks and clubs.",
    bestTimeToVisit: "October to March"
  },
  { 
    name: "Varca Beach", 
    location: "South Goa", 
    image: varca,
    description: "A peaceful beach known for its white sand, clear waters, and dolphin spotting opportunities.",
    bestTimeToVisit: "November to February"
  },
  { 
    name: "Dhanushkodi Beach", 
    location: "Tamil Nadu", 
    image: dhanushkodi,
    description: "A ghost town with ruins from the 1964 cyclone, located at the tip of Pamban Island.",
    bestTimeToVisit: "October to March"
  },
  { 
    name: "Candolim Beach", 
    location: "North Goa", 
    image: candolim,
    description: "A relaxed beach with golden sand and various water sports activities.",
    bestTimeToVisit: "November to February"
  },
  { 
    name: "Kovalam Beach", 
    location: "Kerela", 
    image: kovalam,
    description: "Features three crescent-shaped beaches with shallow waters perfect for swimming.",
    bestTimeToVisit: "September to March"
  },
  { 
    name: "Palolem Beach", 
    location: "Goa", 
    image: palolem,
    description: "A crescent-shaped beach with calm waters, ideal for swimming and canoeing.",
    bestTimeToVisit: "October to March"
  },
  { 
    name: "Om Beach", 
    location: "Karnataka", 
    image: om,
    description: "Named for its OM shape, offers water sports and beautiful sunset views.",
    bestTimeToVisit: "October to March"
  },
  { 
    name: "Puri Beach", 
    location: "Odisha", 
    image: varkala,
    description: "A sacred beach known for its religious significance and annual sand art festival.",
    bestTimeToVisit: "October to February"
  }
]

const Sidebar: React.FC = () => {
  // Convert beach name to URL format (e.g., "Varkala Beach" to "VarkalaBeach")
  const convertToUrlFormat = (name: string) => {
    return name.replace(/\s+/g, "");
  };
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "grey.100",
        borderRadius: 2,
        boxShadow: 3,
        width: "100%",
        padding: 3,
      }}
    >
      {/* Title */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "600",
          color: "grey.800",
          mb: 3,
          fontSize: "2.125rem",
        }}
      >
        Explore India's Pristine Shores
      </Typography>

      {/* Beach Cards Grid */}
      <Grid container spacing={2}>
        {beaches.map((beach, index) => (
          <Grid item xs={6} key={index}>
            <Tooltip
              title={
                <div>
                  <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
                    <CardMedia
                      component="img"
                      image={beach.image}
                      alt={beach.name}
                      sx={{
                        width: 80,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                        mr: 1.5,
                      }}
                    />
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                        {beach.name}
                      </Typography>
                      <Typography variant="body2">{beach.description}</Typography>
                      <Typography variant="caption" sx={{ display: "block", mt: 1 }}>
                        <strong>Best time to visit:</strong> {beach.bestTimeToVisit}
                      </Typography>
                    </Box>
                  </Box>
                </div>
              }
              arrow
              placement="top"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                borderRadius: 1,
                p: 1.5,
                maxWidth: 350,
                '& .MuiTooltip-arrow': {
                  color: "rgba(255, 255, 255, 0.95)",
                },
              }}
            >
              <Link 
                to={`/beaches/${convertToUrlFormat(beach.name)}`}
                style={{ textDecoration: "none" }}
              >
              <Card
                sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                border: "1px solid",
                borderColor: "grey.200",
                borderRadius: 2,
                boxShadow: 1,
                transition: "box-shadow 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: 3,
                },
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                image={beach.image}
                alt={beach.name}
                sx={{
                  width: "100%",
                  height: "60%",
                  objectFit: "cover",
                }}
              />
              {/* Content */}
              <CardContent
                sx={{
                  padding: 1,
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: "600",
                    color: "grey.800",
                    fontSize: "0.875rem",
                    lineHeight: 1.2,
                    mb: 0.5,
                  }}
                >
                  {index + 1}. {beach.name}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "grey.500",
                    fontSize: "0.75rem",
                  }}
                >
                  {beach.location}
                </Typography>
              </CardContent>
            </Card>
            </Link>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Sidebar
