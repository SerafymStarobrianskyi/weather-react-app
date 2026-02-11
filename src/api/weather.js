import { getUnitsSetting } from "../store/units";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getWeather(city) {
  const units = getUnitsSetting();
  const res = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`,
  );

  const data = await res.json();
  return data;
}

export async function getAirQuality(lat, lon) {
  const res = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
  );

  const data = await res.json();
  return data;
}

export async function getForecast(city) {
  try {
    const units = getUnitsSetting();
    const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${units}`;
    const response = await fetch(url);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

export async function getWeatherByCoords(lat, lon) {
  const units = getUnitsSetting();
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`,
  );

  return response.json();
}
