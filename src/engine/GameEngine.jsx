// GameEngine — Core game logic and UI
// Platform-agnostic game renderer. Content is passed as props.

import { useState } from "react";

export default function GameEngine({ content }) {
  const [currentScene, setCurrentScene] = useState("start");
  const [inventory, setInventory] = useState([]);
  const [score, setScore] = useState(0);

  // Unpack content modules
  const { metadata, storyNodes } = content;
  const scene = storyNodes[currentScene];

  const handleChoice = (nextScene) => {
    if (scene.itemsGained) {
      setInventory([...inventory, ...scene.itemsGained]);
    }
    setScore(score + 10);
    setCurrentScene(nextScene);
  };

  if (!scene) {
    return <div style={styles.container}>Scene not found: {currentScene}</div>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📖 Book Quest</h1>
        <p style={styles.subtitle}>{metadata.title}</p>
      </div>

      <div style={styles.main}>
        <div style={styles.scene}>
          <div style={styles.art}>{scene.art}</div>
          <h2 style={styles.chapter}>{scene.chapter}</h2>
          <h3 style={styles.sceneTitle}>{scene.title}</h3>
          <p style={styles.narrative}>{scene.narrative}</p>

          {inventory.length > 0 && (
            <div style={styles.inventory}>
              <strong>📦 Inventory:</strong> {inventory.join(", ")}
            </div>
          )}

          <div style={styles.choices}>
            {scene.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(choice.next)}
                style={styles.choiceButton}
              >
                {choice.text} →
              </button>
            ))}
          </div>

          <div style={styles.footer}>
            <p>Progress: {score} points | Scenes explored: {Math.floor(score / 10) + 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    color: "#e8d4b8",
    fontFamily: "'Georgia', serif",
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
    paddingTop: "20px",
  },
  title: {
    fontSize: "48px",
    margin: "0 0 10px",
    color: "#c9a84c",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  subtitle: {
    fontSize: "18px",
    color: "#a0826d",
    fontStyle: "italic",
    margin: 0,
  },
  main: {
    maxWidth: "700px",
    margin: "0 auto",
  },
  scene: {
    background: "rgba(45, 40, 60, 0.8)",
    border: "2px solid #c9a84c",
    borderRadius: "12px",
    padding: "40px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  },
  art: {
    fontSize: "80px",
    textAlign: "center",
    marginBottom: "20px",
  },
  chapter: {
    fontSize: "14px",
    color: "#c9a84c",
    textTransform: "uppercase",
    letterSpacing: "2px",
    margin: "0 0 10px",
  },
  sceneTitle: {
    fontSize: "28px",
    color: "#e8d4b8",
    margin: "0 0 20px",
  },
  narrative: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#d4ccc0",
    marginBottom: "20px",
  },
  inventory: {
    background: "rgba(201, 168, 76, 0.1)",
    border: "1px solid #c9a84c",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "20px",
    fontSize: "14px",
    color: "#c9a84c",
  },
  choices: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "30px",
  },
  choiceButton: {
    padding: "14px 20px",
    background: "rgba(201, 168, 76, 0.15)",
    border: "1px solid #c9a84c",
    borderRadius: "8px",
    color: "#e8d4b8",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "inherit",
  },
  footer: {
    marginTop: "20px",
    paddingTop: "20px",
    borderTop: "1px solid rgba(201, 168, 76, 0.3)",
    textAlign: "center",
    color: "#a0826d",
    fontSize: "14px",
  },
};
