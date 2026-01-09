// UI Icons
// Icons for UI elements and game board components

export const uiIcons = {
  trailhead: "🏕️",
  trailEnd: "🏁",
  weatherSun: "☀️",
  weatherWater: "💧",
  victoryPoint: "⭐",
  camera: "📷",
  shutterbug: "📷",
  photoBonus: "📸",
  arrowRight: "→",
  arrowLeft: "←",
  checkmark: "✓",
  x: "✗",
  plus: "+",
  minus: "-",
  info: "ℹ️",
  warning: "⚠️",
  error: "❌"
};

// Board component icons
export const boardIcons = {
  parksDisplay: "🏞️",
  gearMarket: "🎒",
  canteenDisplay: "💧",
  resourceTray: "📦",
  seasonTrack: "📅",
  trail: "🛤️",
  campgrounds: "⛺"
};

export const getUIIcon = (iconType) => {
  return uiIcons[iconType] || "•";
};

export const getBoardIcon = (componentType) => {
  return boardIcons[componentType] || "📍";
};
