import React from "react";
import { TextField, Button, Typography, Box, Divider, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import flight from "../assets/login.png";
import { AccountCircle, Lock } from "@mui/icons-material";
import Header from "../Components/Header";

const LoginPage: React.FC = () => {
  return (
    <Box className="flex h-screen">
      <Header />
      {/* Left Section: Image */}
      <Box
        sx={{
          width: "50%",
          backgroundImage: `url(${flight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Right Section: Login Form */}
      <Box
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400, px: 3 }}>
          {/* Heading */}
          <Typography variant="h4" fontWeight="bold" textAlign="center" color="gray" mb={1}>
            Welcome Back!
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center" mb={4}>
            Enter your credentials to login
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Username Input */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="username"
              label="Username"
              placeholder="Enter your username"
              variant="outlined"
              InputProps={{
                startAdornment: <AccountCircle sx={{ color: "gray", mr: 1 }} />,
              }}
            />
          </Box>

          {/* Password Input */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
              variant="outlined"
              InputProps={{
                startAdornment: <Lock sx={{ color: "gray", mr: 1 }} />,
              }}
            />
          </Box>

          {/* Forgot Password */}
          <Box textAlign="right" mb={3}>
            <MuiLink href="#" variant="body2" color="textSecondary" underline="hover">
              Forgot Password?
            </MuiLink>
          </Box>

          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ py: 1.5, borderRadius: "50px", mb: 3 }}
          >
            Login
          </Button>

          {/* Sign Up Prompt */}
          <Typography variant="body2" color="textSecondary" textAlign="center">
            Don’t have an account?{" "}
            <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
