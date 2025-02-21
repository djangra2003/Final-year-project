import { Card, CardContent, CardMedia, Grid, Paper, Typography } from "@mui/material"
import type React from "react"
import varkala from "../assets/varkala.jpg"
import marina from "../assets/marina.png"
import radhanagar from "../assets/radhanagar.png"
import baga from "../assets/baga.png"
import varca from "../assets/varca.png"
import dhanushkodi from "../assets/dhanushkodi.png"
import candolim from "../assets/candolim.png"
import kovalam from "../assets/kovalam.png"
import palolem from "../assets/palolem.png"
import om from "../assets/om.png"

interface Beach {
  name: string
  location: string
  image: string
}

const beaches: Beach[] = [
  { name: "Varkala Beach", location: "Kerala", image: varkala },
  { name: "Marina Beach", location: "Tamil Nadu", image: marina },
  { name: "Radhanagar Beach", location: "Havelock Island", image: radhanagar },
  { name: "Baga Beach", location: "Goa", image: baga },
  { name: "Varca Beach", location: "South Goa", image: varca },
  { name: "Dhanushkodi Beach Point", location: "Tamil Nadu", image: dhanushkodi },
  { name: "Candolim Beach", location: "North Goa", image: candolim },
  { name: "Kovalam Beach", location: "Kerela", image: kovalam },
  { name: "Palolem Beach", location: "Goa", image: palolem },
  { name: "Om Beach", location: "Karnataka", image: om },
]

const Sidebar: React.FC = () => {
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
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default Sidebar
