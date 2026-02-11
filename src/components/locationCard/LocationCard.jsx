import { getWeatherIcon } from "../../helpers/wetherIcon";
import { getTemperatureUnitSymbol } from "../../store/units";
import "./LocationCard.css";

export default function LocationCard({ location, onClick }) {
  const units = getTemperatureUnitSymbol();

  function formatDate(timestamp) {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return diffMins === 0 ? "Just now" : `${diffMins}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    if (diffDays < 7) {
      return `${diffDays}d ago`;
    }
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

  return (
    <>
      <div className="location-card" onClick={onClick}>
        <h3 className="location-city">{location.name}</h3>
        <p className="location-country">{location.sys.country}</p>
        <p className="location-time">
          {formatDate(location.lastSearched) || "Your are now on this location"}
        </p>

        <div className="location-weather">
          <div className="weather-icon">
            {location?.weather?.[0]?.icon && (
              <img
                src={getWeatherIcon(location.weather[0].icon)}
                alt="Weather"
              />
            )}
          </div>

          <span className="weather-temperature">
            {Math.round(location.main.temp)}
            {units}
          </span>
        </div>
      </div>
    </>
  );
}
