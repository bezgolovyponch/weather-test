import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { Typography, TextField, Box } from "@mui/material";

interface WeatherData {
  main: {
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
}

const Weather: React.FC = () => {
  const [city, setCity] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherDataByCoordinates(latitude, longitude);
        },
        (error) => {
          console.log("Error getting current location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported in this browser.");
    }
  }, []);

  const fetchWeatherDataByCoordinates = async (
    latitude: number,
    longitude: number
  ): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      const data = await response.json();

      if (!data) {
        throw new Error("Failed to fetch weather data");
      }
      setCity(data.name);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  const fetchWeatherData = async (city: string): Promise<WeatherData> => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      const data = await response.json();

      if (!data) {
        throw new Error("Failed to fetch weather data");
      }
      return data;
    } catch (error) {
      console.log("Error fetching weather data:", error);
      throw error;
    }
  };

  const { data, isError } = useQuery<WeatherData, Error>(
    ["weather", city],
    () => fetchWeatherData(city),
    {
      enabled: !!city,
    }
  );

  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (city) {
      try {
        await fetchWeatherData(city);
      } catch (error) {
        console.log("Error fetching weather data:", error);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20vh",
        padding: "16px",
        flexDirection: "column",
      }}
    >
      <Box
        component="form"
        onSubmit={handleFormSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          sx={{
            padding: "16px",
            outlineColor: "#fff",
            "& input": {
              textAlign: "center",
              outlineColor: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
          }}
          type="text,"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
          variant="outlined"
          InputProps={{
            style: {
              color: "#fff",
              textAlign: "center",
            },
          }}
        />
      </Box>

      {isError && <Typography>Error fetching weather data</Typography>}

      {data && data.main && (
        <Box>
          <Typography sx={{ color: "#a9c8ff", marginBottom: "8px" }}>
            Temperature: {(data.main.feels_like - 273).toFixed(1)}° C
          </Typography>
          <Typography sx={{ color: "#a9c8ff", marginBottom: "8px" }}>
            Wind: {data.wind.speed}
          </Typography>
          <Typography sx={{ color: "#a9c8ff", marginBottom: "8px" }}>
            Humidity: {data.main.humidity}
          </Typography>
          <Typography sx={{ color: "#a9c8ff" }}>
            Location: {data.name}, {data.sys.country}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Weather;
