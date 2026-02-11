import { useState } from "react";
import { getThemeSetting, setThemeSetting } from "../store/theme.js";
import { getUnitsSetting, setUnitsSetting } from "../store/units.js";
import SettingRow from "../components/settings/SettingRow.jsx";
import "./styles/Settings.css";
import {
  getSaveLocationsSetting,
  setSaveLocationsSetting,
} from "../store/location.js";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const unitOptions = [
  { value: "metric", label: "Metric (°C)" },
  { value: "imperial", label: "Imperial (°F)" },
];

const saveLocationOptions = [
  { value: "on", label: "On" },
  { value: "off", label: "Off" },
];

export default function Settings() {
  const [theme, setTheme] = useState(getThemeSetting());
  const [units, setUnits] = useState(getUnitsSetting());
  const [saveLocations, setSaveLocations] = useState(
    getSaveLocationsSetting() ? "on" : "off",
  );

  function handleThemeChange(value) {
    setTheme(value);
    setThemeSetting(value);
  }
  function handleUnitsChange(value) {
    setUnits(value);
    setUnitsSetting(value);
  }
  function handleSaveLocationsChange(value) {
    setSaveLocations(value);
    setSaveLocationsSetting(value === "on");
  }

  return (
    <div className="settings-container">
      <div className="settings-section">
        <h2 className="settings-section-title">General</h2>
        <SettingRow
          label="Theme"
          options={themeOptions}
          selectedValue={theme}
          onChange={handleThemeChange}
        />
      </div>

      <div className="settings-section">
        <h2 className="settings-section-title">Units</h2>
        <SettingRow
          label="Units"
          options={unitOptions}
          selectedValue={units}
          onChange={handleUnitsChange}
        />
      </div>
      <div className="settings-section">
        <h2 className="settings-section-title">Privacy</h2>
        <SettingRow
          label="Save Last Locations"
          options={saveLocationOptions}
          selectedValue={saveLocations}
          onChange={handleSaveLocationsChange}
        />
      </div>
    </div>
  );
}
