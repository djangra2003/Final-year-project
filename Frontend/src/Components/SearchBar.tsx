import { Box, Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import weatherImage from "../assets/map 1.png"; // Replace with your image path

const WEATHER_API_KEY = "d6415f00dd1055c7373167ce14275fbc"; // Replace with your OpenWeatherMap API key
const STORMGLASS_API_KEY = "0b679498-13c4-11f0-a364-0242ac130003-0b6794fc-13c4-11f0-a364-0242ac130003";

interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
}

interface TideData {
  time: string;
  height: number;
  type: 'HIGH' | 'LOW';
}

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [tideData, setTideData] = useState<TideData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeatherAndTides = async (lat: number, lon: number) => {
    setLoading(true);
    setError("");
    setWeatherData(null);
    setTideData([]);

    try {
      // Fetch weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      if (!weatherResponse.ok) throw new Error("Unable to fetch weather data");
      const weatherJson = await weatherResponse.json();

      // Fetch tide data
      const now = new Date();
      const end = new Date();
      end.setDate(end.getDate() + 1);

      const tideResponse = await fetch(
        `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${lon}&start=${now.toISOString()}&end=${end.toISOString()}`,
        {
          headers: {
            'Authorization': STORMGLASS_API_KEY
          }
        }
      );
      if (!tideResponse.ok) throw new Error("Unable to fetch tide data");
      const tideJson = await tideResponse.json();

      setWeatherData({
        temperature: weatherJson.main.temp,
        description: weatherJson.weather[0].description,
        humidity: weatherJson.main.humidity,
        windSpeed: weatherJson.wind.speed,
        icon: weatherJson.weather[0].icon,
      });

      setTideData(tideJson.data.map((tide: any) => ({
        time: tide.time,
        height: tide.height,
        type: tide.type
      })));
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchInput.trim()) {
      setError("Please enter a location.");
      return;
    }

    try {
      // First get coordinates for the location
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput.trim()}&limit=1&appid=${WEATHER_API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (!geoData.length) {
        setError("Location not found");
        return;
      }

      const { lat, lon } = geoData[0];
      fetchWeatherAndTides(lat, lon);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeatherAndTides(position.coords.latitude, position.coords.longitude);
      },
      () => setError("Unable to retrieve your location."),
    );
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${weatherImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: 2,
        minHeight: "650px",
        display: "flex",
        flexDirection: "column",
        padding: 4,
        mb: 3,
      }}
    >
      <Typography variant="h4" sx={{ color: "black", textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)", fontWeight: 600, mb: 2 }}>
        Weather & Tide Information
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "500px", display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", bgcolor: "rgba(255, 255, 255, 0.9)", borderRadius: 1, overflow: "hidden" }}>
          <TextField 
            fullWidth 
            variant="outlined" 
            placeholder="Enter city name" 
            value={searchInput} 
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ bgcolor: "white" }} 
          />
          <Button variant="contained" onClick={handleSearch} sx={{ borderRadius: "0 4px 4px 0" }}>
            Search
          </Button>
        </Box>
        <Button 
          variant="contained" 
          onClick={handleGeolocation} 
          fullWidth
          sx={{ 
            height: "56px", // Same height as TextField
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark"
            }
          }}
        >
          Use Current Location
        </Button>
      </Box>
      {loading && <CircularProgress sx={{ mt: 4 }} />}
      {error && <Typography color="error" sx={{ mt: 4, bgcolor: "rgba(255, 255, 255, 0.9)", p: 1, borderRadius: 1 }}>{error}</Typography>}

      {(weatherData || tideData.length > 0) && (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {weatherData && (
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: "rgba(255, 255, 255, 0.9)" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Weather</Typography>
                  <Typography>Temperature: {weatherData.temperature}°C</Typography>
                  <Typography sx={{ textTransform: "capitalize" }}>{weatherData.description}</Typography>
                  <Typography>Humidity: {weatherData.humidity}%</Typography>
                  <Typography>Wind Speed: {weatherData.windSpeed} m/s</Typography>
                  <img src={`http://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="Weather Icon" />
                </CardContent>
              </Card>
            </Grid>
          )}
          
          {tideData.length > 0 && (
            <Grid item xs={12} md={6}>
              <Card sx={{ bgcolor: "rgba(255, 255, 255, 0.9)" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Tide Information</Typography>
                  {tideData.map((tide, index) => (
                    <Box key={index} sx={{ mb: 2 }}>
                      <Typography>
                        {tide.type} Tide at {new Date(tide.time).toLocaleTimeString()}
                      </Typography>
                      <Typography>Height: {tide.height.toFixed(2)} m</Typography>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      )}
    </Box>
  );
};

export default SearchBar;