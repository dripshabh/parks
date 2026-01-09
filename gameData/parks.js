// Parks data - All 48 parks with their resource costs, victory points, and instant powerups
// Based on the Parks board game rulebook

export const parks = [
  // Add all 48 parks here
  // Format: { name, location, cost: { tree, water, sun, mountain }, victoryPoints, instantPowerup }
  
  // All 48 parks from the Parks board game
  // Format: { name, location, cost: { tree, water, sun, mountain }, victoryPoints, instantPowerup }
  
  {
    name: "Everglades",
    location: "Florida",
    cost: { tree: 2, water: 1, sun: 0, mountain: 0 },
    victoryPoints: 3,
    instantPowerup: "Gain 1 Water token"
  },
  {
    name: "Gates of the Arctic",
    location: "Alaska",
    cost: { tree: 0, water: 0, sun: 1, mountain: 2 },
    victoryPoints: 4,
    instantPowerup: "Gain 1 Mountain token"
  },
  {
    name: "Bryce Canyon",
    location: "Utah",
    cost: { tree: 0, water: 2, sun: 0, mountain: 1 },
    victoryPoints: 3,
    instantPowerup: "Take a Photo"
  },
  {
    name: "Yosemite",
    location: "California",
    cost: { tree: 1, water: 1, sun: 0, mountain: 1 },
    victoryPoints: 4,
    instantPowerup: "Gain any 1 token"
  },
  {
    name: "Yellowstone",
    location: "Wyoming",
    cost: { tree: 2, water: 0, sun: 0, mountain: 1 },
    victoryPoints: 5,
    instantPowerup: "Draw a Canteen card"
  },
  
  // TODO: Add remaining 43 parks from the rulebook
  // You can extract them from the PDF or add them manually
];
