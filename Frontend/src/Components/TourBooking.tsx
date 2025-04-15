import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Alert, Autocomplete, Box, Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import booking from "../assets/booking.jpg";

// Using Amadeus API for flight search
const AMADEUS_API_KEY = 'mgmiQPIkPCXGHqnLU8Hv8qqYirJ5PTrS'; // Replace with your Amadeus API key
const AMADEUS_API_SECRET = 'U0jWBXYAE1veKCQa'; // Replace with your Amadeus API secret

interface Location {
  name: string;
  code: string;
}

interface FlightSegment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  duration: string;
}

interface FlightItinerary {
  segments: FlightSegment[];
}

interface FlightPrice {
  total: string;
  currency: string;
}

interface Flight {
  itineraries: FlightItinerary[];
  price: FlightPrice;
}

const TourBooking: React.FC = () => {
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [origin, setOrigin] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [departDate, setDepartDate] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const [originLocations, setOriginLocations] = useState<Location[]>([]);
  const [destinationLocations, setDestinationLocations] = useState<Location[]>([
    { name: "Mumbai", code: "BOM" },
    { name: "Delhi", code: "DEL" },
    { name: "Bangalore", code: "BLR" },
    { name: "Chennai", code: "MAA" },
    { name: "Kolkata", code: "CCU" },
    { name: "Hyderabad", code: "HYD" },
    { name: "Ahmedabad", code: "AMD" },
    { name: "Kochi", code: "COK" },
    { name: "Goa", code: "GOI" },
    { name: "Pune", code: "PNQ" }
  ]);

  const incrementAdults = () => setAdults((prev) => prev + 1);
  const decrementAdults = () => setAdults((prev) => (prev > 0 ? prev - 1 : 0));
  const incrementChildren = () => setChildren((prev) => prev + 1);
  const decrementChildren = () => setChildren((prev) => (prev > 0 ? prev - 1 : 0));

   // Search for locations as user types
   const searchLocations = async (searchTerm: string, isOrigin: boolean) => {
    if (!searchTerm) return;
    
    try {
      // First get the access token
      const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get access token');
      }

      const tokenData = await tokenResponse.json();

      // Search for cities/airports
      const response = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${searchTerm}`,
        {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        }
      );

      if (!response.ok) throw new Error('Failed to fetch locations');

      const data = await response.json();
      const formattedLocations = data.data.map((loc: {name: string, iataCode: string}) => ({
        name: loc.name,
        code: loc.iataCode
      }));
      if (isOrigin) {
        setOriginLocations(formattedLocations);
      } else {
        // Filter out the origin city from destination options if origin is selected
        const filteredLocations = origin
          ? formattedLocations.filter(loc => loc.code !== origin.code)
          : formattedLocations;
        setDestinationLocations(filteredLocations);
      }
    } catch (err) {
      console.error('Error fetching locations:', err);
      setError("Failed to search locations. Please try again.");
    }
  };

  const searchFlights = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!origin || !destination) {
      setError("Please select both origin and destination");
      return;
    }

    if (!departDate) {
      setError("Please select a departure date");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // First get the access token
      const tokenResponse = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`
      });

      if (!tokenResponse.ok) {
        throw new Error('Failed to get access token');
      }

      const tokenData = await tokenResponse.json();
      
      // Use the access token to search flights
      const response = await fetch(
        `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin.code}&destinationLocationCode=${destination.code}&departureDate=${departDate}&adults=${adults}&children=${children}&max=5&currencyCode=INR`, 
        {
          headers: {
            'Authorization': `Bearer ${tokenData.access_token}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.detail || 'Failed to fetch flights');
      }

      const data = await response.json();
      setFlights(data.data || []);
      
      if (!data.data || data.data.length === 0) {
        setError("No flights found for this route. Please try different dates or locations.");
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to search flights. Please try again.");
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        backgroundImage: `url(${booking})`,
        backgroundSize: "cover",
        backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      borderRadius: '100px',
        backgroundPosition: "center",
        py: 8,
        px: 4,
      }}
    >
      {/* Overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.3)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 8,
          textAlign: "center",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Left Text Section */}
        <Box sx={{ spaceY: 4 }}>
          <Typography variant="h3" fontWeight="bold" color="white">
            The Trip of Your Dream
          </Typography>
          <Typography variant="body1" color="white">
            Our travel agency offers personalized vacations, from exotic cruises
            to your favorite resorts, ensuring your best experience.
          </Typography>
        </Box>

        {/* Booking Form */}
        <Box
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="textPrimary" mb={2}>
            FIND YOUR FLIGHT
          </Typography>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <form onSubmit={searchFlights}>
            <Grid container spacing={2}>
              {/* Input Fields */}
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  options={originLocations}
                  getOptionLabel={(option) => `${option.name} (${option.code})`}
                  onChange={(_, newValue) => {
                    setOrigin(newValue);
                    // Clear destination if the new origin matches it
                    if (destination && newValue?.code === destination.code) {
                      setDestination(null);
                    }
                  }}
                  onInputChange={(_, newInputValue) => searchLocations(newInputValue, true)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="From"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  fullWidth
                  options={destinationLocations}
                  getOptionLabel={(option) => `${option.name} (${option.code})`}
                  onChange={(_, newValue) => setDestination(newValue)}
                  onInputChange={(_, newInputValue) => searchLocations(newInputValue, false)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="To"
                      variant="outlined"
                      required
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Depart Date"
                  variant="outlined"
                  type="date"
                  value={departDate}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      const year = new Date(value).getFullYear();
                      if (year.toString().length > 4) {
                        return; // Prevent invalid year input
                      }
                    }
                    setDepartDate(value);
                  }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    max: '9999-12-31', // Prevent dates beyond year 9999
                    min: new Date().toISOString().split('T')[0] // Prevent past dates
                  }}
                  required
                />
              </Grid>

              {/* Adults Counter */}
              <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  Adults
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={decrementAdults}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ mx: 2 }}>
                    {adults}
                  </Typography>
                  <IconButton onClick={incrementAdults}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>

              {/* Children Counter */}
              <Grid item xs={6}>
                <Typography variant="body1" fontWeight="bold">
                  Children
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={decrementChildren}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" sx={{ mx: 2 }}>
                    {children}
                  </Typography>
                  <IconButton onClick={incrementChildren}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="warning"
                  type="submit"
                  disabled={loading}
                  sx={{ mt: 2, borderRadius: "50px" }}
                >
                  {loading ? "Searching..." : "SEARCH FLIGHTS"}
                </Button>
              </Grid>
            </Grid>
          </form>

          {/* Display Flight Results */}
          {flights.length > 0 && (
             <Box sx={{ mt: 4 }}>
               <Typography variant="h6" gutterBottom>Available Flights:</Typography>
               {flights.map((flight, index) => (
                 <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
                   <Typography variant="subtitle1" fontWeight="bold">
                     {flight.itineraries[0].segments[0].departure.iataCode} →{" "}
                     {flight.itineraries[0].segments[0].arrival.iataCode}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     Flight: {flight.itineraries[0].segments[0].carrierCode} {flight.itineraries[0].segments[0].number}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     Aircraft: {flight.itineraries[0].segments[0].aircraft.code}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     Departure: {new Date(flight.itineraries[0].segments[0].departure.at).toLocaleString()}
                   </Typography>
                   <Typography variant="body2" color="text.secondary">
                     Duration: {flight.itineraries[0].segments[0].duration}
                   </Typography>
                   <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                     Price: ₹{flight.price.total}
                   </Typography>
                   <Button
                     variant="contained"
                     color="primary"
                     fullWidth
                     sx={{ mt: 2, borderRadius: '50px' }}
                     onClick={() => {
                       const carrierCode = flight.itineraries[0].segments[0].carrierCode.toLowerCase();
                       let bookingUrl = '';
                       
                       // Map carrier codes to their booking websites
                       switch(carrierCode) {
                         case 'ai':
                           bookingUrl = 'https://www.airindia.com';
                           break;
                         case '6e':
                           bookingUrl = 'https://www.goindigo.in';
                           break;
                         case 'uk':
                           bookingUrl = 'https://www.airvistara.com';
                           break;
                         case 'sg':
                           bookingUrl = 'https://www.spicejet.com';
                           break;
                         default:
                           bookingUrl = `https://www.google.com/flights?q=${flight.itineraries[0].segments[0].carrierCode}%20${flight.itineraries[0].segments[0].number}`;
                       }
                       
                       window.open(bookingUrl, '_blank');
                     }}
                   >
                     Book Now
                   </Button>
                 </Box>
               ))}
             </Box>
           )}
        </Box>
      </Box>
    </Box>
  );
};

export default TourBooking;