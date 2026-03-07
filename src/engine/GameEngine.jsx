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
  const [resultScreen, setResultScreen] = useState({
    active: false,
    text: "",
    nextScene: null,
    endsStory: false,
    finalScore: 0,
  });
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

  // RPG state (active only when metadata.gameType === 'rpg')
  const isRPG = content.metadata?.gameType === "rpg";
  const [playerName, setPlayerName] = useState("");
  const [nameInputValue, setNameInputValue] = useState("");
  const [rpgStats, setRpgStats] = useState(() =>
    content.metadata?.gameType === "rpg" && content.rpgConfig?.startingStats
      ? { ...content.rpgConfig.startingStats }
      : null,
  );
  const [party, setParty] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [battleState, setBattleState] = useState({
    active: false,
    encounter: null,
  });

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

  // === RPG Helper Functions ===

  const getHealthStatus = (hp, maxHp) => {
    const pct = hp / maxHp;
    if (pct >= 0.75) return { label: "Strong", color: "#4ade80" };
    if (pct >= 0.5) return { label: "Fatigued", color: "#fbbf24" };
    if (pct >= 0.25) return { label: "Wounded", color: "#f97316" };
    if (pct > 0) return { label: "Critical", color: "#ef4444" };
    return { label: "Fallen", color: "#991b1b" };
  };

  const getPlayerHealthNarrative = () => {
    if (!isRPG || !rpgStats) return null;
    const pct = rpgStats.hp / rpgStats.maxHp;
    if (pct >= 0.75) return null;
    if (pct >= 0.5)
      return "⚠️ Your muscles ache and small cuts sting with each movement.";
    if (pct >= 0.25)
      return "⚠️ You're limping now. Every breath is labored and your vision blurs.";
    return "⚠️ Your body is failing. Each step could be your last without healing.";
  };

  const getBondLevel = (bond) => {
    if (bond >= 80) return "trustedAlly";
    if (bond >= 60) return "friend";
    if (bond >= 40) return "companion";
    if (bond >= 20) return "acquaintance";
    return "stranger";
  };

  const getBondLabel = (bond) => {
    if (bond >= 80) return "Trusted Ally";
    if (bond >= 60) return "Friend";
    if (bond >= 40) return "Companion";
    if (bond >= 20) return "Acquaintance";
    return "Stranger";
  };

  const getBondFlavor = (memberId, bond) => {
    const descs = content.rpgConfig?.bondDescriptions?.[memberId];
    if (!descs) return "";
    const level = getBondLevel(bond);
    return descs[level] || "";
  };

  const calculatePartyPower = (stat = "attack") => {
    if (!rpgStats) return 0;
    const playerStat = rpgStats[stat] || 0;
    const partyStat = party.reduce(
      (sum, m) => sum + (m.hp > 0 ? m[stat] || 0 : 0),
      0,
    );
    return playerStat + partyStat;
  };

  const formatNarrative = (text) => {
    if (!text) return "";
    if (!isRPG || !playerName) return text;
    return text.replace(/\{playerName\}/g, playerName);
  };

  const handleBattleAction = (action) => {
    const { encounter } = battleState;
    if (!encounter || !rpgStats) return;

    const partyPower = calculatePartyPower("attack");
    const ratio = partyPower / encounter.enemyPower;

    setBattleState({ active: false, encounter: null });

    if (action === "fight") {
      if (ratio >= 0.7) {
        // WIN — damage inversely proportional to power ratio
        const rawDamage = Math.max(5, Math.round(25 * (1 - (ratio - 0.7))));
        const playerDamage = Math.max(0, rawDamage - Math.floor(rpgStats.defense * 0.3));
        const xpGain = (encounter.xpReward || 0) + Math.round(encounter.enemyPower * 1.2);
        const goldGain = encounter.goldReward || 0;

        const newHp = Math.max(1, rpgStats.hp - playerDamage);

        setRpgStats((prev) => ({
          ...prev,
          hp: newHp,
          xp: prev.xp + xpGain,
          gold: prev.gold + goldGain,
        }));

        // Party takes damage and gains bond from combat
        setParty((prev) =>
          prev.map((m) => ({
            ...m,
            hp: Math.max(0, m.hp - Math.round(playerDamage * 0.6)),
            bond: Math.min(100, m.bond + 5),
          })),
        );

        setScore((prev) => prev + 15);
        setResultScreen({
          active: true,
          text: encounter.winText || "Victory! Your party stands triumphant.",
          nextScene: encounter.winNext,
          endsStory: false,
          finalScore: 0,
        });
      } else {
        // LOSE
        if (encounter.fatal) {
          setRpgStats((prev) => ({ ...prev, hp: 0 }));
          setGameOver(true);
          return;
        }
        const damage = Math.round(encounter.enemyPower * 0.6);
        const newHp = Math.max(1, rpgStats.hp - damage);
        setRpgStats((prev) => ({ ...prev, hp: newHp }));
        setParty((prev) =>
          prev.map((m) => ({
            ...m,
            hp: Math.max(0, m.hp - Math.round(damage * 0.5)),
          })),
        );
        setResultScreen({
          active: true,
          text: encounter.loseText || "You are overwhelmed and beaten back.",
          nextScene: encounter.loseNext || currentScene,
          endsStory: false,
          finalScore: 0,
        });
      }
    } else if (action === "flee") {
      const totalCunning = calculatePartyPower("cunning");
      const fleeDiff = encounter.fleeDifficulty || 8;
      let fleeText;

      if (totalCunning >= fleeDiff) {
        fleeText = "You manage to disengage and retreat to safety.";
      } else {
        const damage = Math.round(encounter.enemyPower * 0.25);
        setRpgStats((prev) => ({
          ...prev,
          hp: Math.max(1, prev.hp - damage),
        }));
        fleeText = "You escape, but take hits as you flee.";
      }
      setResultScreen({
        active: true,
        text: fleeText,
        nextScene: encounter.fleeNext || currentScene,
        endsStory: false,
        finalScore: 0,
      });
    }
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

    // RPG: Gold requirement
    if (isRPG && choice.requiresGold && rpgStats && rpgStats.gold < choice.requiresGold) {
      setMessage(choice.failText || `You need ${choice.requiresGold} gold. You only have ${rpgStats.gold}.`);
      return;
    }

    // RPG: Cunning requirement (player + alive party members)
    if (isRPG && choice.requiresCunning && rpgStats) {
      const totalCunning = rpgStats.cunning + party.reduce((s, m) => s + (m.hp > 0 ? m.cunning : 0), 0);
      if (totalCunning < choice.requiresCunning) {
        setMessage(choice.failText || "Your words fall flat. You'll need more cunning for that approach.");
        return;
      }
    }

    // RPG: Attack requirement
    if (isRPG && choice.requiresAttack && rpgStats) {
      const totalAttack = rpgStats.attack + party.reduce((s, m) => s + (m.hp > 0 ? m.attack : 0), 0);
      if (totalAttack < choice.requiresAttack) {
        setMessage(choice.failText || "You're not strong enough for that yet.");
        return;
      }
    }

    // RPG: Battle encounter — switch to battle assessment screen
    if (isRPG && choice.battleEncounter) {
      setBattleState({
        active: true,
        encounter: { ...choice.battleEncounter, originChoice: choice },
      });
      return;
    }

    if (choice.consumesItems?.length) {
      setInventory((prev) => prev.filter((itemId) => !choice.consumesItems.includes(itemId)));
    }

    // RPG: Award items declared on the choice itself
    if (choice.itemsGained?.length) {
      setInventory((prev) => Array.from(new Set([...prev, ...choice.itemsGained])));
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
      setMessage("");

      // RPG: small XP for setback experience + bond from shared hardship
      if (isRPG && rpgStats) {
        setRpgStats((prev) => ({ ...prev, xp: prev.xp + 2 }));
        if (party.length > 0) {
          setParty((prev) => prev.map((m) => ({ ...m, bond: Math.min(100, m.bond + 1) })));
        }
      }

      // Show result of the bad choice before entering the setback flow
      const setbackIntroText = choice.successText
        || "That choice leads to trouble. Work through the detour to regain momentum.";
      setResultScreen({
        active: true,
        text: setbackIntroText,
        nextScene: null, // handled specially
        endsStory: false,
        finalScore: 0,
        _setbackPending: {
          returnScene: choice.next || currentScene,
          steps: scenarioSetbackSteps,
        },
      });
      return;
    }

    // === RPG Effects (non-setback choices only) ===
    let rpgMessage = "";
    if (isRPG && rpgStats) {
      const hpChange = (choice.rpgEffects?.hp || 0) + (choice.healAmount || 0);
      const goldChange = choice.rpgEffects?.gold || 0;
      const baseXp = 10;
      const bonusXp = choice.rpgEffects?.xp || 0;
      const xpGain = baseXp + bonusXp;
      const statAtk = choice.statBoost?.attack || 0;
      const statDef = choice.statBoost?.defense || 0;
      const statCun = choice.statBoost?.cunning || 0;

      // Check for death from HP loss
      const projectedHp = Math.min(rpgStats.maxHp, Math.max(0, rpgStats.hp + hpChange));
      if (projectedHp <= 0 && hpChange < 0) {
        setRpgStats((prev) => ({ ...prev, hp: 0 }));
        setGameOver(true);
        return;
      }

      const newXp = rpgStats.xp + xpGain;
      const thresholds = content.rpgConfig?.levelThresholds || [0, 50, 120, 200, 300];
      let newLevel = rpgStats.level;
      for (let i = thresholds.length - 1; i >= 0; i--) {
        if (newXp >= thresholds[i]) {
          newLevel = i + 1;
          break;
        }
      }
      const levelsGained = newLevel - rpgStats.level;

      setRpgStats((prev) => ({
        ...prev,
        hp: levelsGained > 0
          ? prev.maxHp + 10 * levelsGained
          : Math.min(prev.maxHp, Math.max(0, prev.hp + hpChange)),
        maxHp: prev.maxHp + 10 * levelsGained,
        gold: Math.max(0, prev.gold + goldChange),
        xp: newXp,
        level: newLevel,
        attack: prev.attack + statAtk + 2 * levelsGained,
        defense: prev.defense + statDef + 1 * levelsGained,
        cunning: prev.cunning + statCun + 1 * levelsGained,
      }));

      if (levelsGained > 0) {
        rpgMessage += `⬆️ Level up! You are now level ${newLevel}! `;
      }

      // Recruit party member
      if (choice.recruitMember) {
        const memberDef = content.rpgConfig?.partyMembers?.[choice.recruitMember];
        if (memberDef && !party.find((m) => m.id === choice.recruitMember)) {
          setParty((prev) => [...prev, { id: choice.recruitMember, ...memberDef }]);
          rpgMessage += `${memberDef.name} joins your party! `;
        }
      }

      // Heal party members
      if (choice.partyHealAmount && party.length > 0) {
        const healAmt = choice.partyHealAmount;
        setParty((prev) =>
          prev.map((m) => ({
            ...m,
            hp: Math.min(m.maxHp, m.hp + healAmt),
          })),
        );
      }

      // HP loss for party from environmental effects
      if (choice.partyHpEffect && party.length > 0) {
        const hpEff = choice.partyHpEffect;
        setParty((prev) =>
          prev.map((m) => ({
            ...m,
            hp: Math.max(0, m.hp + hpEff),
          })),
        );
      }

      // Advance bonds — base gain per scene + any choice-specific bonuses
      if (party.length > 0) {
        const bondEffects = choice.bondEffect || {};
        setParty((prev) =>
          prev.map((m) => ({
            ...m,
            bond: Math.min(100, m.bond + 2 + (bondEffects[m.id] || 0)),
          })),
        );
      }
    }

    const nextScore = score + 10;
    setScore(nextScore);

    const fullMessage = [choice.successText || "", rpgMessage].filter(Boolean).join(" ");

    if (choice.endsStory) {
      // Show result screen first, then summary on "Next"
      setResultScreen({
        active: true,
        text: fullMessage || "Your journey reaches its conclusion.",
        nextScene: null,
        endsStory: true,
        finalScore: nextScore,
      });
      return;
    }

    // Show an outcome screen with the result text and a Next button
    setResultScreen({
      active: true,
      text: fullMessage || "You press onward.",
      nextScene: choice.next,
      endsStory: false,
      finalScore: 0,
    });
  };

  const handleResultNext = () => {
    // If there's a pending setback, enter the setback flow
    if (resultScreen._setbackPending) {
      const { returnScene, steps } = resultScreen._setbackPending;
      setResultScreen({ active: false, text: "", nextScene: null, endsStory: false, finalScore: 0 });
      setSetbackState({
        active: true,
        step: 0,
        returnScene,
        steps,
      });
      return;
    }
    if (resultScreen.endsStory) {
      setResultScreen({ active: false, text: "", nextScene: null, endsStory: false, finalScore: 0 });
      setSummaryState({ visible: true, finalScore: resultScreen.finalScore });
      return;
    }
    const nextScene = resultScreen.nextScene;
    setResultScreen({ active: false, text: "", nextScene: null, endsStory: false, finalScore: 0 });
    setMessage("");
    setCurrentScene(nextScene);
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
    setResultScreen({ active: false, text: "", nextScene: null, endsStory: false, finalScore: 0 });
    setSummaryState({ visible: false, finalScore: 0 });
    setSetbackState({
      active: false,
      step: 0,
      returnScene: "start",
      steps: DEFAULT_SETBACK_STEPS,
    });
    awardedScenesRef.current = new Set();
    // RPG resets
    if (isRPG) {
      setPlayerName("");
      setNameInputValue("");
      setRpgStats(
        content.rpgConfig?.startingStats
          ? { ...content.rpgConfig.startingStats }
          : null,
      );
      setParty([]);
      setGameOver(false);
      setBattleState({ active: false, encounter: null });
    }
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

  // === Result / Outcome Screen ===
  if (resultScreen.active) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>{isRPG ? "🐉 The Dragon's Laire" : "📖 Reader's Quest"}</h1>
          <p style={styles.subtitle}>{metadata.title}</p>
        </div>
        <div style={styles.main}>
          <div style={styles.scene}>
            <div style={styles.art}>{activeScene.art || "📖"}</div>
            <h2 style={styles.chapter}>{activeScene.chapter}</h2>
            <p style={styles.resultText}>{formatNarrative(resultScreen.text)}</p>
            <div style={styles.buttonRow}>
              <button onClick={handleResultNext} style={styles.nextButton}>
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === RPG: Name Input Screen ===
  if (isRPG && !playerName) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>🐉 The Dragon's Laire</h1>
          <p style={styles.subtitle}>A Medieval RPG Adventure</p>
        </div>
        <div style={styles.main}>
          <div style={styles.scene}>
            <div style={styles.art}>🛡️</div>
            <h3 style={styles.sceneTitle}>Create Your Character</h3>
            <p style={styles.narrative}>
              A wandering knight enters the guild hall — battle-worn, homeless,
              and haunted by the destruction of Thornwall. Your kingdom was
              burned to ash by the dragon Lurch. Everything you knew is gone.
              But a knight without a name is a knight without purpose. What name
              do you carry?
            </p>
            <div style={styles.nameInputContainer}>
              <input
                type="text"
                value={nameInputValue}
                onChange={(e) => setNameInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && nameInputValue.trim()) {
                    setPlayerName(nameInputValue.trim());
                  }
                }}
                placeholder="Enter your knight's name..."
                style={styles.nameInput}
                maxLength={24}
                autoFocus
              />
              <button
                onClick={() => {
                  if (nameInputValue.trim()) {
                    setPlayerName(nameInputValue.trim());
                  }
                }}
                style={{
                  ...styles.choiceButton,
                  ...(nameInputValue.trim() ? {} : { opacity: 0.5, cursor: "not-allowed" }),
                }}
                disabled={!nameInputValue.trim()}
              >
                Begin Quest →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === RPG: Game Over Screen ===
  if (isRPG && gameOver) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ ...styles.title, color: "#ef4444" }}>💀 Fallen in Battle</h1>
          <p style={styles.subtitle}>{metadata.title}</p>
        </div>
        <div style={styles.main}>
          <div style={styles.scene}>
            <div style={styles.art}>⚰️</div>
            <h3 style={styles.sceneTitle}>Your Journey Ends Here</h3>
            <p style={styles.narrative}>
              {playerName}'s wounds prove fatal. The quest to rescue Prince Elo
              ends in the darkness, another hero lost to the perils between
              Laffter Land and the Badlands. Perhaps another knight will succeed
              where you could not.
            </p>
            <div style={styles.buttonRow}>
              <button onClick={handlePlayAgain} style={styles.choiceButton}>
                Try Again →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // === RPG: Battle Assessment Screen ===
  if (isRPG && battleState.active && battleState.encounter) {
    const enc = battleState.encounter;
    const partyPower = calculatePartyPower("attack");
    const ratio = partyPower / enc.enemyPower;
    let assessment;
    if (ratio >= 1.5) {
      assessment = { text: "You feel confident about this fight.", color: "#4ade80", icon: "✅" };
    } else if (ratio >= 1.0) {
      assessment = { text: "The odds are roughly even — expect some wounds.", color: "#fbbf24", icon: "⚖️" };
    } else if (ratio >= 0.7) {
      assessment = { text: "This will be a dangerous fight. Proceed with caution.", color: "#f97316", icon: "⚠️" };
    } else {
      assessment = { text: "This fight would be suicidal. You are vastly outmatched.", color: "#ef4444", icon: "💀" };
    }

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>⚔️ Battle!</h1>
          <p style={styles.subtitle}>{enc.enemy}</p>
        </div>
        <div style={styles.main}>
          <div style={styles.scene}>
            <div style={styles.art}>⚔️</div>
            <h3 style={styles.sceneTitle}>{enc.enemy}</h3>
            <p style={styles.narrative}>{enc.description}</p>
            <div style={{
              ...styles.inventory,
              borderColor: assessment.color,
              background: `${assessment.color}15`,
            }}>
              <strong>{assessment.icon} Assessment:</strong> {assessment.text}
              <br />
              <span style={{ fontSize: "13px", opacity: 0.8 }}>
                Your strength: {partyPower} vs Enemy: {enc.enemyPower}
              </span>
            </div>
            {getPlayerHealthNarrative() && (
              <p style={styles.healthWarning}>{getPlayerHealthNarrative()}</p>
            )}
            <div style={styles.choices}>
              <button onClick={() => handleBattleAction("fight")} style={styles.choiceButton}>
                Fight! →
              </button>
              <button onClick={() => handleBattleAction("flee")} style={styles.choiceButton}>
                Flee! →
              </button>
              <button
                onClick={() => {
                  setBattleState({ active: false, encounter: null });
                  setMessage("You back down from the confrontation.");
                }}
                style={styles.choiceButton}
              >
                Back down — choose differently →
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              {isRPG && playerName
                ? `${playerName}'s chapter is complete. Here is how your decisions shaped the journey.`
                : "You completed the story. Here is how your decisions shaped the journey."}
            </p>

            {isRPG && rpgStats && (
              <div style={styles.rpgSummaryStats}>
                <span>⭐ Level {rpgStats.level}</span>
                <span>💰 {rpgStats.gold} gold</span>
                <span>⚔️ ATK {rpgStats.attack}</span>
                <span>🛡️ DEF {rpgStats.defense}</span>
                <span>🧠 CUN {rpgStats.cunning}</span>
                <span>👥 Party: {party.length}</span>
              </div>
            )}

            {isRPG && party.length > 0 && (
              <div style={styles.summaryCard}>
                <h4 style={styles.summaryHeading}>Companions</h4>
                {party.map((member) => (
                  <div key={member.id} style={styles.partyRow}>
                    <span>{member.icon} {member.name} — {getBondLabel(member.bond)}</span>
                  </div>
                ))}
              </div>
            )}

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
        <h1 style={styles.title}>{isRPG ? "🐉 The Dragon's Laire" : "📖 Reader's Quest"}</h1>
        <p style={styles.subtitle}>{metadata.title}</p>
      </div>

      <div style={styles.main}>
        <div style={styles.scene}>
          <div style={styles.art}>{activeScene.art}</div>
          <h2 style={styles.chapter}>{activeScene.chapter}</h2>
          <h3 style={styles.sceneTitle}>{activeScene.title}</h3>
          <p style={styles.narrative}>{formatNarrative(activeScene.narrative)}</p>

          {/* RPG: Player health warning */}
          {getPlayerHealthNarrative() && (
            <p style={styles.healthWarning}>{getPlayerHealthNarrative()}</p>
          )}

          {/* RPG: Party comments for the current scene */}
          {isRPG && !setbackState.active && scene.partyNarrative && party.map((member) => {
            const comment = scene.partyNarrative[member.id];
            if (!comment) return null;
            return (
              <p key={member.id} style={styles.partyComment}>
                {member.icon} {comment}
              </p>
            );
          })}

          {/* RPG: Party status display */}
          {isRPG && party.length > 0 && (
            <div style={styles.partyDisplay}>
              <strong>⚔️ Party:</strong>
              {party.map((member) => {
                const health = getHealthStatus(member.hp, member.maxHp);
                return (
                  <div key={member.id} style={styles.partyMemberRow}>
                    <span>{member.icon} {member.name}</span>
                    <span style={{ color: health.color, fontSize: "13px" }}>{health.label}</span>
                    <span style={{ color: "#a0826d", fontSize: "12px", fontStyle: "italic" }}>
                      {getBondFlavor(member.id, member.bond) || getBondLabel(member.bond)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}

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
            {isRPG && rpgStats ? (
              <p>
                ❤️ {getHealthStatus(rpgStats.hp, rpgStats.maxHp).label} |
                💰 {rpgStats.gold} gold |
                ⭐ Lvl {rpgStats.level} ({rpgStats.xp} XP) |
                ⚔️ {rpgStats.attack} 🛡️ {rpgStats.defense} 🧠 {rpgStats.cunning}
              </p>
            ) : (
              <p>
                Progress: {score} points | Scenes explored: {Math.floor(score / 10) + 1} |
                Momentum: {valuesScore >= 0 ? "Steady" : "Recovering"}
              </p>
            )}
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
  // RPG-specific styles
  resultText: {
    fontSize: "clamp(16px, 4vw, 20px)",
    lineHeight: "1.8",
    color: "#f3d27a",
    textAlign: "center",
    margin: "24px 0 32px",
    fontStyle: "italic",
  },
  nextButton: {
    padding: "16px 48px",
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
  nameInputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "24px",
    alignItems: "center",
  },
  nameInput: {
    width: "100%",
    maxWidth: "320px",
    padding: "14px 16px",
    background: "rgba(45, 40, 60, 0.9)",
    border: "2px solid #c9a84c",
    borderRadius: "8px",
    color: "#e8d4b8",
    fontSize: "18px",
    fontFamily: "inherit",
    textAlign: "center",
    outline: "none",
  },
  healthWarning: {
    color: "#f97316",
    background: "rgba(249, 115, 22, 0.1)",
    border: "1px solid rgba(249, 115, 22, 0.3)",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "14px",
    fontStyle: "italic",
    marginBottom: "12px",
  },
  partyComment: {
    color: "#b8c4d4",
    fontStyle: "italic",
    fontSize: "14px",
    margin: "4px 0",
    paddingLeft: "8px",
    borderLeft: "2px solid rgba(201, 168, 76, 0.3)",
  },
  partyDisplay: {
    background: "rgba(100, 80, 140, 0.15)",
    border: "1px solid rgba(160, 130, 200, 0.3)",
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#c9a84c",
  },
  partyMemberRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "8px",
    padding: "6px 0",
    borderBottom: "1px solid rgba(201, 168, 76, 0.1)",
    flexWrap: "wrap",
  },
  partyRow: {
    padding: "4px 0",
    fontSize: "14px",
    color: "#d4ccc0",
  },
  rpgSummaryStats: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    justifyContent: "center",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#c9a84c",
  },
};
