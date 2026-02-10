export function getThemeSetting() {
  const stored = localStorage.getItem("weather-theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return "light";
}

export function setThemeSetting(theme) {
  localStorage.setItem("weather-theme", theme);
  applyTheme(theme);
}

export function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export function initializeTheme() {
  const theme = getThemeSetting();
  applyTheme(theme);
}
