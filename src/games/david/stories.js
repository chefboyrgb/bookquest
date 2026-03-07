export const storyNodes = {
  start: {
    title: "Young Shepherd",
    chapter: "Chapter 1",
    narrative:
      "You are David, the youngest son of Jesse in Bethlehem. While your older brothers train for war, you tend your father's sheep in the fields, playing your harp and protecting the flock from wild animals with your sling and stones.",
    choices: [
      { text: "Play my harp to calm the sheep", next: "harp_moments" },
      { text: "Practice with my sling", next: "sling_practice" },
      {
        text: "Leave the flock to chase excitement in the hills",
        next: "sling_practice",
        isLessIdeal: true,
        successText: "You lose time and return to your duties with consequences to manage.",
        setbackSteps: [
          {
            title: "The Flock Scatters",
            chapter: "Detour",
            art: "🐑",
            narrative:
              "While you are gone, several sheep drift toward rough terrain. By the time you race back, one lamb is tangled in brush and another is missing from the line.",
            choices: [
              { text: "Search the hillside carefully" },
              { text: "Call for your brother's help" },
              { text: "Gather the flock before nightfall" }
            ]
          },
          {
            title: "Making It Right",
            chapter: "Detour",
            art: "🏠",
            narrative:
              "You recover the missing lamb and bring the flock home late. Your brother covers your unfinished chores, and you spend the evening repairing pens and earning back trust.",
            choices: [
              { text: "Thank your brother and help him" },
              { text: "Finish the overdue chores" },
              { text: "Return to the story with better focus" }
            ]
          }
        ]
      }
    ],
    art: "🐑"
  },
  harp_moments: {
    title: "Music of the Fields",
    chapter: "Chapter 1",
    narrative:
      "Your fingers dance across the harp strings. The melody seems to calm not just the sheep, but your own soul. You feel a deep peace, as if God is listening to your music.",
    choices: [
      { text: "Continue to Bethlehem market", next: "call_home" },
      { text: "Tend a wounded lamb", next: "call_home" },
      {
        text: "Ignore the flock and play only for applause",
        next: "call_home",
        isLessIdeal: true,
        successText: "Your priorities drift, and you have to recover your focus.",
        setbackSteps: [
          {
            title: "Attention Slips",
            chapter: "Detour",
            art: "🎵",
            narrative:
              "You get carried away performing, and fail to notice a sheep limping near the edge of the field. Precious time is lost before anyone spots the problem.",
            choices: [
              { text: "Stop and check the flock immediately" },
              { text: "Bring water and wrap the injured leg" },
              { text: "Ask family for help carrying supplies" }
            ]
          },
          {
            title: "Refocus",
            chapter: "Detour",
            art: "🧺",
            narrative:
              "After helping care for the injured sheep, you realize leadership means service first. You return to your work with clearer priorities.",
            choices: [
              { text: "Care for the flock before music" },
              { text: "Finish missed responsibilities" },
              { text: "Continue with renewed discipline" }
            ]
          }
        ]
      }
    ],
    art: "🎵"
  },
  sling_practice: {
    title: "Defender of the Flock",
    chapter: "Chapter 1",
    narrative:
      "You whirl your sling, practicing your aim. A lion once attacked your flock—you killed it. A bear came—you killed that too. Your faith has made you strong.",
    choices: [
      { text: "Head home with the sheep", next: "call_home" },
      { text: "Scout the fields", next: "call_home" },
      {
        text: "Test my aim too close to the flock",
        next: "call_home",
        isLessIdeal: true,
        successText: "A careless test creates trouble you must work through.",
        setbackSteps: [
          {
            title: "A Careless Shot",
            chapter: "Detour",
            art: "🪨",
            narrative:
              "The stone ricochets and startles the flock. One sheep stumbles and cuts its leg on a rock. You rush it back to the house for treatment, losing an entire day of fieldwork.",
            choices: [
              { text: "Carry the sheep home for care" },
              { text: "Clean and bandage the wound" },
              { text: "Ask your brother to cover the flock" }
            ]
          },
          {
            title: "Cost of Carelessness",
            chapter: "Detour",
            art: "🩹",
            narrative:
              "Your brother misses his own chores to watch the flock while you tend the injured sheep. By evening, everyone is tired, and you understand why discipline matters.",
            choices: [
              { text: "Apologize and take responsibility" },
              { text: "Help your brother finish his chores" },
              { text: "Resume the journey with better judgment" }
            ]
          }
        ]
      }
    ],
    art: "🎯",
    itemsGained: ["shepherd_staff"]
  },
  call_home: {
    title: "Called to the Palace",
    chapter: "Chapter 2",
    narrative:
      "Your father Jesse sends for you. King Saul, troubled in spirit, seeks a young man who can play the harp. Samuel the prophet has already anointed you in secret, though you didn't understand it then. Now your family knows: you are chosen for something greater.",
    choices: [
      { text: "Go willingly to serve the King", next: "anointed" },
      { text: "Ask why I was anointed", next: "anointed" }
    ],
    art: "🏘️"
  },
  anointed: {
    title: "The Prophet's Oil",
    chapter: "Chapter 2",
    narrative:
      "You remember the day Samuel came to Bethlehem. While your brothers stood before him, Samuel looked past them. 'The Lord has chosen the youngest,' he said, and poured holy oil upon your head. You are anointed king, though Saul still sits on the throne.",
    choices: [
      { text: "Go to Saul's court", next: "saul_court" },
      { text: "Reflect on your calling", next: "saul_court" }
    ],
    art: "✨"
  },
  saul_court: {
    title: "Playing for a Troubled King",
    chapter: "Chapter 3",
    narrative:
      "In King Saul's palace, you play your harp. The king's troubled spirit seems to lift as your music fills the room. Saul grows fond of you and makes you his armor-bearer. But a shadow falls over the kingdom—the Philistines are gathering for war.",
    choices: [
      { text: "Ask about the Philistine threat", next: "philistines_gather" },
      { text: "Continue playing", next: "philistines_gather" }
    ],
    itemInteractions: [
      {
        itemId: "harp",
        text: "Play a calming song for King Saul",
        next: "philistines_gather",
        successText: "Your harp calms Saul's spirit, and he trusts your counsel."
      }
    ],
    art: "🏰",
    itemsGained: ["harp"]
  },
  philistines_gather: {
    title: "Shadows of War",
    chapter: "Chapter 3",
    narrative:
      "The Philistines mass their armies in the Valley of Elah. King Saul and Israel's army stand opposite them. The two forces camp and wait, neither willing to risk full battle. Then, from the Philistine camp, a giant emerges.",
    choices: [
      { text: "Ask who this giant might be", next: "goliath_appears" },
      { text: "Listen to the soldiers' fears", next: "goliath_appears" }
    ],
    art: "⛺"
  },
  goliath_appears: {
    title: "The Giant's Challenge",
    chapter: "Chapter 4",
    narrative:
      "Goliath stands over nine feet tall. His armor is bronze, his spear like a weaver's beam. Each day he walks into the valley between the armies and shouts: 'Why do you cower? Send one man to fight me!' No one steps forward. For forty days, the giant mocks Israel.",
    choices: [
      { text: "Go to your brothers to bring supplies", next: "brothers_fear" },
      { text: "Watch from the camp", next: "brothers_fear" }
    ],
    art: "🗿"
  },
  brothers_fear: {
    title: "I See My Brothers",
    chapter: "Chapter 4",
    narrative:
      "Your father sends you to the battlefield with food for your brothers. You find them trembling in their armor, watching Goliath mock them. Your brothers have given up. But you listen to the giant's words, and instead of fear, you feel anger at this insult to God's name.",
    choices: [
      { text: "Defend God's honor", next: "david_volunteers" },
      { text: "Ask about the prize", next: "david_volunteers" }
    ],
    art: "😢"
  },
  david_volunteers: {
    title: "I Will Fight",
    chapter: "Chapter 5",
    narrative:
      "Your brothers mock you: 'Go back to your sheep!' But you step forward and declare to King Saul: 'Your Majesty, let no one despair. I will fight this Philistine.' The soldiers gasp. Saul studies this young shepherd and, seeing something in your eyes, agrees to let you try.",
    choices: [
      { text: "Accept Saul's armor", next: "saul_armor" },
      { text: "Refuse the armor", next: "choose_weapon" }
    ],
    art: "💭"
  },
  saul_armor: {
    title: "The King's Armor",
    chapter: "Chapter 5",
    narrative:
      "Saul dresses you in his own bronze armor and places his sword in your hand. But it is too heavy. You cannot move properly. You remove it and return to what you know—your sling, your faith, and the shepherd's trust in God.",
    choices: [{ text: "Return to your own weapons", next: "choose_weapon" }],
    art: "⚔️"
  },
  choose_weapon: {
    title: "A Shepherd's Weapons",
    chapter: "Chapter 5",
    narrative:
      "You select five smooth stones from the stream and place them in your bag. You grip your sling. This is what you know. This is what has protected your flock from lions and bears. This is what will save Israel.",
    choices: [{ text: "Walk toward Goliath", next: "battle_begins" }],
    art: "🪨",
    itemsGained: ["sling", "stone"]
  },
  battle_begins: {
    title: "Face to Face",
    chapter: "Chapter 6",
    narrative:
      "You walk into the valley. Goliath sees you—a shepherd boy—and laughs. His armor clanks with each step as he advances. 'Come,' he roars, 'and I will give your flesh to the birds of the air!' But you speak with quiet confidence: 'You come at me with sword and spear, but I come in the name of the Lord.'",
    choices: [
      {
        text: "Use your sling and stone with faith",
        next: "stone_released",
        requiresItems: ["sling", "stone"],
        successText: "You steady your breath, trust God, and let the stone fly."
      },
      { text: "Retreat and prepare your weapons", next: "choose_weapon" }
    ],
    art: "⚔️"
  },
  stone_released: {
    title: "The Stone Flies",
    chapter: "Chapter 6",
    narrative:
      "Your hand moves to your sling. You whirl it overhead once... twice... and release. The stone flies through the air with perfect accuracy. It strikes Goliath in the forehead. The giant staggers, then falls to the ground.",
    choices: [{ text: "Run to secure the giant's sword", next: "victory" }],
    art: "🎯",
    itemsGained: ["sword"]
  },
  victory: {
    title: "David Defeats Goliath",
    chapter: "Chapter 7",
    narrative:
      "The Philistine army gasps in horror. Their champion, their strongest warrior, has fallen to a shepherd boy. The army turns and flees. Israel's fear breaks like a chain. You are the hero who saved the nation. King Saul embraces you, and the people sing your name.",
    choices: [
      { text: "Become Saul's commander", next: "friendship_jonathan" },
      { text: "Return to the palace", next: "friendship_jonathan" }
    ],
    art: "👑",
    itemsGained: ["crown"]
  },
  friendship_jonathan: {
    title: "A Loyal Friend",
    chapter: "Chapter 8",
    narrative:
      "Saul's son Jonathan meets you and immediately your souls are bound together. He strips off his robes and armor and gives them to you—a sign of his deepest loyalty. Jonathan represents the brother you never had. Together, you both serve the Lord and Israel.",
    choices: [
      { text: "Fight alongside Jonathan", next: "saul_jealous" },
      { text: "Lead victories with Jonathan", next: "saul_jealous" }
    ],
    art: "🤝"
  },
  saul_jealous: {
    title: "The King's Jealousy",
    chapter: "Chapter 9",
    narrative:
      "After each victory, the people sing, 'Saul has slain his thousands, and David his tens of thousands.' The words sting King Saul. Fear takes root: Is this young shepherd becoming more beloved than I am? Saul's heart turns dark. He begins to see you as a threat, even an enemy.",
    choices: [
      { text: "Remain loyal despite the fear", next: "fleeing" },
      { text: "Try to reason with Saul", next: "fleeing" }
    ],
    art: "👑"
  },
  fleeing: {
    title: "Hunted by a King",
    chapter: "Chapter 10",
    narrative:
      "Saul hurls his spear at you, missing by inches. You flee from the palace. Jonathan helps you escape, but he cannot leave—his father is still the king. You become a fugitive, hunted by the very man you once served. Your heart breaks, but your faith remains.",
    choices: [
      { text: "Find refuge in the wilderness", next: "cave_refuge" },
      { text: "Seek shelter", next: "cave_refuge" }
    ],
    art: "🌲"
  },
  cave_refuge: {
    title: "In the Cave of Adullam",
    chapter: "Chapter 11",
    narrative:
      "You gather a band of loyal followers in the Cave of Adullam—four hundred warriors and refugees who believe in you. Though hunted, you are not alone. Saul pursues you across the wilderness, but you survive by faith and your supporters' loyalty.",
    choices: [
      { text: "Spare Saul's life when you have the chance", next: "anointed_king" },
      { text: "Hide from Saul's armies", next: "anointed_king" }
    ],
    art: "⛰️",
    itemsGained: ["covenant_tablet"]
  },
  anointed_king: {
    title: "King of Israel",
    chapter: "Chapter 12",
    narrative:
      "After Saul falls in battle, the elders of Israel come to you in Hebron. They anoint you king of all Israel. The shepherd becomes sovereign. God's promise has been fulfilled. You are no longer a fugitive—you are the anointed king.",
    choices: [
      { text: "Lead the kingdom with strength", next: "jerusalem" },
      { text: "Seek God's guidance", next: "jerusalem" }
    ],
    art: "👑"
  },
  jerusalem: {
    title: "Conqueror of Jerusalem",
    chapter: "Chapter 13",
    narrative:
      "You march on Jerusalem, the last stronghold held by the Jebusites. With cunning and courage, you capture it and make it your capital. Jerusalem becomes the city of David—a mighty fortress and the heart of your kingdom.",
    choices: [
      { text: "Establish your reign", next: "kingdom_grows" },
      { text: "Build the city", next: "kingdom_grows" }
    ],
    art: "🏛️"
  },
  kingdom_grows: {
    title: "A Growing Kingdom",
    chapter: "Chapter 14",
    narrative:
      "Under your leadership, Israel grows strong. Your armies win victories, your judges defend the weak, and your counselors help establish peace across the tribes. With success comes pressure, and every decision shapes the nation's future.",
    choices: [
      { text: "Strengthen justice in every city", next: "kingdom_peace" },
      { text: "Invest in the next generation of leaders", next: "kingdom_peace" },
      {
        text: "Rush major decisions without counsel",
        next: "kingdom_peace",
        isLessIdeal: true,
        setbackSteps: [
          {
            title: "Rushed Orders",
            chapter: "Detour",
            art: "📜",
            narrative:
              "Hasty orders create confusion between city leaders. Supplies are sent to the wrong district, and families wait longer for relief.",
            choices: [
              { text: "Gather reports from each district" },
              { text: "Correct the misdirected orders" },
              { text: "Reassign teams where needed" }
            ]
          },
          {
            title: "Restored Order",
            chapter: "Detour",
            art: "🤝",
            narrative:
              "With calmer planning and trusted counsel, the work gets back on track. The kingdom stabilizes again, and confidence returns.",
            choices: [
              { text: "Review plans with advisors" },
              { text: "Communicate clearly to the cities" },
              { text: "Continue on the restored path" }
            ]
          }
        ]
      }
    ],
    art: "🏰"
  },
  kingdom_peace: {
    title: "A Season of Peace",
    chapter: "Chapter 15",
    narrative:
      "You focus on wise governance, worship, and service to the people. Trade routes reopen, families rebuild, and the kingdom enters a season of stability. Your house grows as well, and Solomon rises among your sons with uncommon wisdom.",
    choices: [
      { text: "Prepare Solomon and the leaders for what comes next", next: "legacy" },
      { text: "Give thanks and continue serving faithfully", next: "legacy" },
      { text: "Rest and reflect on your journey", next: "legacy" }
    ],
    art: "🕊️"
  },
  legacy: {
    title: "A King's Legacy",
    chapter: "Epilogue",
    narrative:
      "You have lived a long and full life—shepherd, warrior, king, and penitent. Your kingdom is strong. Your son Solomon will be even wiser than you. Though you stumbled into great sin, your repentance showed Israel that even a king must answer to God. Your name will be remembered forever. The Messiah himself will come from your line.",
    choices: [{ text: "View Journey Summary", endsStory: true }],
    art: "🌟"
  }
};
