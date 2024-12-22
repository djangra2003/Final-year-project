import React, { useState } from "react";
import weatherImage from "../assets/map 1.png"; // Replace with your image path

const API_KEY = "https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"; // Replace with your OpenWeatherMap API key

interface WeatherData {
  temperature: number;
  description: string;
}

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchWeather = async (location: string) => {
    setLoading(true);
    setError("");
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch weather data. Please try again.");
      }

      const data = await response.json();
      setWeatherData({
        temperature: data.main.temp,
        description: data.weather[0].description,
      });
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
    } else {
      setError("Please enter a location.");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md flex flex-col items-center">
      {/* <h2
        style={{
          marginBottom: "20px",
          color: "black",
          fontSize: "2rem",
          fontWeight: "600",
        }}
      >
        Rain or Shine? Find Out Here!
      </h2> */}

      {/* Container with background image */}
      <div
        style={{
          backgroundImage: `url(${weatherImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "550px", // Adjust the height as per your design
          position: "relative",
          borderRadius: "8px",
        }}
        className="flex flex-col justify-center items-center p-4"
      >
        {/* Search Bar with a slight left shift */}
        <h2
          style={{
            marginBottom: "20px",
            color: "black",
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.5)",
            fontSize: "2rem",
            fontWeight: "600",
            marginLeft:'-450px',
          }}
        >
          Rain or Shine? Find Out Here!
        </h2>
        <div
          className="w-full max-w-md p-4 rounded-md shadow-md opacity-90"
          style={{
            marginLeft: "-350px", // Shift the search box slightly to the left
            transform: "translateX(-10%)", // Fine-tune its position further
          }}
        >
          <div className="flex w-full mb-4">
            <input
              type="text"
              placeholder="Enter the name of the location"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-l focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600 transition"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {loading && <p className="text-gray-500 mt-4">Fetching weather...</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {weatherData && (
        <div className="mt-4 text-center">
          <p className="text-lg font-medium">
            Temperature: <span className="text-blue-500">{weatherData.temperature}°C</span>
          </p>
          <p className="capitalize text-gray-700">{weatherData.description}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
