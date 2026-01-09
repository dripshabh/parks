// Utility to map canteen types to their image filenames
// Canteen images are in /assets/images/canteen/

export const canteenImageMap = {
  "2_suns": "/assets/images/canteen/2sun_canteenpower.png",
  "2_waters": "/assets/images/canteen/2water_canteenpower.png",
  "forest": "/assets/images/canteen/tree_canteenpower.png",
  "mountain": "/assets/images/canteen/mountain_canteenpower.png",
  "trade_for_wildlife": "/assets/images/canteen/1genericforwild_canteenpower.png",
  "trade_for_photo": "/assets/images/canteen/photo_canteenpower.png",
  "parks": "/assets/images/canteen/parks_canteenpower.png",
  "backside": "/assets/images/canteen/canteenpower_backside.png"
};

export function getCanteenImageUrl(canteenName) {
  // Map canteen names to image keys
  const nameToKey = {
    "2 Suns": "2_suns",
    "2 Waters": "2_waters",
    "Forest": "forest",
    "Mountain": "mountain",
    "Trade for Wildlife": "trade_for_wildlife",
    "Trade for Photo": "trade_for_photo"
  };
  
  const key = nameToKey[canteenName] || "backside";
  return canteenImageMap[key] || canteenImageMap.backside;
}

// Get available canteen types with counts
export function getCanteenTypesWithCounts(allCanteens) {
  const counts = {};
  allCanteens.forEach(canteen => {
    const name = canteen.name || "Unknown";
    counts[name] = (counts[name] || 0) + 1;
  });
  
  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count); // Sort by count descending
}

export function getCanteenImageProps(canteenName) {
  const imageUrl = getCanteenImageUrl(canteenName);
  return {
    src: imageUrl,
    alt: `Canteen ${canteenName}`,
    fallback: "💧"
  };
}

