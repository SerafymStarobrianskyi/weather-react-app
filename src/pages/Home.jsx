import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWeather } from "../api/weather";
import "./styles/Home.css";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchValue.trim()) {
      setError("Please enter a city name");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const weatherData = await getWeather(searchValue);

      if (weatherData.cod !== 200) {
        setError("City not found. Please try again.");
        setIsLoading(false);
        return;
      }

      setSearchValue("");
      navigate(`/weather/${weatherData.name}`);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="home-container">
      <div className="search-section">
        <h1 className="search-title">Search a city for weather...</h1>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Write a city here"
            value={searchValue}
            onInput={(e) => setSearchValue(e.target.value)}
            disabled={isLoading}
          />
          <button className="search-button" disabled={isLoading} type="submit">
            <img
              src={`${import.meta.env.BASE_URL}ui/icons/magnifying-glass.svg`}
              width={20}
              height={20}
              alt="Search"
            />
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {isLoading && <p className="loading-message">Searching...</p>}
      </div>
    </div>
  );
}
