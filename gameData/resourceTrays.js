// Resource Trays - Two trays that hold all resource tokens
// Each tray contains all token types and photos

export const createResourceTray = () => {
  return {
    tree: 15,        // Forest tokens
    water: 30,       // Water tokens
    sun: 30,         // Sunshine tokens
    mountain: 15,    // Mountain tokens
    wildlife: 14,    // Wildlife tokens (12 unique shapes + extras)
    photos: 28,      // Photo tokens (worth 1 point each)
    // Note: In 2nd edition, there are also Photo Album tokens
    photoAlbums: 8   // Photo Album tokens
  };
};

// Initial supply for a new game
export const initialResourceSupply = createResourceTray();

// Helper to check if resources are available
export const hasResources = (tray, resources) => {
  return Object.entries(resources).every(([resource, count]) => {
    if (resource === 'any' || resource === 'wildlife') {
      // Wildlife can substitute for any token
      return (tray.wildlife || 0) + (tray[resource] || 0) >= count;
    }
    return (tray[resource] || 0) >= count;
  });
};

// Helper to take resources from tray
export const takeFromTray = (tray, resources) => {
  const updated = { ...tray };
  Object.entries(resources).forEach(([resource, count]) => {
    if (updated[resource] !== undefined) {
      updated[resource] = Math.max(0, updated[resource] - count);
    }
  });
  return updated;
};

// Helper to return resources to tray
export const returnToTray = (tray, resources) => {
  const updated = { ...tray };
  Object.entries(resources).forEach(([resource, count]) => {
    if (updated[resource] !== undefined) {
      updated[resource] += count;
    }
  });
  return updated;
};
