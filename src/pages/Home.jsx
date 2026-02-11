import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWeather, getWeatherByCoords } from "../api/weather";
import LocationCard from "../components/locationCard/LocationCard.jsx";
import "./styles/Home.css";
import {
  getLastLocations,
  getSaveLocationsSetting,
  saveLastLocation,
} from "../store/location";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastLocations, setLastLocations] = useState(null);
  const [geoLocation, setGeoLocation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const data = await getWeatherByCoords(latitude, longitude);
        if (data) {
          setGeoLocation(data);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
      },
    );
  }, []);

  useEffect(() => {
    async function loadLastLocation() {
      const saved = getLastLocations();

      if (!saved) return;

      try {
        const freshData = await getWeather(saved.name);

        if (freshData.cod === 200) {
          setLastLocations({
            ...freshData,
            lastSearched: saved.lastSearched,
          });
        }
      } catch (err) {
        console.error("Error refreshing last location:", err);
      }
    }

    loadLastLocation();
  }, []);

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

      if (getSaveLocationsSetting()) {
        saveLastLocation({
          name: weatherData.name,
        });
        setLastLocations(getLastLocations());
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
  function handleGeoLocationSelect() {
    navigate(`/weather/${encodeURIComponent(geoLocation.name)}`);
  }

  function handleLocationSelect() {
    navigate(`/weather/${encodeURIComponent(lastLocations.name)}`);
  }

  const showLastLocations = () =>
    getSaveLocationsSetting() && lastLocations !== null;

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

      <div className="locations-row">
        {geoLocation && (
          <div className="locations-item">
            <p className="locations-title">Your Location</p>
            <LocationCard
              location={geoLocation}
              onClick={handleGeoLocationSelect}
            />
          </div>
        )}

        {showLastLocations() && (
          <div className="locations-item">
            <p className="locations-title">Last Location</p>
            <LocationCard
              location={lastLocations}
              onClick={handleLocationSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}
