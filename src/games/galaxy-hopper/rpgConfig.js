export const rpgConfig = {
  startingStats: {
    hp: 80,
    maxHp: 80,
    attack: 5,
    defense: 4,
    cunning: 6,
    xp: 0,
    level: 1,
    gold: 0, // "credits" in the UI
  },
  // Resource system — context-based drain
  resources: {
    fuel: { start: 100, max: 100, label: "Fuel", icon: "⛽", drainContext: "travel" },
    oxygen: { start: 100, max: 100, label: "O2", icon: "💨", drainContext: "hazard" },
    food: { start: 100, max: 100, label: "Food", icon: "🍱", drainContext: "time" },
  },
  shipStats: {
    warpLevel: 1,
    maxWarp: 100,
    shieldStrength: 0,
  },
  levelThresholds: [0, 40, 100, 180, 280, 400],
  partyMembers: {
    lelania: {
      name: "Lelania",
      role: "Tech Specialist",
      hp: 50,
      maxHp: 50,
      attack: 3,
      defense: 2,
      cunning: 14,
      bond: 0,
      icon: "👩‍💻",
      description: "A teenage computer genius who can make AI systems dance to her tune.",
    },
  },
  bondDescriptions: {
    lelania: {
      stranger: "Glances at you curiously from across the greenhouse.",
      acquaintance: "Shares a laugh about the weird food on Icon 7.",
      companion: "Shows you how to hack a vending machine for free snacks.",
      friend: "Trusts you enough to share her biggest worries.",
      trustedAlly: "Would follow you into deep space without question.",
    },
  },
  // Map item IDs → resource they refill + amount
  resourceRefill: {
    fuel_cell: { resource: "fuel", amount: 25 },
    o2_canister: { resource: "oxygen", amount: 25 },
    food_module: { resource: "food", amount: 25 },
  },
  // Currency label override
  currencyName: "credits",
  currencyIcon: "💳",
};
