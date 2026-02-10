import { getUnitsSetting } from "../../store/units";
import "./styles/TemperatureInfo.css";

export default function TemperatureInfo({ temperature, realFeel, iconUrl }) {
  const units = getUnitsSetting();
  const unitSymbol = units === "imperial" ? "°F" : "°C";
  return (
    <div className="temperature-info">
      <div className="weather-icon-large">
        <img src={iconUrl} alt="Weather icon" className="weather-icon-img" />
      </div>
      <div className="temperature-display">
        <span className="temperature-value">
          {temperature}
          {unitSymbol}
        </span>
        <span className="real-feel">
          RealFeel: {realFeel}
          {unitSymbol}
        </span>
      </div>
    </div>
  );
}
