// Gear Card Icons
// Icons for all gear cards in the game
// Supports both images and emoji fallbacks

export const gearIcons = {
  "Hiking Boots": "🥾",
  "Binoculars": "🔭",
  "Journal": "📔",
  "Compass": "🧭",
  "Backpack": "🎒",
  "Camera": "📷",
  "Flashlight": "🔦",
  "Map": "🗺️",
  "First Aid Kit": "🩹",
  "Tent": "⛺",
  "Sleeping Bag": "🛌",
  "Water Filter": "💧",
  "Multi-tool": "🔧",
  "Headlamp": "💡",
  "Rope": "🪢",
  default: "🎒"
};

// Image paths for gear cards (kebab-case filenames)
export const gearImages = {
  "Hiking Boots": "/assets/images/gear/hiking-boots.png",
  "Binoculars": "/assets/images/gear/binoculars.png",
  "Journal": "/assets/images/gear/journal.png",
  "Compass": "/assets/images/gear/compass.png",
  "Backpack": "/assets/images/gear/backpack.png",
  "Camera": "/assets/images/gear/camera.png",
  "Flashlight": "/assets/images/gear/flashlight.png",
  "Map": "/assets/images/gear/map.png",
  "First Aid Kit": "/assets/images/gear/first-aid-kit.png",
  "Tent": "/assets/images/gear/tent.png",
  "Sleeping Bag": "/assets/images/gear/sleeping-bag.png",
  "Water Filter": "/assets/images/gear/water-filter.png",
  "Multi-tool": "/assets/images/gear/multi-tool.png",
  "Headlamp": "/assets/images/gear/headlamp.png",
  "Rope": "/assets/images/gear/rope.png",
  default: "/assets/images/gear/default.png"
};

// Helper to convert gear name to filename
const gearNameToFilename = (gearName) => {
  return gearName.toLowerCase().replace(/\s+/g, '-');
};

export const getGearIcon = (gearName, useImage = true) => {
  if (useImage && gearImages[gearName]) {
    return gearImages[gearName];
  }
  return gearIcons[gearName] || gearIcons.default;
};

// Get gear image component props
export const getGearImageProps = (gearName) => {
  const filename = gearNameToFilename(gearName);
  return {
    src: `/assets/images/gear/${filename}.png`,
    alt: `${gearName} gear card`,
    fallback: gearIcons[gearName] || gearIcons.default
  };
};

// Gear card colors
export const gearColors = {
  default: { bg: "bg-blue-50", border: "border-blue-500" },
  equipment: { bg: "bg-blue-50", border: "border-blue-500" },
  tool: { bg: "bg-gray-50", border: "border-gray-500" }
};
