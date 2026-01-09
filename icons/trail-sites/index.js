// Trail Site Icons
// Icons for the 8 trail site tiles

export const trailSiteIcons = {
  forest: "🌲",
  mountain: "⛰️",
  valley: "☀️",
  ocean: "💧",
  vista: "📷",
  wildlife: "🦬",
  lodge: "🏠",
  lookout: "🔭",
  river: "🌊",
  waterfall: "🌊"
};

// Trail site colors
export const trailSiteColors = {
  forest: "green",
  mountain: "gray",
  valley: "yellow",
  ocean: "blue",
  vista: "purple",
  wildlife: "brown",
  lodge: "amber",
  lookout: "indigo",
  river: "cyan",
  waterfall: "blue"
};

export const getTrailSiteIcon = (siteId) => {
  return trailSiteIcons[siteId] || "📍";
};

export const getTrailSiteColor = (siteId) => {
  return trailSiteColors[siteId] || "gray";
};
