import { AppBar, Box, Button, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
          }}
        >
          Beach Buddy
        </Typography>

        {/* Mobile Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ display: { sm: "none" } }}
          onClick={handleDrawerToggle}
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        {/* Navigation Links with Separators */}
        <Box
          sx={{
            display: { xs: mobileOpen ? "flex" : "none", sm: "flex" },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            backgroundColor: { xs: "rgba(0, 0, 0, 0.8)", sm: "transparent" },
            position: { xs: "absolute", sm: "static" },
            top: { xs: 64, sm: "auto" },
            left: 0,
            right: 0,
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 1 },
            backdropFilter: { xs: "blur(10px)", sm: "none" },
            zIndex: { xs: 9, sm: "auto" },
          }}
        >
          <Link to="/" onClick={handleDrawerToggle}>
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              Home
            </Button>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)", display: { xs: "none", sm: "block" } }}
          />
          <Link to="/beaches" onClick={handleDrawerToggle}>
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              Beaches
            </Button>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)", display: { xs: "none", sm: "block" } }}
          />
          <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
            Activities
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)", display: { xs: "none", sm: "block" } }}
          />
          <Link to="/about" onClick={handleDrawerToggle}>
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              About Us
            </Button>
          </Link>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: 1, borderColor: "rgba(255, 255, 255, 0.5)", display: { xs: "none", sm: "block" } }}
          />
          <Link to="/contact" onClick={handleDrawerToggle}>
            <Button color="inherit" sx={{ textTransform: "none", mx: 1 }}>
              Contact Us
            </Button>
          </Link>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2, flexShrink: 0 }}>
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