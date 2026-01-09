// Utility to map component IDs to their image filenames
// Component images are in /assets/images/components/

export const componentImageMap = {
  campfire_lit: "/assets/images/components/campfire_lit.png",
  campfire_extinguished: "/assets/images/components/campfire_extinguished.png",
  canteen_token: "/assets/images/components/canteen_token.png",
  first_hiker_token: "/assets/images/components/first_hiker_token.png",
  shutterbug_badge: "/assets/images/components/shutterbug_badge.png",
  shutterbug_token: "/assets/images/components/shutterbug_token.png",
};

export function getComponentImageUrl(componentId) {
  return componentImageMap[componentId] || null;
}

export function getComponentImageProps(componentId) {
  const imageUrl = getComponentImageUrl(componentId);
  return {
    src: imageUrl,
    alt: `Component ${componentId}`,
    fallback: null
  };
}
