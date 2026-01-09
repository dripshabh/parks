// Main Icons Index
// Central export for all game icons

export * from './resources/index.js';
export * from './trail-sites/index.js';
export * from './canteens/index.js';
export * from './gear/index.js';
export * from './passion/index.js';
export * from './parks/index.js';
export * from './seasons/index.js';
export * from './players/index.js';
export * from './ui/index.js';

// Convenience function to get any icon by category and name
export const getIcon = (category, name) => {
  const iconMaps = {
    resource: () => import('./resources/index.js').then(m => m.getResourceIcon(name)),
    trailSite: () => import('./trail-sites/index.js').then(m => m.getTrailSiteIcon(name)),
    canteen: () => import('./canteens/index.js').then(m => m.getCanteenIcon(name)),
    gear: () => import('./gear/index.js').then(m => m.getGearIcon(name)),
    passion: () => import('./passion/index.js').then(m => m.getPassionIcon(name)),
    park: () => import('./parks/index.js').then(m => m.getParkIcon(name)),
    season: () => import('./seasons/index.js').then(m => m.getSeasonIcon(name)),
    player: () => import('./players/index.js').then(m => m.getPlayerIcon(name)),
    ui: () => import('./ui/index.js').then(m => m.getUIIcon(name)),
  };

  const getter = iconMaps[category];
  if (getter) {
    return getter();
  }
  return Promise.resolve("•");
};
