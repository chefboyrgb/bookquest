// GameSelector — Choose which adventure to play
// Displays all available games and routes to the selected one

import { useState } from "react";
import GameEngine from "./engine/GameEngine.jsx";
import NarniaGame from "./games/narnia/index.js";
import DavidGame from "./games/david/index.js";
import cookedIcon from "./img/cooked.png";

const AVAILABLE_GAMES = {
  narnia: {
    id: "narnia",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    emoji: "🦁",
    content: NarniaGame,
  },
  david: {
    id: "david",
    title: "The Life of David",
    author: "Biblical Text (1 & 2 Samuel)",
    emoji: "⚔️",
    content: DavidGame,
  },
  // Add more games here in the future:
  // charlotte: { ... },
  // wrinkle: { ... },
};

export default function GameSelector() {
  const [selectedGame, setSelectedGame] = useState("narnia");
  const [gameStarted, setGameStarted] = useState(false);

  const currentGame = AVAILABLE_GAMES[selectedGame];

  // Show game selection screen
  if (!gameStarted) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div></div>
            <div>
              <h1 style={styles.title}>📚 Book Quest</h1>
              <p style={styles.subtitle}>Choose Your Adventure</p>
            </div>
            <a
              href="https://buymeacoffee.com/chefboyrgb"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.donateButton}
              title="Support BookQuest"
            >
              ☕ Donate
            </a>
          </div>
        </div>

        <div style={styles.gameGrid}>
          {Object.values(AVAILABLE_GAMES).map((game) => (
            <button
              key={game.id}
              onClick={() => setSelectedGame(game.id)}
              style={{
                ...styles.gameCard,
                ...(selectedGame === game.id ? styles.gameCardSelected : {}),
              }}
            >
              <div style={styles.gameEmoji}>{game.emoji}</div>
              <h3 style={styles.gameTitle}>{game.title}</h3>
              <p style={styles.gameAuthor}>by {game.author}</p>
            </button>
          ))}
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={() => setGameStarted(true)}
            style={styles.startButton}
          >
            Start Adventure →
          </button>
        </div>

        <div style={styles.footer}>
          <a
            href="https://buymeacoffee.com/chefboyrgb"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.footerLink}
            title="Support BookQuest"
          >
            <img src={cookedIcon} alt="Support" style={styles.footerIcon} />
          </a>
        </div>
      </div>
    );
  }

  // Show selected game
  return <GameEngine content={currentGame.content} />;
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    color: "#e8d4b8",
    fontFamily: "'Georgia', serif",
    padding: "40px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "60px",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  donateButton: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    border: "none",
    borderRadius: "6px",
    color: "#1a1a2e",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s",
    boxShadow: "0 2px 8px rgba(251, 191, 36, 0.3)",
    whiteSpace: "nowrap",
  },
  title: {
    fontSize: "56px",
    margin: "0 0 10px",
    color: "#c9a84c",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  subtitle: {
    fontSize: "24px",
    color: "#a0826d",
    fontStyle: "italic",
    margin: 0,
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
    maxWidth: "1000px",
    margin: "0 auto 40px",
  },
  gameCard: {
    background: "rgba(45, 40, 60, 0.6)",
    border: "2px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "12px",
    padding: "40px 20px",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "16px",
  },
  gameCardSelected: {
    background: "rgba(201, 168, 76, 0.15)",
    border: "2px solid #c9a84c",
    boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
  },
  gameEmoji: {
    fontSize: "80px",
    marginBottom: "20px",
  },
  gameTitle: {
    fontSize: "24px",
    color: "#c9a84c",
    margin: "10px 0",
  },
  gameAuthor: {
    fontSize: "14px",
    color: "#a0826d",
    margin: "0",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  startButton: {
    padding: "16px 40px",
    background: "linear-gradient(135deg, #c9a84c 0%, #e8c84c 100%)",
    border: "none",
    borderRadius: "8px",
    color: "#1a1a2e",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "inherit",
    boxShadow: "0 4px 15px rgba(201, 168, 76, 0.4)",
  },
  footer: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    display: "flex",
    alignItems: "center",
  },
  footerLink: {
    display: "inline-block",
    textDecoration: "none",
    transition: "transform 0.3s",
  },
  footerIcon: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(201, 168, 76, 0.3)",
    transition: "all 0.3s",
    cursor: "pointer",
  },
};
