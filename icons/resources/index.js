// Resource Icons
// These icons represent the various resource tokens in the game
// Supports both images and emoji fallbacks

export const resourceIcons = {
  tree: "🌲",
  water: "💧",
  sun: "☀️",
  mountain: "⛰️",
  wildlife: "🦬",
  photos: "📷",
  photoAlbums: "📔"
};

// Image paths for resources
export const resourceImages = {
  tree: "/assets/images/resource_tokens/tree_resouce.png", // Note: filename has typo "resouce"
  water: "/assets/images/resource_tokens/water_resource.png",
  sun: "/assets/images/resource_tokens/sun_resource.png",
  mountain: "/assets/images/resource_tokens/mountain_resource.png",
  wildlife: "/assets/images/resource_tokens/wild_resource.png",
  photos: "/assets/images/resource_tokens/photos.png", // May not exist, will fallback to emoji
  photoAlbums: "/assets/images/resource_tokens/photo-albums.png" // May not exist, will fallback to emoji
};

// Icon mapping for easy access - returns image path or emoji fallback
export const getResourceIcon = (resourceType, useImage = true) => {
  if (useImage && resourceImages[resourceType]) {
    return resourceImages[resourceType];
  }
  return resourceIcons[resourceType] || "•";
};

// Get resource image component props
export const getResourceImageProps = (resourceType) => {
  return {
    src: resourceImages[resourceType],
    alt: `${resourceType} resource`,
    fallback: resourceIcons[resourceType] || "•"
  };
};

// Resource colors for UI
export const resourceColors = {
  tree: { bg: "bg-green-700", text: "text-green-700" },
  water: { bg: "bg-blue-500", text: "text-blue-500" },
  sun: { bg: "bg-yellow-400", text: "text-yellow-400" },
  mountain: { bg: "bg-gray-600", text: "text-gray-600" },
  wildlife: { bg: "bg-amber-700", text: "text-amber-700" },
  photos: { bg: "bg-purple-500", text: "text-purple-500" },
};
