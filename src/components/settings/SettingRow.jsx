import "./SettingRow.css";

export default function SettingRow({
  label,
  options,
  selectedValue,
  onChange,
}) {
  return (
    <div className="setting-row">
      <span className="setting-label">{label}</span>
      <div className="setting-options">
        {options.map((option) => (
          <button
            key={option.value}
            className={`setting-option ${selectedValue === option.value ? "active" : ""}`}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
