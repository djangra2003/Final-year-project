import { AccountCircle, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Divider, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import flight from "../assets/login.png";
import { useUser } from "../context/UserContext";
import { validatePassword } from "../utils/utils";

interface FormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({ username: "", password: "" });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsFormValid(formData.username.trim() !== "" && validatePassword(formData.password));
  }, [formData.username, formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    if (formData.username.trim() === "" || !validatePassword(formData.password)) {
      alert("Please fill out all fields correctly.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify({ username: data.user.username, email: data.user.email }));

      setUser({ username: data.user.username, email: data.user.email });
      navigate("/");
    } catch (error: any) {
      setError(error.message || "An error occurred during login");
    }
  };

  return (
    <Box className="flex h-screen">
      <Grid container>
        <Grid item xs={12} md={6} sx={{ backgroundImage: `url(${flight})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <Grid item xs={12} md={6} display="flex" alignItems="center" justifyContent="center" bgcolor="white" px={{ xs: 2, sm: 4 }}>
          <Box component="form" sx={{ width: "100%", maxWidth: 400 }} onSubmit={handleSubmit}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" color="gray" mb={1}>Welcome Back!</Typography>
            <Typography variant="body2" color="textSecondary" textAlign="center" mb={4}>Enter your credentials to login</Typography>
            <Divider sx={{ mb: 3 }} />

            <TextField
              fullWidth
              id="username"
              label="Username"
              placeholder="Enter your username"
              variant="outlined"
              value={formData.username}
              onChange={handleChange}
              error={!!formData.username && formData.username.trim() === ""}
              helperText={!!formData.username && formData.username.trim() === "" ? "Username is required" : ""}
              InputProps={{ startAdornment: <AccountCircle sx={{ color: "gray", mr: 1 }} /> }}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              variant="outlined"
              value={formData.password}
              onChange={handleChange}
              error={!!formData.password && !validatePassword(formData.password)}
              helperText={!!formData.password && !validatePassword(formData.password) ? "Password must be 8 characters" : ""}
              InputProps={{
                startAdornment: <Lock sx={{ color: "gray", mr: 1 }} />, 
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />

            <Box textAlign="right" mb={3}>
              <Button onClick={() => navigate("/forgot-password")} sx={{ textTransform: "none" }} color="primary">Forgot Password?</Button>
            </Box>

            <Button fullWidth variant="contained" color="primary" type="submit" disabled={!isFormValid} sx={{ py: 1.5, borderRadius: "50px", mb: 3 }}>Login</Button>

            <Typography variant="body2" color="textSecondary" textAlign="center">
              Don't have an account? <Link to="/signup" style={{ textDecoration: "none", color: "#1976d2", fontWeight: 500 }}>Sign up</Link>
            </Typography>

            {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
