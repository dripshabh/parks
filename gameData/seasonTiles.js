// Season Tiles - 12 season tiles (4 Spring, 4 Summer, 4 Fall)
// Each season has a bonus objective and weather pattern

export const seasonTiles = {
  spring: [
    {
      id: "spring_1",
      name: "Spring",
      bonus: "Most tokens collected",
      weatherPattern: "alternating", // Sun and Water alternating
      icon: "🌸"
    },
    {
      id: "spring_2",
      name: "Spring",
      bonus: "Most photos taken",
      weatherPattern: "alternating",
      icon: "🌸"
    },
    {
      id: "spring_3",
      name: "Spring",
      bonus: "Most parks visited",
      weatherPattern: "alternating",
      icon: "🌸"
    },
    {
      id: "spring_4",
      name: "Spring",
      bonus: "Most gear cards collected",
      weatherPattern: "alternating",
      icon: "🌸"
    }
  ],
  summer: [
    {
      id: "summer_1",
      name: "Summer",
      bonus: "Most tokens collected",
      weatherPattern: "sun_heavy", // More sun tokens
      icon: "☀️"
    },
    {
      id: "summer_2",
      name: "Summer",
      bonus: "Most photos taken",
      weatherPattern: "sun_heavy",
      icon: "☀️"
    },
    {
      id: "summer_3",
      name: "Summer",
      bonus: "Most parks visited",
      weatherPattern: "sun_heavy",
      icon: "☀️"
    },
    {
      id: "summer_4",
      name: "Summer",
      bonus: "Most gear cards collected",
      weatherPattern: "sun_heavy",
      icon: "☀️"
    }
  ],
  fall: [
    {
      id: "fall_1",
      name: "Fall",
      bonus: "Most tokens collected",
      weatherPattern: "water_heavy", // More water tokens
      icon: "🍂"
    },
    {
      id: "fall_2",
      name: "Fall",
      bonus: "Most photos taken",
      weatherPattern: "water_heavy",
      icon: "🍂"
    },
    {
      id: "fall_3",
      name: "Fall",
      bonus: "Most parks visited",
      weatherPattern: "water_heavy",
      icon: "🍂"
    },
    {
      id: "fall_4",
      name: "Fall",
      bonus: "Most gear cards collected",
      weatherPattern: "water_heavy",
      icon: "🍂"
    }
  ]
};
