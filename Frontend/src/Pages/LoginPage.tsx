import { AccountCircle, Lock } from "@mui/icons-material";
import { Box, Button, Divider, TextField, Typography, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flight from "../assets/login.png";
import { validatePassword } from "../utils/utils";

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    const isUsernameValid = formData.username.trim() !== "";
    const isPasswordValid = validatePassword(formData.password);
    setIsFormValid(isUsernameValid && isPasswordValid);
  }, [formData.username, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (formData.username.trim() === "" || !validatePassword(formData.password)) {
        alert("Please fill out all fields correctly.");
        return;
      }

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);
      
      // Navigate to home page
      navigate("/");
    } catch (error: any) {
      alert(error.message || 'An error occurred during login');
    }
  };

  // Handle key press event for Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isFormValid) {
      handleSubmit();
    }
  };

  return (
    <Box className="flex h-screen">
      <Grid container>
        {/* Left Section: Image */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              backgroundImage: `url(${flight})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Box>
        </Grid>

        {/* Right Section: Login Form */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              px: { xs: 2, sm: 4 },
            }}
          >
            <Box 
              sx={{ width: "100%", maxWidth: 400 }}
              onKeyPress={handleKeyPress}  // Add key press event handler to the form container
            >
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
                  value={formData.username}
                  onChange={handleChange}
                  error={!!formData.username && formData.username.trim() === ""}
                  helperText={
                    !!formData.username && formData.username.trim() === ""
                      ? "Username is required"
                      : ""
                  }
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
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formData.password && !validatePassword(formData.password)}
                  helperText={
                    !!formData.password && !validatePassword(formData.password)
                      ? "Password must be 8 characters"
                      : ""
                  }
                  InputProps={{
                    startAdornment: <Lock sx={{ color: "gray", mr: 1 }} />,
                  }}
                />
              </Box>

              {/* Forgot Password */}
              <Box textAlign="right" mb={3}>
                <Button
                  onClick={() => navigate("/forgot-password")}
                  sx={{ textTransform: "none" }}
                  color="primary"
                >
                  Forgot Password?
                </Button>
              </Box>

              {/* Login Button */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={!isFormValid}
                sx={{ py: 1.5, borderRadius: "50px", mb: 3 }}
              >
                Login
              </Button>

              {/* Sign Up Prompt */}
              <Typography variant="body2" color="textSecondary" textAlign="center">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;