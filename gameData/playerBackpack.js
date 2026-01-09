// Player Backpack - Structure for tracking player resources
// Players can carry up to 12 tokens in their backpack

export const createPlayerBackpack = () => {
  return {
    tree: 0,        // Forest tokens
    water: 0,       // Water tokens
    sun: 0,         // Sunshine tokens
    mountain: 0,    // Mountain tokens
    wildlife: 0,    // Wildlife tokens (can substitute for any token)
    photos: 0,      // Photo tokens (worth 1 point each)
    totalTokens: 0, // Total count (max 12)
    maxCapacity: 12
  };
};

// Helper functions for backpack management
export const addToBackpack = (backpack, resources) => {
  const updated = { ...backpack };
  Object.entries(resources).forEach(([resource, count]) => {
    if (updated[resource] !== undefined) {
      updated[resource] += count;
    }
  });
  updated.totalTokens = Object.values(updated).reduce((sum, val) => {
    return typeof val === 'number' && val !== updated.maxCapacity ? sum + val : sum;
  }, 0);
  
  // Enforce max capacity
  if (updated.totalTokens > updated.maxCapacity) {
    const excess = updated.totalTokens - updated.maxCapacity;
    // Remove excess tokens (simplified - in real game player chooses)
    updated.totalTokens = updated.maxCapacity;
  }
  
  return updated;
};

export const removeFromBackpack = (backpack, resources) => {
  const updated = { ...backpack };
  Object.entries(resources).forEach(([resource, count]) => {
    if (updated[resource] !== undefined) {
      updated[resource] = Math.max(0, updated[resource] - count);
    }
  });
  updated.totalTokens = Object.values(updated).reduce((sum, val) => {
    return typeof val === 'number' && val !== updated.maxCapacity ? sum + val : sum;
  }, 0);
  return updated;
};
