// Gear cards data
export const gearCards = [
  {
    name: "Hiking Boots",
    icon: "🥾",
    cost: { tree: 0, water: 0, sun: 1, mountain: 1 },
    ability: "Move 1 extra space on your turn"
  },
  {
    name: "Binoculars",
    icon: "🔭",
    cost: { tree: 1, water: 0, sun: 1, mountain: 0 },
    ability: "See the next 2 trail sites before moving"
  },
  {
    name: "Journal",
    icon: "📔",
    cost: { tree: 0, water: 1, sun: 1, mountain: 0 },
    ability: "Take an extra Photo when visiting Vista"
  },
  {
    name: "Compass",
    icon: "🧭",
    cost: { tree: 1, water: 1, sun: 0, mountain: 0 },
    ability: "Reroll resource tokens once per turn"
  },
  // TODO: Add remaining gear cards (36 total)
];
