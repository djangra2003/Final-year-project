import { Visibility, VisibilityOff } from "@mui/icons-material";

import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import beachImage from "../assets/login.png";

import { validateEmail, validatePassword } from "../utils/utils";


const SignupPage: React.FC = () => {
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    // Reset errors dynamically
    setErrors({ ...errors, [name]: "" });
  };


  // Handle Form Submit
  const handleSubmit = async () => {
    try {

      const newErrors = { email: "", password: "" };

      if (!validateEmail(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }

      if (!validatePassword(formData.password)) {
        newErrors.password = "Password must be at least 8 characters.";
      }

      setErrors(newErrors);

      if (newErrors.email || newErrors.password) {
        return;
      }

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username,
          email: formData.email,
        })
      );

      // Navigate to home page
      navigate("/");

    } catch (error: any) {
      alert(error.message || "An error occurred during signup");
    }
  };


  // Handle Google Sign In
  const handleGoogleSignIn = async (credentialResponse: any) => {
    try {

      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Google signup failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Navigate to home page
      navigate("/");

    } catch (error: any) {
      alert(error.message || "An error occurred during Google signup");
    }
  };


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    
    <GoogleOAuthProvider clientId="312125406891-jr87qn3usq6p05kthp51mldg13fldhgv.apps.googleusercontent.com">

      <Box className="flex h-screen">
        
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
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              onChange={handleChange}
              placeholder="Enter your password"
              value={formData.password}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: <i className="fas fa-lock text-gray-400 mr-2" />,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />


            {/* Sign Up Button */}
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, borderRadius: "50px" }}
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
            <GoogleLogin
              onSuccess={handleGoogleSignIn}
              onError={() => console.error("Google Sign In Error")}
            />


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
      
    </GoogleOAuthProvider>
  );

};


export default SignupPage;
