// Utility to map player colors to hiker image filenames
// Hiker images are in /assets/images/hikers/

export const hikerImageMap = {
  yellow: "/assets/images/hikers/yellow_hiker.png",
  red: "/assets/images/hikers/red_hiker.png",
  green: "/assets/images/hikers/green_hiker.png",
  blue: "/assets/images/hikers/blue_hiker.png",
};

export function getHikerImageUrl(playerColor) {
  return hikerImageMap[playerColor] || "/assets/images/hikers/white_hiker.png";
}

export function getHikerImageProps(color) {
  const imageUrl = getHikerImageUrl(color);
  return {
    src: imageUrl,
    alt: `${color} hiker`,
    fallback: "🚶"
  };
}

