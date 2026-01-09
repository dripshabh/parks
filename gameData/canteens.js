// Canteen Tokens - 24 canteen tokens that players can collect
// Each canteen can be filled with water to activate its ability

export const canteens = [
  {
    id: "canteen_1",
    name: "Basic Canteen",
    ability: "Gain 1 token of your choice",
    waterCost: 1,
    icon: "💧"
  },
  {
    id: "canteen_2",
    name: "Sturdy Canteen",
    ability: "Gain 2 tokens of your choice",
    waterCost: 2,
    icon: "💧"
  },
  {
    id: "canteen_3",
    name: "Insulated Canteen",
    ability: "Take a Photo",
    waterCost: 1,
    icon: "📷"
  },
  {
    id: "canteen_4",
    name: "Large Canteen",
    ability: "Gain 1 Wildlife token",
    waterCost: 2,
    icon: "🦬"
  },
  {
    id: "canteen_5",
    name: "Lightweight Canteen",
    ability: "Move 1 extra space",
    waterCost: 1,
    icon: "🥾"
  },
  {
    id: "canteen_6",
    name: "Premium Canteen",
    ability: "Draw a Gear card",
    waterCost: 2,
    icon: "🎒"
  },
  // TODO: Add remaining 18 canteens from the game
  // Each canteen has unique abilities when filled with water
];
