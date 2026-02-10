import { useState } from "react";
import { getThemeSetting, setThemeSetting } from "../store/theme.js";
import { getUnitsSetting, setUnitsSetting } from "../store/units.js";
import SettingRow from "../components/settings/SettingRow.jsx";
import "./styles/Settings.css";

const themeOptions = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const unitOptions = [
  { value: "metric", label: "Metric (°C)" },
  { value: "imperial", label: "Imperial (°F)" },
];

export default function Settings() {
  const [theme, setTheme] = useState(getThemeSetting());
  const [units, setUnits] = useState(getUnitsSetting());

  function handleThemeChange(value) {
    setTheme(value);
    setThemeSetting(value);
  }
  function handleUnitsChange(value) {
    setUnits(value);
    setUnitsSetting(value);
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
    </div>
  );
}
