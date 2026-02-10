import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getForecast } from "../../api/weather";
import { getUnitsSetting } from "../../store/units";
import "./styles/WeeklyWeather.css";

export default function WeeklyWeather() {
  const { city } = useParams();
  const [days, setDays] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const units = getUnitsSetting();
  const unitSymbol = units === "imperial" ? "°F" : "°C";

  useEffect(() => {
    async function loadForecast() {
      if (!city) {
        return;
      }

      setIsLoading(true);
      const data = await getForecast(city);
      if (!data || !data.list) {
        setIsLoading(false);
        return;
      }

      const dailyData = {};

      data.list.forEach((item) => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyData[date]) {
          dailyData[date] = {
            date,
            min: item.main.temp_min,
            max: item.main.temp_max,
            icon: item.weather[0].icon,
            description: item.weather[0].description,
          };
        } else {
          dailyData[date].min = Math.min(
            dailyData[date].min,
            item.main.temp_min,
          );
          dailyData[date].max = Math.max(
            dailyData[date].max,
            item.main.temp_max,
          );
        }
      });

      setDays(Object.values(dailyData).slice(0, 5));

      setIsLoading(false);
    }
    loadForecast();
  }, [city]);

  const getDayName = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-En", {
      weekday: "short",
    });
  };

  if (isLoading) {
    return <div className="forecast-loading">Loading...</div>;
  }

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>

      <div className="forecast-list">
        {days.map((day, index) => (
          <div key={day.date} className="forecast-item">
            <span className="forecast-day">{getDayName(day.date)}</span>

            <img
              className="forecast-icon"
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            />

            <span className="forecast-temp">
              {Math.round(day.min)}
              {unitSymbol} / {Math.round(day.max)}
              {unitSymbol}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
