// GameEngine — Core game logic and UI
// Platform-agnostic game renderer. Content is passed as props.

import { useEffect, useRef, useState } from "react";

const LESS_IDEAL_PATTERNS = [
  /betray/i,
  /deceive/i,
  /hide the sin/i,
  /revenge/i,
  /steal/i,
  /mock/i,
  /summon her/i,
  /lie/i,
  /retaliate/i,
  /shortcut/i,
  /rush in alone/i,
  /wander off/i,
  /ignore wise counsel/i,
];

const DEFAULT_SETBACK_STEPS = [
  {
    title: "Consequences",
    chapter: "Detour",
    art: "🌫️",
    narrative:
      "That choice creates friction and confusion. Progress slows, and you need to steady yourself before moving on.",
    choices: [
      { text: "Pause and reflect" },
      { text: "Own the mistake" },
      { text: "Choose patience over impulse" },
    ],
  },
  {
    title: "Recovery",
    chapter: "Detour",
    art: "🧭",
    narrative:
      "You rebuild momentum with humility, discipline, and better judgment. The path opens again.",
    choices: [
      { text: "Repair what you can" },
      { text: "Act with integrity" },
      { text: "Continue with renewed focus" },
    ],
  },
];

export default function GameEngine({ content }) {
  const [currentScene, setCurrentScene] = useState("start");
  const [inventory, setInventory] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [valuesScore, setValuesScore] = useState(0);
  const [decisionLog, setDecisionLog] = useState([]);
  const [summaryState, setSummaryState] = useState({
    visible: false,
    finalScore: 0,
  });
  const [setbackState, setSetbackState] = useState({
    active: false,
    step: 0,
    returnScene: "start",
    steps: DEFAULT_SETBACK_STEPS,
  });
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

  const isLessIdealChoice = (choice) => {
    if (choice.isLessIdeal === true) {
      return true;
    }
    if (choice.isLessIdeal === false) {
      return false;
    }
    return LESS_IDEAL_PATTERNS.some((pattern) => pattern.test(choice.text));
  };

  const getContextualFallbacks = (activeScene, fallbackNext) => {
    const sceneText = `${activeScene?.title || ""} ${activeScene?.narrative || ""}`.toLowerCase();

    if (/(sheep|flock|shepherd|lamb)/.test(sceneText)) {
      return {
        prudentChoices: [
          {
            text: "Count and settle the flock before moving on",
            next: fallbackNext,
            moralImpact: 1,
            successText: "Steady care keeps everyone safe and ready.",
          },
          {
            text: "Ask an older shepherd for advice",
            next: fallbackNext,
            moralImpact: 1,
            successText: "Wise guidance helps you make a better decision.",
          },
        ],
        lessIdealChoice: {
          text: "Test your aim too close to the flock",
          next: fallbackNext,
          setback: true,
          isLessIdeal: true,
          successText: "A careless test creates trouble you must work through.",
        },
      };
    }

    if (/(battle|war|giant|sword|army|fight)/.test(sceneText)) {
      return {
        prudentChoices: [
          {
            text: "Study the situation before acting",
            next: fallbackNext,
            moralImpact: 1,
            successText: "Careful planning gives you a stronger path forward.",
          },
          {
            text: "Coordinate with your allies first",
            next: fallbackNext,
            moralImpact: 1,
            successText: "Working together improves your chances.",
          },
        ],
        lessIdealChoice: {
          text: "Rush in alone to prove yourself",
          next: fallbackNext,
          setback: true,
          isLessIdeal: true,
          successText: "Acting on pride creates extra setbacks.",
        },
      };
    }

    if (/(forest|journey|path|river|road|camp)/.test(sceneText)) {
      return {
        prudentChoices: [
          {
            text: "Stay with the group and keep watch",
            next: fallbackNext,
            moralImpact: 1,
            successText: "Sticking together helps everyone move safely.",
          },
          {
            text: "Check your route before moving",
            next: fallbackNext,
            moralImpact: 1,
            successText: "A clear plan prevents avoidable delays.",
          },
        ],
        lessIdealChoice: {
          text: "Wander off from the group to explore alone",
          next: fallbackNext,
          setback: true,
          isLessIdeal: true,
          successText: "You lose time and must regroup before continuing.",
        },
      };
    }

    if (/(king|palace|court|throne|ruler)/.test(sceneText)) {
      return {
        prudentChoices: [
          {
            text: "Speak respectfully and listen first",
            next: fallbackNext,
            moralImpact: 1,
            successText: "Respect and restraint strengthen trust.",
          },
          {
            text: "Seek guidance from a trusted advisor",
            next: fallbackNext,
            moralImpact: 1,
            successText: "Wise counsel leads to steadier outcomes.",
          },
        ],
        lessIdealChoice: {
          text: "Boast and ignore wise counsel",
          next: fallbackNext,
          setback: true,
          isLessIdeal: true,
          successText: "Pride creates consequences you must work through.",
        },
      };
    }

    return {
      prudentChoices: [
        {
          text: "Pause and think it through",
          next: fallbackNext,
          moralImpact: 1,
          successText: "A thoughtful approach keeps you on solid ground.",
        },
        {
          text: "Ask for wise guidance",
          next: fallbackNext,
          moralImpact: 1,
          successText: "Good guidance helps you make a stronger decision.",
        },
      ],
      lessIdealChoice: {
        text: "Take a risky shortcut without thinking",
        next: fallbackNext,
        setback: true,
        isLessIdeal: true,
        successText: "The shortcut creates complications before you can move forward.",
      },
    };
  };

  const getStableChoiceIndex = (seedText, length) => {
    if (length <= 1) {
      return 0;
    }

    let hash = 0;
    for (let i = 0; i < seedText.length; i += 1) {
      hash = (hash * 31 + seedText.charCodeAt(i)) >>> 0;
    }
    return hash % length;
  };

  const buildScenarioSetbackSteps = (choice, activeScene) => {
    const choiceText = (choice?.text || "").toLowerCase();
    const sceneText = `${activeScene?.title || ""} ${activeScene?.narrative || ""}`.toLowerCase();

    if (/(aim too close|flock|sheep|lamb)/.test(choiceText) || /(flock|sheep|lamb)/.test(sceneText)) {
      return [
        {
          title: "A Costly Mistake",
          chapter: "Detour",
          art: "🐑",
          narrative:
            "Your shot goes too close to the flock and one sheep is injured. You carry it home for treatment, losing most of the day. Your brother has to cover your chores while you help with recovery.",
          choices: [
            { text: "Help clean and bandage the wound" },
            { text: "Apologize and take responsibility" },
            { text: "Promise to practice more safely" },
          ],
        },
        {
          title: "Earning Back Trust",
          chapter: "Detour",
          art: "🏠",
          narrative:
            "By evening, the sheep is stable and your family sees your effort to make things right. You return to the field with better judgment and a renewed sense of responsibility.",
          choices: [
            { text: "Finish the remaining chores" },
            { text: "Check every sheep before leaving" },
            { text: "Return to the journey" },
          ],
        },
      ];
    }

    if (/(rush in alone|prove yourself)/.test(choiceText) || /(battle|army|fight|giant)/.test(sceneText)) {
      return [
        {
          title: "Overextended",
          chapter: "Detour",
          art: "🛡️",
          narrative:
            "You move too fast without support and lose your advantage. The moment forces a retreat, costing time and confidence.",
          choices: [
            { text: "Regroup with your allies" },
            { text: "Reassess the plan" },
            { text: "Recover your focus" },
          ],
        },
        {
          title: "Disciplined Return",
          chapter: "Detour",
          art: "🧭",
          narrative:
            "With a calmer strategy and support around you, momentum returns. You are ready to continue with better judgment.",
          choices: [
            { text: "Coordinate before advancing" },
            { text: "Take the wiser route" },
            { text: "Rejoin the main path" },
          ],
        },
      ];
    }

    if (/(wander off|explore alone)/.test(choiceText) || /(forest|journey|path|road|camp|river)/.test(sceneText)) {
      return [
        {
          title: "Lost Time",
          chapter: "Detour",
          art: "🌲",
          narrative:
            "You drift from the group and lose your bearings. By the time you retrace your steps, valuable time has slipped away.",
          choices: [
            { text: "Signal to regroup" },
            { text: "Follow familiar markers back" },
            { text: "Slow down and reorient" },
          ],
        },
        {
          title: "Back on Track",
          chapter: "Detour",
          art: "🗺️",
          narrative:
            "You reconnect with the group and move forward more carefully. The delay is frustrating, but the lesson is clear.",
          choices: [
            { text: "Stay with the group" },
            { text: "Check directions together" },
            { text: "Continue the story" },
          ],
        },
      ];
    }

    if (/(boast|ignore wise counsel)/.test(choiceText) || /(king|palace|court|throne)/.test(sceneText)) {
      return [
        {
          title: "Fractured Trust",
          chapter: "Detour",
          art: "🏛️",
          narrative:
            "Your decision comes off as prideful, and advisors become hesitant to speak honestly. Progress slows while trust is repaired.",
          choices: [
            { text: "Invite honest feedback" },
            { text: "Acknowledge your mistake" },
            { text: "Listen before deciding" },
          ],
        },
        {
          title: "Steady Leadership",
          chapter: "Detour",
          art: "🤝",
          narrative:
            "With humility and better listening, your team regains confidence in your leadership and the work can continue.",
          choices: [
            { text: "Rebuild team alignment" },
            { text: "Choose the prudent plan" },
            { text: "Return to the main storyline" },
          ],
        },
      ];
    }

    return DEFAULT_SETBACK_STEPS;
  };

  const withMinimumChoices = (choices = [], activeScene, includeSetbackOption = true) => {
    const normalized = [...choices];
    const fallbackNext = normalized[0]?.next ?? currentScene;
    const contextual = getContextualFallbacks(activeScene, fallbackNext);

    const hasLessIdeal = normalized.some(
      (choice) => choice.setback === true || isLessIdealChoice(choice),
    );

    if (includeSetbackOption && !hasLessIdeal) {
      const sceneSeed = `${currentScene}|${activeScene?.title || "scene"}`;
      const insertIndex = getStableChoiceIndex(sceneSeed, normalized.length + 1);
      normalized.splice(insertIndex, 0, contextual.lessIdealChoice);
    }

    for (const filler of contextual.prudentChoices) {
      if (normalized.length >= 3) {
        break;
      }
      if (!normalized.some((choice) => choice.text === filler.text)) {
        normalized.push(filler);
      }
    }

    while (normalized.length < 3) {
      normalized.push({
        text: "Move carefully",
        next: fallbackNext,
      });
    }

    return normalized;
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

    const moralImpact =
      choice.moralImpact ?? (choice.setback || isLessIdealChoice(choice) ? -1 : 1);

    const logEntry = {
      sceneTitle: scene.title,
      text: choice.text,
      impact: moralImpact,
    };
    setDecisionLog((prev) => [...prev, logEntry]);

    setValuesScore((prev) => prev + moralImpact);

    if (choice.setback || moralImpact < 0) {
      const scenarioSetbackSteps = choice.setbackSteps || buildScenarioSetbackSteps(choice, scene);
      setScore((prev) => Math.max(0, prev - 10));
      setMessage("That move causes a setback. Work through the detour to regain momentum.");
      setSetbackState({
        active: true,
        step: 0,
        returnScene: choice.next || currentScene,
        steps: scenarioSetbackSteps,
      });
      return;
    }

    const nextScore = score + 10;

    if (choice.endsStory) {
      setScore(nextScore);
      setSummaryState({
        visible: true,
        finalScore: nextScore,
      });
      return;
    }

    setMessage(choice.successText || "");
    setScore(nextScore);
    setCurrentScene(choice.next);
  };

  const handleSetbackProgress = () => {
    if (!setbackState.active) {
      return;
    }

    const activeSetbackSteps = setbackState.steps || DEFAULT_SETBACK_STEPS;

    if (setbackState.step < activeSetbackSteps.length - 1) {
      setSetbackState((prev) => ({ ...prev, step: prev.step + 1 }));
      return;
    }

    const targetScene = setbackState.returnScene || currentScene;
    setSetbackState({
      active: false,
      step: 0,
      returnScene: targetScene,
      steps: DEFAULT_SETBACK_STEPS,
    });
    setScore((prev) => prev + 5);
    setMessage("You recover from the setback and return to the journey.");
    setCurrentScene(targetScene);
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

  const handlePlayAgain = () => {
    setCurrentScene("start");
    setInventory([]);
    setScore(0);
    setMessage("");
    setValuesScore(0);
    setDecisionLog([]);
    setSummaryState({ visible: false, finalScore: 0 });
    setSetbackState({
      active: false,
      step: 0,
      returnScene: "start",
      steps: DEFAULT_SETBACK_STEPS,
    });
    awardedScenesRef.current = new Set();
  };

  if (!scene) {
    return <div style={styles.container}>Scene not found: {currentScene}</div>;
  }

  const activeScene = setbackState.active
    ? (setbackState.steps || DEFAULT_SETBACK_STEPS)[setbackState.step]
    : scene;
  const activeChoices = setbackState.active
    ? activeScene.choices || []
    : withMinimumChoices(activeScene.choices || [], activeScene, true);

  const goodChoices = decisionLog.filter((entry) => entry.impact > 0);
  const badChoices = decisionLog.filter((entry) => entry.impact < 0);

  if (summaryState.visible) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Journey Summary</h1>
          <p style={styles.subtitle}>{metadata.title}</p>
        </div>

        <div style={styles.main}>
          <div style={styles.scene}>
            <h2 style={styles.sceneTitle}>Final Score: {summaryState.finalScore} points</h2>
            <p style={styles.narrative}>
              You completed the story. Here is how your decisions shaped the journey.
            </p>

            <div style={styles.summaryGrid}>
              <div style={styles.summaryCard}>
                <h4 style={styles.summaryHeading}>Strong Choices ({goodChoices.length})</h4>
                {goodChoices.length > 0 ? (
                  <ul style={styles.summaryList}>
                    {goodChoices.slice(-6).map((entry, index) => (
                      <li key={`good-${index}`} style={styles.summaryItem}>
                        <strong>{entry.sceneTitle}:</strong> {entry.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={styles.summaryEmpty}>No strong choices were recorded.</p>
                )}
              </div>

              <div style={styles.summaryCard}>
                <h4 style={styles.summaryHeading}>Setback Choices ({badChoices.length})</h4>
                {badChoices.length > 0 ? (
                  <ul style={styles.summaryList}>
                    {badChoices.slice(-6).map((entry, index) => (
                      <li key={`bad-${index}`} style={styles.summaryItem}>
                        <strong>{entry.sceneTitle}:</strong> {entry.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p style={styles.summaryEmpty}>No setback choices this run.</p>
                )}
              </div>
            </div>

            <div style={styles.buttonRow}>
              <button onClick={handlePlayAgain} style={styles.choiceButton}>
                Play Again →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📖 Book Quest</h1>
        <p style={styles.subtitle}>{metadata.title}</p>
      </div>

      <div style={styles.main}>
        <div style={styles.scene}>
          <div style={styles.art}>{activeScene.art}</div>
          <h2 style={styles.chapter}>{activeScene.chapter}</h2>
          <h3 style={styles.sceneTitle}>{activeScene.title}</h3>
          <p style={styles.narrative}>{activeScene.narrative}</p>

          {inventory.length > 0 && (
            <div style={styles.inventory}>
              <strong>📦 Inventory:</strong> {inventory.map(getItemLabel).join(", ")}
            </div>
          )}

          {!setbackState.active && scene.itemInteractions?.length > 0 && (
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
            {activeChoices.map((choice, i) => (
              <button
                key={i}
                onClick={() =>
                  setbackState.active ? handleSetbackProgress() : handleChoice(choice)
                }
                style={styles.choiceButton}
              >
                {choice.text} →
              </button>
            ))}
          </div>

          {message && <p style={styles.message}>{message}</p>}

          <div style={styles.footer}>
            <p>
              Progress: {score} points | Scenes explored: {Math.floor(score / 10) + 1} |
              Momentum: {valuesScore >= 0 ? "Steady" : "Recovering"}
            </p>
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
  summaryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
    marginTop: "10px",
  },
  summaryCard: {
    background: "rgba(201, 168, 76, 0.08)",
    border: "1px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "10px",
    padding: "12px",
  },
  summaryHeading: {
    margin: "0 0 8px",
    color: "#c9a84c",
    fontSize: "15px",
  },
  summaryList: {
    margin: 0,
    paddingLeft: "18px",
    display: "grid",
    gap: "8px",
  },
  summaryItem: {
    color: "#d4ccc0",
    fontSize: "14px",
    lineHeight: 1.4,
  },
  summaryEmpty: {
    margin: 0,
    color: "#a0826d",
    fontSize: "14px",
  },
  buttonRow: {
    marginTop: "18px",
    display: "flex",
    justifyContent: "center",
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
