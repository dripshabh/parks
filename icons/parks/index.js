// Park Icons
// Icons for national park cards

export const parkIcons = {
  default: "🌲",
  forest: "🌲",
  mountain: "⛰️",
  desert: "🏜️",
  coast: "🏖️",
  canyon: "🏔️",
  lake: "🏞️",
  river: "🌊",
  volcano: "🌋"
};

// Park card colors based on terrain/type
export const parkColors = {
  forest: { bg: "bg-green-50", border: "border-green-600" },
  mountain: { bg: "bg-gray-50", border: "border-gray-600" },
  desert: { bg: "bg-amber-50", border: "border-amber-600" },
  coast: { bg: "bg-blue-50", border: "border-blue-600" },
  canyon: { bg: "bg-orange-50", border: "border-orange-600" },
  lake: { bg: "bg-cyan-50", border: "border-cyan-600" },
  river: { bg: "bg-blue-50", border: "border-blue-600" },
  volcano: { bg: "bg-red-50", border: "border-red-600" },
  default: { bg: "bg-amber-50", border: "border-amber-600" }
};

export const getParkIcon = (parkType = "default") => {
  return parkIcons[parkType] || parkIcons.default;
};
