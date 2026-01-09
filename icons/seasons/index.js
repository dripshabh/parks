// Season Icons
// Icons for the three seasons in the game

export const seasonIcons = {
  spring: "🌸",
  summer: "☀️",
  fall: "🍂",
  winter: "❄️"
};

// Season colors
export const seasonColors = {
  spring: { bg: "bg-green-100", border: "border-green-400", text: "text-green-900" },
  summer: { bg: "bg-yellow-100", border: "border-yellow-400", text: "text-yellow-900" },
  fall: { bg: "bg-orange-100", border: "border-orange-400", text: "text-orange-900" },
  winter: { bg: "bg-blue-100", border: "border-blue-400", text: "text-blue-900" }
};

export const getSeasonIcon = (seasonName) => {
  return seasonIcons[seasonName.toLowerCase()] || "🌟";
};

export const getSeasonColor = (seasonName) => {
  return seasonColors[seasonName.toLowerCase()] || seasonColors.spring;
};
