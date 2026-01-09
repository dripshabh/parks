// Passion Card Icons
// Icons for passion cards that give players personal objectives

export const passionIcons = {
  botany: "🌿",
  adventure: "⛰️",
  swimming: "🏊",
  birdwatching: "🦅",
  photography: "📷",
  geology: "🪨",
  astronomy: "⭐",
  hiking: "🥾",
  fishing: "🎣",
  camping: "⛺",
  default: "🌟"
};

export const getPassionIcon = (passionId) => {
  return passionIcons[passionId] || passionIcons.default;
};

// Passion card colors
export const passionColors = {
  botany: { bg: "bg-green-100", border: "border-green-500" },
  adventure: { bg: "bg-orange-100", border: "border-orange-500" },
  swimming: { bg: "bg-blue-100", border: "border-blue-500" },
  birdwatching: { bg: "bg-yellow-100", border: "border-yellow-500" },
  photography: { bg: "bg-purple-100", border: "border-purple-500" },
  geology: { bg: "bg-gray-100", border: "border-gray-500" },
  astronomy: { bg: "bg-indigo-100", border: "border-indigo-500" },
  hiking: { bg: "bg-amber-100", border: "border-amber-500" },
  default: { bg: "bg-gray-100", border: "border-gray-500" }
};
