import React, { useState } from "react";
import beachImage from "../assets/login.png";
import { Link } from "react-router-dom";
import {
  TextField,
  Button,
  Typography,
  Divider,
  Box,
  Paper,
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { validateEmail, validatePassword } from "../utils/utils";
import Header from "../Components/Header";

const SignupPage: React.FC = () => {
  // State to store form inputs and errors
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // // Email Validation
  // const validateEmail = (email: string) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  // // Password Validation: Min 6 characters
  // const validatePassword = (password: string) => {
  //   return password.length >= 6;
  // };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset errors dynamically
    setErrors({ ...errors, [name]: "" });
  };

  // Handle Form Submit
  const handleSubmit = () => {
    let newErrors = { email: "", password: "" };
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!validatePassword(formData.password)) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      alert("Sign-up successful!"); // Replace with backend API call
    }
  };

  return (
    <Box className="flex h-screen">
      <Header/>
      {/* Left Section: Image */}
      <Box
        className="w-1/2 bg-cover bg-center"
        sx={{
          backgroundImage: `url(${beachImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Right Section: Form */}
      <Box
        className="w-1/2 flex items-center justify-center bg-white"
        component={Paper}
        elevation={6}
      >
        <Box className="w-full max-w-md px-8 py-6">
          {/* Heading */}
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Welcome to Beach Buddy!
          </Typography>
          <Typography variant="body2" align="center" color="textSecondary" gutterBottom>
            Create your account
          </Typography>
          <Divider className="mb-4" />

          {/* Username Input */}
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            variant="outlined"
            placeholder="Enter your username"
            onChange={handleChange}
            value={formData.username}
            InputProps={{
              startAdornment: <i className="fas fa-user text-gray-400 mr-2" />,
            }}
          />

          {/* Email Input */}
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            variant="outlined"
            placeholder="Enter your email"
            onChange={handleChange}
            value={formData.email}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: <i className="fas fa-envelope text-gray-400 mr-2" />,
            }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            onChange={handleChange}
            placeholder="Enter your password"
            value={formData.password}
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              startAdornment: <i className="fas fa-lock text-gray-400 mr-2" />,
            }}
          />

          {/* Sign Up Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 ,  borderRadius: "50px"}}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>

          {/* OR Divider */}
          <Box display="flex" alignItems="center" my={2}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="textSecondary" mx={2}>
              Or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          {/* Google Sign-in */}
          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{ borderRadius: "50px"}}
            startIcon={<Google />}
          >
            Sign in with Google
          </Button>

          {/* Login Redirect */}
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            mt={3}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
