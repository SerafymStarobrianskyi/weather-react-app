export function getUnitsSetting() {
  const value = localStorage.getItem("weather-units");
  return value || "metric";
}

export function setUnitsSetting(units) {
  if (units !== "metric" && units !== "imperial") return;
  localStorage.setItem("weather-units", units);
}

export function getTemperatureUnitSymbol(units) {
  const currentUnits = units || getUnitsSetting();
  return currentUnits === "imperial" ? "°F" : "°C";
}

export function getWindSpeedUnit(units) {
  const currentUnits = units || getUnitsSetting();
  return currentUnits === "imperial" ? "mph" : "km/h";
}
