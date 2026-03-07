// GameEngine — Core game logic and UI
// Platform-agnostic game renderer. Content is passed as props.

import { useEffect, useRef, useState } from "react";

export default function GameEngine({ content }) {
  const [currentScene, setCurrentScene] = useState("start");
  const [inventory, setInventory] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const awardedScenesRef = useRef(new Set());

  // Unpack content modules
  const { metadata, storyNodes, items = {} } = content;
  const scene = storyNodes[currentScene];

  useEffect(() => {
    if (!scene || !scene.itemsGained || awardedScenesRef.current.has(currentScene)) {
      return;
    }

    setInventory((prev) => Array.from(new Set([...prev, ...scene.itemsGained])));
    awardedScenesRef.current.add(currentScene);
  }, [currentScene, scene]);

  const hasRequiredItems = (requiredItems = []) =>
    requiredItems.every((itemId) => inventory.includes(itemId));

  const getMissingItems = (requiredItems = []) =>
    requiredItems.filter((itemId) => !inventory.includes(itemId));

  const getItemLabel = (itemId) => {
    const item = items[itemId];
    if (!item) {
      return itemId;
    }
    return `${item.icon ? `${item.icon} ` : ""}${item.name}`;
  };

  const handleChoice = (choice) => {
    const requiredItems = choice.requiresItems || (choice.requiresItem ? [choice.requiresItem] : []);

    if (!hasRequiredItems(requiredItems)) {
      const missingItems = getMissingItems(requiredItems).map(getItemLabel).join(", ");
      setMessage(choice.lockedText || `You need ${missingItems} to do that.`);
      return;
    }

    if (choice.consumesItems?.length) {
      setInventory((prev) => prev.filter((itemId) => !choice.consumesItems.includes(itemId)));
    }

    setMessage(choice.successText || "");
    setScore((prev) => prev + 10);
    setCurrentScene(choice.next);
  };

  const handleItemInteraction = (interaction) => {
    if (!inventory.includes(interaction.itemId)) {
      setMessage(interaction.lockedText || `You need ${getItemLabel(interaction.itemId)}.`);
      return;
    }

    if (interaction.consumeItem) {
      setInventory((prev) => prev.filter((itemId) => itemId !== interaction.itemId));
    }

    setMessage(interaction.successText || "");
    setScore((prev) => prev + 10);
    setCurrentScene(interaction.next);
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
              <strong>📦 Inventory:</strong> {inventory.map(getItemLabel).join(", ")}
            </div>
          )}

          {scene.itemInteractions?.length > 0 && (
            <div style={styles.interactions}>
              <h4 style={styles.interactionsTitle}>Use an item:</h4>
              <div style={styles.choices}>
                {scene.itemInteractions.map((interaction, i) => (
                  <button
                    key={`interaction-${i}`}
                    onClick={() => handleItemInteraction(interaction)}
                    style={styles.choiceButton}
                  >
                    {`${getItemLabel(interaction.itemId)} — ${interaction.text}`} →
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={styles.choices}>
            {scene.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(choice)}
                style={styles.choiceButton}
              >
                {choice.text} →
              </button>
            ))}
          </div>

          {message && <p style={styles.message}>{message}</p>}

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
    padding: "clamp(12px, 3vw, 20px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "clamp(20px, 5vw, 40px)",
    paddingTop: "20px",
  },
  title: {
    fontSize: "clamp(28px, 7vw, 48px)",
    margin: "0 0 10px",
    color: "#c9a84c",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  subtitle: {
    fontSize: "clamp(14px, 3vw, 18px)",
    color: "#a0826d",
    fontStyle: "italic",
    margin: 0,
  },
  main: {
    width: "100%",
    maxWidth: "780px",
    margin: "0 auto",
  },
  scene: {
    background: "rgba(45, 40, 60, 0.8)",
    border: "2px solid #c9a84c",
    borderRadius: "12px",
    padding: "clamp(16px, 4.5vw, 40px)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
  },
  art: {
    fontSize: "clamp(46px, 12vw, 80px)",
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
    fontSize: "clamp(22px, 5vw, 28px)",
    color: "#e8d4b8",
    margin: "0 0 20px",
  },
  narrative: {
    fontSize: "clamp(15px, 3.8vw, 18px)",
    lineHeight: "1.7",
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
  interactions: {
    marginTop: "20px",
  },
  interactionsTitle: {
    margin: "0 0 10px",
    color: "#c9a84c",
    fontSize: "15px",
    letterSpacing: "0.5px",
  },
  choiceButton: {
    padding: "14px 20px",
    background: "rgba(201, 168, 76, 0.15)",
    border: "1px solid #c9a84c",
    borderRadius: "8px",
    color: "#e8d4b8",
    fontSize: "clamp(14px, 3.5vw, 16px)",
    cursor: "pointer",
    transition: "all 0.3s",
    fontFamily: "inherit",
  },
  message: {
    marginTop: "16px",
    color: "#f3d27a",
    background: "rgba(201, 168, 76, 0.12)",
    border: "1px solid rgba(201, 168, 76, 0.35)",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "14px",
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
