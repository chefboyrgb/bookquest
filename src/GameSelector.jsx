// GameSelector — Choose which adventure to play
// Displays all available games and routes to the selected one

import { useState } from "react";
import GameEngine from "./engine/GameEngine.jsx";
import { AVAILABLE_GAMES } from "./games/registry.js";
import cookedIcon from "./img/cooked.png";

export default function GameSelector() {
  const enabledGames = Object.values(AVAILABLE_GAMES).filter(
    (game) => game.enabled !== false,
  );
  const [selectedGame, setSelectedGame] = useState(enabledGames[0]?.id ?? null);
  const [gameStarted, setGameStarted] = useState(false);

  const currentGame =
    enabledGames.find((game) => game.id === selectedGame) ?? enabledGames[0];

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
          {enabledGames.map((game) => (
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

          {enabledGames.length === 0 && (
            <p style={styles.noGamesText}>
              No games are enabled yet. Toggle `enabled: true` in
              src/games/registry.js.
            </p>
          )}
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={() => currentGame && setGameStarted(true)}
            style={{
              ...styles.startButton,
              ...(currentGame ? {} : styles.startButtonDisabled),
            }}
            disabled={!currentGame}
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
  if (!currentGame) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Book Quest</h1>
          <p style={styles.subtitle}>No enabled games found</p>
        </div>
      </div>
    );
  }

  return <GameEngine content={currentGame.content} />;
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    color: "#e8d4b8",
    fontFamily: "'Georgia', serif",
    padding: "clamp(18px, 4vw, 40px) clamp(12px, 4vw, 24px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "clamp(24px, 6vw, 60px)",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
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
    fontSize: "clamp(32px, 7vw, 56px)",
    margin: "0 0 10px",
    color: "#c9a84c",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  subtitle: {
    fontSize: "clamp(16px, 3.5vw, 24px)",
    color: "#a0826d",
    fontStyle: "italic",
    margin: 0,
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    gap: "clamp(14px, 3vw, 30px)",
    maxWidth: "1000px",
    margin: "0 auto clamp(20px, 4vw, 40px)",
  },
  gameCard: {
    background: "rgba(45, 40, 60, 0.6)",
    border: "2px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "12px",
    padding: "clamp(22px, 4vw, 40px) clamp(14px, 3vw, 20px)",
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
    fontSize: "clamp(48px, 12vw, 80px)",
    marginBottom: "20px",
  },
  gameTitle: {
    fontSize: "clamp(18px, 4.5vw, 24px)",
    color: "#c9a84c",
    margin: "10px 0",
  },
  gameAuthor: {
    fontSize: "14px",
    color: "#a0826d",
    margin: "0",
  },
  noGamesText: {
    textAlign: "center",
    color: "#c9a84c",
    fontSize: "16px",
    padding: "20px",
    background: "rgba(45, 40, 60, 0.6)",
    border: "1px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "12px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  startButton: {
    padding: "14px clamp(20px, 6vw, 40px)",
    background: "linear-gradient(135deg, #c9a84c 0%, #e8c84c 100%)",
    border: "none",
    borderRadius: "8px",
    color: "#1a1a2e",
    fontSize: "clamp(16px, 3.5vw, 18px)",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "inherit",
    boxShadow: "0 4px 15px rgba(201, 168, 76, 0.4)",
  },
  startButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  footer: {
    position: "fixed",
    bottom: "max(12px, env(safe-area-inset-bottom))",
    right: "max(12px, env(safe-area-inset-right))",
    display: "flex",
    alignItems: "center",
    zIndex: 10,
  },
  footerLink: {
    display: "inline-block",
    textDecoration: "none",
    transition: "transform 0.3s",
  },
  footerIcon: {
    width: "clamp(72px, 20vw, 120px)",
    height: "clamp(72px, 20vw, 120px)",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(201, 168, 76, 0.3)",
    transition: "all 0.3s",
    cursor: "pointer",
  },
};
