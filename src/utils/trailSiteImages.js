// Utility to map trail site IDs to their image filenames
// Trail site images are in /assets/images/trail-sites/

export const trailSiteImageMap = {
  "2_suns": "/assets/images/trail-sites/two_sun_trailsite.png",
  "2_waters": "/assets/images/trail-sites/two_water_trailsite.png",
  "forest": "/assets/images/trail-sites/tree_trailsite.png",
  "mountain": "/assets/images/trail-sites/mountain_trailsite.png",
  "parks": "/assets/images/trail-sites/parks_trailsite.png",
  "canteen_or_photo": "/assets/images/trail-sites/canteen_or_photo_trailsite.png",
  "trade_for_wildlife": "/assets/images/trail-sites/resource_for_wild_trailsite.png",
  "gear_shop": "/assets/images/trail-sites/gearshop_trailsite.png",
  "trail_die": "/assets/images/trail-sites/dice_trailsite.png",
  "trail_end": "/assets/images/trail-sites/trail_end.png", // May need to be added
};

export function getTrailSiteImageUrl(siteId) {
  return trailSiteImageMap[siteId] || null;
}

export function getTrailSiteImageProps(siteId) {
  const imageUrl = getTrailSiteImageUrl(siteId);
  return {
    src: imageUrl,
    alt: `Trail site ${siteId}`,
    fallback: null // Will use site.icon as fallback
  };
}

