// Campsite Tiles - Used in Camping Mode variant
// 3 campsite tiles are stacked, each with unique actions on both sides

export const campsiteTiles = [
  {
    id: "campsite_1",
    sideA: {
      name: "Riverside Camp",
      actions: [
        "Gain 2 Water tokens",
        "Take a Photo",
        "Draw a Canteen"
      ],
      icon: "🌊"
    },
    sideB: {
      name: "Mountain Camp",
      actions: [
        "Gain 2 Mountain tokens",
        "Visit a Park",
        "Buy a Gear card"
      ],
      icon: "⛰️"
    }
  },
  {
    id: "campsite_2",
    sideA: {
      name: "Forest Camp",
      actions: [
        "Gain 2 Forest tokens",
        "Gain 1 Wildlife token",
        "Take a Photo"
      ],
      icon: "🌲"
    },
    sideB: {
      name: "Valley Camp",
      actions: [
        "Gain 2 Sunshine tokens",
        "Draw a Canteen",
        "Gain any 1 token"
      ],
      icon: "☀️"
    }
  },
  {
    id: "campsite_3",
    sideA: {
      name: "Lakeside Camp",
      actions: [
        "Gain 1 Water and 1 Sunshine",
        "Visit a Park",
        "Take a Photo"
      ],
      icon: "🏞️"
    },
    sideB: {
      name: "Summit Camp",
      actions: [
        "Gain 1 Mountain and 1 Forest",
        "Buy a Gear card",
        "Gain 1 Wildlife token"
      ],
      icon: "🏔️"
    }
  }
  // TODO: Add remaining campsite tiles from the game
];
