// Canteen Icons
// Icons for canteen tokens

export const canteenIcons = {
  basic: "💧",
  sturdy: "💧",
  insulated: "💧",
  large: "💧",
  lightweight: "💧",
  premium: "💧",
  default: "💧"
};

// Canteen types with visual distinctions
export const canteenTypes = {
  basic: { icon: "💧", color: "blue" },
  sturdy: { icon: "💧", color: "blue-600" },
  insulated: { icon: "💧", color: "blue-500" },
  large: { icon: "💧", color: "blue-700" },
  lightweight: { icon: "💧", color: "blue-400" },
  premium: { icon: "💧", color: "blue-800" }
};

export const getCanteenIcon = (canteenType = "default") => {
  return canteenIcons[canteenType] || canteenIcons.default;
};
