import NarniaGame from "./narnia/index.js";
import DavidGame from "./david/index.js";

const isLocalDevelopment = import.meta.env.DEV;

export const AVAILABLE_GAMES = {
  narnia: {
    id: "narnia",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    emoji: "🦁",
    enabled: isLocalDevelopment,
    content: NarniaGame,
  },
  david: {
    id: "david",
    title: "The Life of David",
    author: "Biblical Text (1 & 2 Samuel)",
    emoji: "⚔️",
    enabled: true,
    content: DavidGame,
  },
  // Add more games here in the future:
  // charlotte: { ... enabled: true },
  // wrinkle: { ... enabled: false },
};
