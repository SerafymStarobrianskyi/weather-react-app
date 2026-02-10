import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getWeather, getAirQuality } from "../api/weather";
import { getAirQualityText } from "../helpers/airQuality.js";
import { getWeatherTips } from "../helpers/weatherTips.js";
import { getUnitsSetting, getWindSpeedUnit } from "../store/units.js";
import TemperatureInfo from "../components/weatherCard/TemperatureInfo.jsx";
import WeatherInfo from "../components/weatherCard/WeatherInfo.jsx";
import WeatherTipRow from "../components/weatherCard/WeatherTipRow.jsx";
import WeeklyWeather from "../components/weatherCard/WeeklyWeather.jsx";
import "./styles/WeatherPage.css";

export default function WeatherPage() {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [airQualityData, setAirQualityData] = useState(null);
  const [weatherTip, setWeatherTip] = useState(null);

  const units = getUnitsSetting();
  const today = new Date();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        let lat;
        let lon;
        const data = await getWeather(city);
        if (data.cod !== 200) {
          setError(data.message);
          return;
        }
        console.log(data);
        setWeather(data);

        if (weather) {
          lat = weather.coord.lat;
          lon = weather.coord.lon;
        } else {
          lat = 0;
          lon = 0;
        }

        setWeatherTip(getWeatherTips(data, units));

        const aqi = await getAirQuality(lat, lon);
        if (aqi) {
          const aqiValue = aqi.list[0]?.main.aqi || 0;
          setAirQualityData({
            aqi: aqiValue,
            text: getAirQualityText(aqiValue),
          });
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [city]);

  if (isLoading) {
    return <div className="weather-container">Loading...</div>;
  }

  if (error || !weather) {
    return (
      <div className="weather-container">{error || "No data available"}</div>
    );
  }

  return (
    <div className="weather-container">
      <h2 className="weather-city">{weather.name}</h2>
      <p className="weather-date">
        {today.toLocaleDateString("en-En", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>
      <div className="weather-top-row">
        <TemperatureInfo
          temperature={Math.round(weather.main.temp)}
          realFeel={Math.round(weather.main.feels_like)}
          iconUrl={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <WeatherInfo
          wind={Math.round(weather.wind.speed * 3.6)}
          windUnit={getWindSpeedUnit(units)}
          humidity={weather.main.humidity}
          airQuality={airQualityData?.text || "N/A"}
        />
      </div>

      <WeatherTipRow tip={weatherTip || []} />
      <WeeklyWeather />
    </div>
  );
}
