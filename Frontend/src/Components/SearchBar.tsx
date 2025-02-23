import React, { useState } from "react";
import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import weatherImage from "../assets/map 1.png"; // Replace with your image path

const API_KEY = "ca695dcbc66c5fa3d0cb955033fd918f"; // Replace with your OpenWeatherMap API key

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (url: string) => {
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch weather data. Please try again.");
      }
      const data = await response.json();
      setWeatherData({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${searchInput.trim()}&units=metric&appid=${API_KEY}`);
    } else {
      setError("Please enter a location.");
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${API_KEY}`);
      },
      () => setError("Unable to retrieve your location."),
    );
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${weatherImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        height: "550px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 4,
        mb: 3,
      }}
    >
      <Typography variant="h4" sx={{ color: "black", textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", fontWeight: 600, mb: 2 }}>
        Rain or Shine? Find Out Here!
      </Typography>
      <Box sx={{ display: "flex", width: "100%", maxWidth: "500px", bgcolor: "rgba(255, 255, 255, 0.9)", borderRadius: 1, overflow: "hidden" }}>
        <TextField fullWidth variant="outlined" placeholder="Enter city name" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} sx={{ bgcolor: "white" }} />
        <Button variant="contained" onClick={handleSearch} sx={{ borderRadius: "0 4px 4px 0" }}>
          Search
        </Button>
      </Box>
      <Button variant="outlined" onClick={handleGeolocation} sx={{ mt: 2 }}>
        Use Current Location
      </Button>
      {loading && <CircularProgress sx={{ mt: 4 }} />}
      {error && <Typography color="error" sx={{ mt: 4 }}>{error}</Typography>}

      {weatherData && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6">
            Temperature: <span style={{ color: "1565c0" }}>{weatherData.temperature}°C</span>
          </Typography>
          <Typography variant="body1" sx={{ textTransform: "capitalize", color: "1565c0" }}>
            {weatherData.description}
          </Typography>
          <Typography variant="body1" sx={{ color: "1565c0" }}>
            Humidity: {weatherData.humidity}%
          </Typography>
          <Typography variant="body1" sx={{ color: "1565c0" }}>
            Wind Speed: {weatherData.windSpeed} m/s
          </Typography>
          <img src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" />
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
