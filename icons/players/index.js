// Player Component Icons
// Icons for player-specific components

export const playerIcons = {
  campfire: "🔥",
  campfireExtinguished: "🔥", // Same icon, different opacity
  hiker: "🚶",
  backpack: "🎒",
  canteen: "💧",
  tent: "⛺",
  photoAlbum: "📔",
  shutterbug: "📷",
  firstHiker: "🏃"
};

// Player color schemes
export const playerColors = {
  yellow: {
    bg: "bg-yellow-200",
    border: "border-yellow-600",
    accent: "bg-yellow-300",
    text: "text-yellow-900"
  },
  red: {
    bg: "bg-red-200",
    border: "border-red-600",
    accent: "bg-red-300",
    text: "text-red-900"
  },
  green: {
    bg: "bg-green-200",
    border: "border-green-600",
    accent: "bg-green-300",
    text: "text-green-900"
  },
  blue: {
    bg: "bg-blue-200",
    border: "border-blue-600",
    accent: "bg-blue-300",
    text: "text-blue-900"
  },
  purple: {
    bg: "bg-purple-200",
    border: "border-purple-600",
    accent: "bg-purple-300",
    text: "text-purple-900"
  }
};

export const getPlayerIcon = (iconType) => {
  return playerIcons[iconType] || "👤";
};

export const getPlayerColor = (colorName) => {
  return playerColors[colorName] || playerColors.yellow;
};
