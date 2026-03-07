import { useState } from "react";
import "./App.css";

export default function App() {
  const [currentScene, setCurrentScene] = useState("start");
  const [inventory, setInventory] = useState([]);
  const [score, setScore] = useState(0);

  const SCENES = {
    start: {
      title: "The Spare Room",
      chapter: "Prologue",
      narrative:
        "You and your siblings have been sent to the countryside during World War II to stay with the Professor. As you explore the old house, you discover something extraordinary hidden in the spare room—a magnificent wardrobe. As you push aside the heavy fur coats... will you step inside?",
      choices: [
        { text: "Open the wardrobe and step inside", next: "enter" },
        { text: "Call your siblings first", next: "siblings" },
      ],
      art: "🏠",
    },
    siblings: {
      title: "The Spare Room",
      chapter: "Prologue",
      narrative:
        "You call your siblings over. Together, you approach the mysterious wardrobe. Lucy's eyes widen with wonder as you explain what you've found. Edmund looks skeptical, but curious. Peter takes charge, 'We should investigate together.' You all open the wooden doors together...",
      choices: [{ text: "Step into the wardrobe", next: "enter" }],
      art: "👨‍👩‍👧‍👦",
    },
    enter: {
      title: "Inside the Wardrobe",
      chapter: "Chapter 1",
      narrative:
        "You push between the soft fur coats, expecting to feel the wooden back of the wardrobe. But instead, the coats seem to stretch on forever. The air grows cold. You see a faint glow ahead... and then—you step out into a forest of snow and pine trees. A tall iron lamppost glows in the distance.",
      itemsGained: ["fur_coat"],
      choices: [
        { text: "Walk toward the glowing lamppost", next: "lamppost" },
        { text: "Hide and observe", next: "hide" },
      ],
      art: "🧥",
    },
    lamppost: {
      title: "The Lamppost",
      chapter: "Chapter 2",
      narrative:
        "You stand beneath a tall iron lamppost in the middle of a snowy forest. Its light casts long shadows across the white drifts. As you approach, you hear a voice—nervous, surprised. A small furry creature with the legs of a goat steps out from behind a snow-covered tree. He introduces himself as Mr. Tumnus, a faun.",
      itemsGained: ["map"],
      choices: [
        { text: "Befriend Mr. Tumnus and accept his invitation to tea", next: "tumnus" },
        { text: "Be cautious and ask questions first", next: "tumnus_cautious" },
      ],
      art: "🏮",
    },
    hide: {
      title: "Hidden in the Mist",
      chapter: "Chapter 2",
      narrative:
        "You crouch behind the snow-covered trees, watching. A tall, majestic figure on a sleigh pulled by reindeer glides silently through the forest. Her robes are white as snow, and a crown of ice glitters on her head. This must be the White Witch that Mr. Tumnus spoke of. Her presence fills you with dread.",
      choices: [{ text: "Creep toward the lamppost", next: "lamppost" }],
      art: "❄️",
    },
    tumnus: {
      title: "Mr. Tumnus's Cave",
      chapter: "Chapter 2",
      narrative:
        "Inside the warm cave, Mr. Tumnus has prepared a fire and tea. Everything is cozy—beautiful paintings of nymphs and dryads hang on the walls. As you warm your hands by the fire, Mr. Tumnus begins to look sad and conflicted. 'I have something to tell you,' he says nervously. 'The White Witch has ordered me to bring her any humans I find... but I can't do it. I can't betray you.'",
      choices: [
        { text: "Forgive him and ask for help escaping", next: "beaver" },
        { text: "Ask him about Narnia and the Witch", next: "lore" },
      ],
      art: "🔥",
    },
    tumnus_cautious: {
      title: "By the Lamppost",
      chapter: "Chapter 2",
      narrative:
        "Mr. Tumnus looks hurt by your caution, but he understands. 'The White Witch rules Narnia with an iron hand,' he explains. 'It has been winter for a hundred years. There's no hope unless Aslan returns.' He points the way to the beaver's dam, where you might find safety and answers.",
      choices: [{ text: "Thank him and head to the beaver's dam", next: "beaver" }],
      art: "🗣️",
    },
    lore: {
      title: "The History of Narnia",
      chapter: "Chapter 3",
      narrative:
        "Mr. Tumnus tells you of Narnia's tragic history. Once, it was a land of beauty and magic under the rule of Aslan, the great lion. But the White Witch seized power and cursed the land with endless winter. 'It has been winter for a hundred years,' Tumnus says sadly. 'No Christmas, no hope. But there is a prophecy... When Aslan returns and humans come, the Witch's power will break.'",
      choices: [{ text: "Ask how to find Aslan", next: "beaver" }],
      art: "📖",
    },
    beaver: {
      title: "The Beaver's Dam",
      chapter: "Chapter 4",
      narrative:
        "Following a robin deeper into the forest, you find a cozy dam by a frozen river. Mr. and Mrs. Beaver welcome you with warm hospitality. Over a delicious fish dinner, they explain that Aslan is indeed real—and he's returning! 'But the White Witch will stop at nothing to prevent it,' Mr. Beaver warns. 'We must travel to his camp at once. There, we will find hope and guidance.'",
      itemsGained: ["sword", "bow"],
      choices: [
        { text: "Agree to journey to Aslan's camp", next: "quest" },
        { text: "Ask more about the Witch's power", next: "witch_lore" },
      ],
      art: "🦫",
    },
    witch_lore: {
      title: "The Deep Magic",
      chapter: "Chapter 4",
      narrative:
        "Mrs. Beaver leans close and speaks in hushed tones. 'The Witch has power through the Deep Magic—an ancient law that demands a traitor's blood. If any of you have betrayed her, she can claim your life. Edmund... he has already been to her castle. He accepted her enchanted candy. He may be in her power.' The room falls silent.",
      choices: [{ text: "Go find Edmund and head to Aslan's camp", next: "quest" }],
      art: "⚖️",
    },
    quest: {
      title: "The Journey Begins",
      chapter: "Chapter 5",
      narrative:
        "You set out with the Beavers into the forest, searching for Edmund and hoping to reach Aslan's camp before the Witch finds you. The snow crunches under your feet. Behind you, you hear the sound of a sleigh and the crack of a whip. The Witch is hunting you! You run faster, the forest becoming a blur of white and green.",
      choices: [
        { text: "Keep running forward", next: "escape" },
        { text: "Hide and let her pass", next: "hide_witch" },
      ],
      art: "🏃",
    },
    escape: {
      title: "Crossing the Great River",
      chapter: "Chapter 5",
      narrative:
        "You burst through the trees and find yourself at the edge of a great frozen river. The ice cracks and groans beneath your weight. Behind you, the Witch's sleigh draws closer. 'Run!' the Beaver shouts. You race across the breaking ice, each step a prayer. The sleigh lurches to a halt at the bank—the Witch cannot cross. You've escaped!",
      itemsGained: ["cordial"],
      choices: [{ text: "Continue to Aslan's camp", next: "aslan_camp" }],
      art: "❄️💨",
    },
    hide_witch: {
      title: "The Witch Passes",
      chapter: "Chapter 5",
      narrative:
        "You huddle behind a snowy bank as the Witch's sleigh thunders past. She's shouting orders to her wolf guards, demanding that they find the humans. As her voice fades into the distance, you breathe a sigh of relief. The Beavers nod—time to move quickly. You slip away through the forest toward Aslan's camp.",
      choices: [{ text: "Reach Aslan's camp", next: "aslan_camp" }],
      art: "🐺",
    },
    aslan_camp: {
      title: "Meeting Aslan",
      chapter: "Chapter 6",
      narrative:
        "You stumble into a magnificent clearing. Tents of gold and crimson flutter in the wind. Lions, centaurs, fauns, and dryads move about with purpose and hope. And then you see him—Aslan. He is enormous, his mane golden and magnificent. When he looks at you, you feel at once completely safe and utterly in awe. 'Welcome,' he says, his voice like thunder and like music. 'You have come far. Now, the final battle begins.'",
      choices: [
        { text: "Ask Aslan how to defeat the Witch", next: "battle" },
        { 
          text: "Ask about saving Edmund", 
          next: "sacrifice" 
        },
      ],
      art: "🦁✨",
    },
    sacrifice: {
      title: "The Deep Magic Revealed",
      chapter: "Chapter 7",
      narrative:
        "Aslan's eyes grow sad and distant. 'Edmund has betrayed us,' he says solemnly. 'The Deep Magic demands his life. A traitor's blood is required.' The animals gasp. Peter steps forward, 'There must be another way!' Aslan nods slowly. 'There is an older magic, deeper still. But it requires a sacrifice—a willing death in place of a traitor's.' Aslan's gaze falls upon himself, and you understand.",
      choices: [
        { text: "Stay and witness what happens", next: "stone_table" },
      ],
      art: "😔",
    },
    stone_table: {
      title: "The Stone Table",
      chapter: "Chapter 7",
      narrative:
        "The Witch and her armies arrive at the ancient Stone Table. She binds Aslan and makes him recite the Deep Magic. Then, in a terrible moment, she raises her knife. You cannot watch, but you hear the silence that follows—louder than any scream. Aslan is gone. Edmund is saved, but at what cost? The Witch laughs with triumph.",
      itemsGained: ["stone_piece"],
      choices: [
        { text: "Stay hidden until dawn", next: "resurrection" },
      ],
      art: "⚰️",
    },
    resurrection: {
      title: "Dawn Breaks",
      chapter: "Chapter 8",
      narrative:
        "At first light, you creep back to the Stone Table. The stone is cracked in two. And standing in the morning light, shaking his magnificent mane, is Aslan! alive and restored! 'The older magic,' he explains, 'is more powerful than the youngest magic. Death itself could not hold me.' Your heart soars with impossible hope.",
      choices: [
        { text: "Join Aslan to defeat the Witch", next: "final_battle" },
      ],
      art: "🌅🦁",
    },
    final_battle: {
      title: "The Battle of Beruna",
      chapter: "Chapter 9",
      narrative:
        "Aslan's army clashes with the Witch's forces. The battle is fierce and frightening—swords clash, magic crackles through the air. But Aslan, restored to his full power, is unstoppable. The Witch's spell over Narnia breaks. The snow begins to melt. Flowers bloom. The eternal winter is ending. Victory is yours!",
      choices: [
        { text: "Travel to Cair Paravel to be crowned", next: "ending" },
      ],
      art: "⚔️✨",
    },
    ending: {
      title: "Kings and Queens of Narnia",
      chapter: "Chapter 10 - Epilogue",
      narrative:
        "You stand in the magnificent throne room of Cair Paravel by the sea. Aslan places crowns upon your heads—and those of your siblings. 'In Narnia,' he says, 'you will rule justly and well. And you will be known as Kings and Queens of Narnia.' Years pass in a golden age of peace and plenty. But one day, while hunting, you all stumble upon an old, familiar landmark... and find yourselves back in the spare room, children again, gasping for breath. Was it all a dream? You touch your pocket and feel something—a small lion's tooth of gold. Perhaps it was more real than any dream.",
      art: "👑🦁",
      choices: [
        { text: "Start Over", next: "start" },
      ],
    },
    battle: {
      title: "Preparing for War",
      chapter: "Chapter 6",
      narrative:
        "Aslan's eyes flash with determination. 'The Witch's power comes from the Deep Magic, an ancient law. But she does not know of the older magic that I serve. We will march to meet her forces. The battle will be fierce, but victory is possible. Are you ready to fight for Narnia?'",
      choices: [
        { text: "Accept and ask about Edmund first", next: "sacrifice" },
      ],
      art: "🛡️",
    },
  };

  const scene = SCENES[currentScene];

  const handleChoice = (nextScene) => {
    if (scene.itemsGained) {
      setInventory([...inventory, ...scene.itemsGained]);
    }
    setScore(score + 10);
    setCurrentScene(nextScene);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📖 Book Quest</h1>
        <p style={styles.subtitle}>The Lion, the Witch and the Wardrobe</p>
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

