// Trail Site Tiles - 8 tiles that are randomly placed on the trail
// Each tile has an action that players take when landing on it

export const trailSiteTiles = [
  {
    id: "forest",
    name: "Forest",
    action: "Take a Forest token",
    icon: "🌲",
    color: "green",
    resources: { tree: 1 }
  },
  {
    id: "mountain",
    name: "Mountain",
    action: "Take a Mountain token",
    icon: "⛰️",
    color: "gray",
    resources: { mountain: 1 }
  },
  {
    id: "valley",
    name: "Valley",
    action: "Take two Sunshine tokens",
    icon: "☀️☀️",
    color: "yellow",
    resources: { sun: 2 }
  },
  {
    id: "ocean",
    name: "Ocean",
    action: "Take two Water tokens",
    icon: "💧💧",
    color: "blue",
    resources: { water: 2 }
  },
  {
    id: "parks",
    name: "Parks",
    action: "Reserve or Visit a Park",
    icon: "🏞️",
    color: "purple",
    special: true
  },
  {
    id: "wildlife",
    name: "Wildlife",
    action: "Turn in any 1 token to gain a Wildlife token",
    icon: "🦬",
    color: "brown",
    special: true,
    cost: { any: 1 },
    resources: { wildlife: 1 }
  },
  {
    id: "gearShop",
    name: "Gear Shop",
    action: "Buy a Gear card",
    icon: "🎒",
    color: "indigo",
    special: true
  },
  {
    id: "dice",
    name: "Dice",
    action: "Roll the dice to move",
    icon: "�",
    color: "cyan",
    special: true
  }
];
