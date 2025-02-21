import { AppBar, Box, Button, Divider, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <AppBar
      position="absolute"
      sx={{
        background: "transparent",
        boxShadow: "none",
        top: 0,
        zIndex: 10,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: "white",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            display: { xs: "none", sm: "block" }, // Hide on small screens
          }}
        >
          Beach Buddy
        </Typography>

        {/* Navigation Links with Separators */}
        <Box
          sx={{
            display: { xs: "none", sm: "flex" }, // Hide on small screens
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "50px",
            px: { xs: 2, sm: 3 },
            py: 1,
            backdropFilter: "blur(10px)",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Link to="/">
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              Home
            </Button>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)" }}
          />
          <Link to="/beaches">
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              Beaches
            </Button>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)" }}
          />
          <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
            Activities
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)" }}
          />
          <Link to="/about">
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              About Us
            </Button>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)" }}
          />
          <Link to="/contact">
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              Contact Us
            </Button>
          </Link>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, flexShrink: 0 }}>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "50px",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              Sign Up
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              sx={{
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "50px",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              Login
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
