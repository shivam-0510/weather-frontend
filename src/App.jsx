import { useState } from "react";
import axios from "axios";
import "./App.css"; // Create a new CSS file for styling

const App = () => {
  const [cityInput, setCityInput] = useState("");
  const [weatherResults, setWeatherResults] = useState({});

  const getWeather = async () => {
    try {
      const cities = cityInput.split(",").map((city) => city.trim());

      const response = await axios.post(
        "https://weather-backend-shivam-0510.vercel.app/getWeather",
        {
          cities,
        }
      );
      setWeatherResults(response.data.weather);
    } catch (error) {
      console.error("Error fetching weather:", error.message);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-container">
        <label htmlFor="cityInput">Enter city names (comma-separated):</label>
        <input
          type="text"
          id="cityInput"
          placeholder="e.g., Toronto, Mumbai, London"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      <div className="weather-container">
        <h2>Weather Results:</h2>
        {Object.entries(weatherResults).map(([city, temperature]) => (
          <p key={city}>{`${city}: ${temperature}`}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
