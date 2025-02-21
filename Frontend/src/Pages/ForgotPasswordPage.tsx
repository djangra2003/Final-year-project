import { AccountCircle, Phone } from "@mui/icons-material";
import { Box, Button, Divider, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import flight from "../assets/login.png";
import { validateEmail } from "../utils/utils";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState<'email' | 'phone'>('email');
  const [contact, setContact] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isContactValid, setIsContactValid] = useState<boolean>(true);

  const handleMethodChange = (
    _event: React.MouseEvent<HTMLElement>,
    newMethod: 'email' | 'phone' | null,
  ) => {
    if (newMethod !== null) {
      setContactMethod(newMethod);
      setContact('');
      setError('');
      setIsContactValid(true);
    }
  };

  const validateContact = (): boolean => {
    if (contactMethod === 'email') {
      if (!validateEmail(contact)) {
        setError('Please enter a valid email address');
        setIsContactValid(false);
        return false;
      }
    } else {
      if (!/^\d{9}$/.test(contact)) {
        setError('Please enter a valid 10-digit phone number');
        setIsContactValid(false);
        return false;
      }
    }
    setIsContactValid(true);
    return true;
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setContact(value);
    validateContact();
  };

  const handleSubmit = () => {
    if (validateContact()) {
      // Add API call here to send OTP
      console.log(`Sending OTP to ${contactMethod}: ${contact}`);
      navigate('/verify-otp'); // Create this route and page for OTP verification
    }
  };

  return (
    <Box className="flex h-screen">
      {/* Left Section: Image */}
      <Box
        sx={{
          width: "50%",
          backgroundImage: `url(${flight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Right Section: Forgot Password Form */}
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
            Forgot Password
          </Typography>
          <Typography variant="body2" color="textSecondary" textAlign="center" mb={4}>
            Select a method to receive your OTP
          </Typography>
          <Divider sx={{ mb: 3 }} />

          {/* Toggle between Email and Phone */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <ToggleButtonGroup
              value={contactMethod}
              exclusive
              onChange={handleMethodChange}
              aria-label="contact method"
            >
              <ToggleButton value="email" aria-label="email">
                Email
              </ToggleButton>
              <ToggleButton value="phone" aria-label="phone">
                Phone
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Contact Input */}
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              id="contact"
              label={contactMethod === 'email' ? "Email" : "Phone Number"}
              placeholder={contactMethod === 'email' ? "Enter your email" : "Enter your phone number"}
              variant="outlined"
              value={contact}
              onChange={handleContactChange}
              error={!isContactValid}
              helperText={error}
              type={contactMethod === 'phone' ? "tel" : "email"}
              InputProps={{
                startAdornment: contactMethod === 'email' ?
                  <AccountCircle sx={{ color: "gray", mr: 1 }} /> :
                  <Phone sx={{ color: "gray", mr: 1 }} />,
              }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ py: 1.5, borderRadius: "50px", mb: 3 }}
          >
            Send OTP
          </Button>

          {/* Back to Login */}
          <Typography variant="body2" color="textSecondary" textAlign="center">
            Remember your password?{" "}
            <Button
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none', textDecoration: "none", fontWeight: 500 }}
            >
              Back to Login
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
