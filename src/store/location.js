import { getUnitsSetting } from "./units";

export function getSaveLocationsSetting() {
  const value = localStorage.getItem("save-locations");
  return value === null ? true : value === "true";
}

export function setSaveLocationsSetting(save) {
  localStorage.setItem("save-locations", save.toString());
}

export function getLastLocations() {
  const locations = localStorage.getItem("last-locations");
  return locations ? JSON.parse(locations) : null;
}

export function saveLastLocation(location) {
  if (!getSaveLocationsSetting()) return;

  const currentUnits = getUnitsSetting();

  const locationWithTimestamp = {
    ...location,
    lastSearched: Date.now(),
    savedUnits: currentUnits,
  };

  localStorage.setItem("last-locations", JSON.stringify(locationWithTimestamp));
}
