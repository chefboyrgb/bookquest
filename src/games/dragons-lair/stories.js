export const storyNodes = {
  // ============================================================
  // SCENE 1: The Adventurer's Guild
  // ============================================================
  start: {
    title: "The Adventurer's Guild",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🏛️",
    narrative:
      "The guild hall smells of old leather and wood smoke. {playerName} pushes through the heavy oak door — a wandering knight with nothing left to lose. The kingdom of Thornwall, your home, was burned to ash by the dragon Lurch. Everything and everyone you knew, gone in a single night of fire. A faded posting on the notice board catches your eye, bearing a royal seal you don't recognize.",
    choices: [
      {
        text: "Read the royal posting",
        next: "quest_board",
        successText: "The seal belongs to the Kingdom of Laffter Land.",
      },
      {
        text: "Ask the guild master what he knows",
        next: "quest_board",
        successText:
          "The guild master leans close. 'King Leopold's boy was taken by a dragon. Same beast that torched Thornwall, they say. Big reward for anyone mad enough to go after it.'",
      },
      {
        text: "Ignore it and sit by the fire",
        next: "quest_board",
        isLessIdeal: true,
        successText:
          "You try to push the thought away, but the posting keeps calling to you.",
        setbackSteps: [
          {
            title: "Lost in Thought",
            chapter: "Detour",
            art: "💭",
            narrative:
              "You sit alone by the fire, but the memory of Thornwall burning won't fade. The faces of those you couldn't save flash before your eyes. Running from your purpose only makes the pain worse.",
            choices: [
              { text: "Look at the posting again" },
              { text: "Ask yourself what a true knight would do" },
              { text: "Remember your oath to protect the innocent" },
            ],
          },
          {
            title: "A Knight's Resolve",
            chapter: "Detour",
            art: "🛡️",
            narrative:
              "You stand up. You didn't survive Thornwall just to sit here feeling sorry for yourself. The dragon Lurch took everything from you. Maybe it's time to take something back.",
            choices: [
              { text: "Read the posting with clear eyes" },
              { text: "Stand tall and face your destiny" },
              { text: "Continue with renewed purpose" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 2: The Quest Board
  // ============================================================
  quest_board: {
    title: "A Royal Summons",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "📜",
    narrative:
      "The posting reads: 'By decree of King Leopold of Laffter Land — the infant Prince Elo has been stolen by the dragon Lurch and carried to the Great Dark Castle in the Badlands. A protective spell keeps the prince in suspended animation, but time is short. The Crown offers wealth beyond measure to any hero who returns the prince alive. Many have tried. None have returned.' Your blood runs cold at the name Lurch. This is the beast that destroyed your home. This quest is personal.",
    choices: [
      {
        text: "Accept the quest — this dragon owes you a debt",
        next: "road_to_laffterland",
        moralImpact: 1,
        successText:
          "Purpose fills your chest like a forge fire. You tear the posting from the board and head for the door.",
      },
      {
        text: "Ask around the guild about the dangers ahead",
        next: "road_to_laffterland",
        successText:
          "The old hands warn you: between Laffter Land and the Badlands lie many territories, each ruled by a tyrant who must be appeased or overcome. The Murkwood is first.",
      },
      {
        text: "Hesitate — the odds seem impossible",
        next: "road_to_laffterland",
        isLessIdeal: true,
        successText:
          "Fear is natural, but a knight of Thornwall does not hide from fear.",
        setbackSteps: [
          {
            title: "The Weight of Doubt",
            chapter: "Detour",
            art: "😔",
            narrative:
              "You sit alone in the guild hall as others come and go. Doubt gnaws at you. What if you fail like all the others? What if you never come back?",
            choices: [
              { text: "Remember the people Lurch has hurt" },
              { text: "Think of Prince Elo, helpless and alone" },
              { text: "Recall your training and your oath" },
            ],
          },
          {
            title: "Courage Found",
            chapter: "Detour",
            art: "🔥",
            narrative:
              "Fear is not the absence of courage — it is the test of it. You stand, adjust your worn armor, and walk toward the door. The quest awaits.",
            choices: [
              { text: "Step into the daylight" },
              { text: "Set out for Laffter Land" },
              { text: "Continue with determination" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 3: The King's Road
  // ============================================================
  road_to_laffterland: {
    title: "The King's Road",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🛤️",
    narrative:
      "The road to Laffter Land winds through golden farmlands and rolling hills. After two days of travel, you spot a merchant caravan stopped ahead. Crates are scattered across the road, and you hear shouting — a band of brigands has surrounded the merchants, demanding their goods at sword-point.",
    choices: [
      {
        text: "Rush to the merchants' aid",
        next: "merchant_rescue",
        moralImpact: 1,
        rpgEffects: { xp: 5 },
        successText:
          "You charge forward with a shout, scattering the surprised brigands.",
      },
      {
        text: "Approach cautiously and assess the situation",
        next: "merchant_rescue",
        rpgEffects: { xp: 3 },
        successText:
          "You circle around and find the brigands are poorly armed — easy to handle with the element of surprise.",
      },
      {
        text: "It's not your problem — keep walking",
        next: "merchant_rescue",
        isLessIdeal: true,
        successText:
          "You try to pass, but your conscience won't let you ignore innocent people in danger.",
        setbackSteps: [
          {
            title: "A Knight's Duty",
            chapter: "Detour",
            art: "⚖️",
            narrative:
              "You walk fifty paces past the caravan before stopping. The screams of the merchants echo behind you. A true knight protects the weak — that oath doesn't expire because your kingdom fell.",
            choices: [
              { text: "Turn back and help" },
              { text: "Remember what honor means" },
              { text: "Act on your conscience" },
            ],
          },
          {
            title: "Better Late Than Never",
            chapter: "Detour",
            art: "🏃",
            narrative:
              "You sprint back to the caravan. The brigands have already taken some goods, but your arrival sends them running. The merchants are shaken but grateful.",
            choices: [
              { text: "Help gather the scattered crates" },
              { text: "Check if anyone is hurt" },
              { text: "Continue the journey" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 4: Roadside Rescue
  // ============================================================
  merchant_rescue: {
    title: "Roadside Rescue",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🐴",
    narrative:
      "The brigands flee into the hills. The lead merchant, a stout woman named Hilda, clasps your hand. 'Bless you, friend! Take this gold for your trouble, and a healing potion from my stock — you'll need it where you're going.' She lowers her voice. 'The Murkwood lies beyond Laffter Land. Dark things live in those trees. And the ferryman at the river crossing... be careful with that one.'",
    itemsGained: ["healing_potion"],
    choices: [
      {
        text: "Accept her thanks graciously",
        next: "laffterland_gates",
        rpgEffects: { gold: 30 },
        moralImpact: 1,
        successText: "Hilda presses 30 gold coins into your palm.",
      },
      {
        text: "Ask her what she knows about the Murkwood",
        next: "laffterland_gates",
        rpgEffects: { gold: 20 },
        successText:
          "Hilda shares what she knows: 'The trees move when you're not looking. And there are bandits — desperate folk who prey on travelers. But the radiant pool in the clearing... some say it holds ancient power.'",
      },
      {
        text: "Demand more payment for your services",
        next: "laffterland_gates",
        rpgEffects: { gold: 10 },
        isLessIdeal: true,
        successText:
          "Hilda's warmth fades to disappointment. She gives you a smaller pouch.",
        setbackSteps: [
          {
            title: "Greed's Shadow",
            chapter: "Detour",
            art: "💰",
            narrative:
              "The merchants exchange uneasy glances. You saved them, but your demand for extra payment leaves a sour taste. Hilda's children peek out from behind the wagon, eyes wide with confusion. This isn't what knights do.",
            choices: [
              { text: "Apologize for being ungrateful" },
              { text: "Accept what was freely offered" },
              { text: "Remember that honor isn't for sale" },
            ],
          },
          {
            title: "Humility Restored",
            chapter: "Detour",
            art: "🤝",
            narrative:
              "You wave away the extra coins. 'Keep it. You need it more than I do.' Hilda's smile returns, and she presses the healing potion into your hand. 'May the road treat you kindly, knight.'",
            choices: [
              { text: "Thank Hilda and move on" },
              { text: "Help them reload the wagon" },
              { text: "Continue to Laffter Land" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 5: Gates of Laffter Land
  // ============================================================
  laffterland_gates: {
    title: "The Gates of Laffter Land",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🏰",
    narrative:
      "The great gates of Laffter Land rise before you — white stone towers crowned with golden banners that snap in the wind. Despite the kingdom's prosperity, the guards on the wall look haggard and tense. Since Prince Elo's capture, the whole city has been on edge. A captain descends the wall stairs and bars your path. 'State your business, stranger.'",
    choices: [
      {
        text: "Show the royal posting and state your quest",
        next: "throne_room",
        moralImpact: 1,
        successText:
          "The captain's eyes widen. 'Another brave soul. Or a fool. Either way, the king will want to see you. Follow me.'",
      },
      {
        text: "Announce yourself as a knight of Thornwall",
        next: "throne_room",
        successText:
          "A murmur runs through the guards. 'Thornwall... the kingdom the dragon destroyed.' The captain nods grimly. 'You have more reason than most to face that beast. Come.'",
      },
      {
        text: "Try to sneak in through a side passage",
        next: "throne_room",
        isLessIdeal: true,
        successText:
          "A shortcut through deception is no way for a knight to enter a kingdom.",
        setbackSteps: [
          {
            title: "Caught at the Wall",
            chapter: "Detour",
            art: "🚫",
            narrative:
              "You barely make it over the side wall before guards surround you with spears lowered. 'A thief or a spy?' the captain growls. Starting your quest by breaking trust with the very people you're trying to help — not your finest hour.",
            choices: [
              { text: "Explain yourself honestly" },
              { text: "Show the royal posting" },
              { text: "Apologize for the misunderstanding" },
            ],
          },
          {
            title: "Earning Back Trust",
            chapter: "Detour",
            art: "🙏",
            narrative:
              "After some tense moments, the captain accepts your story. 'You seem genuine, even if your methods need work. The king will decide.' He escorts you through the city under guard.",
            choices: [
              { text: "Walk with dignity" },
              { text: "Accept the consequence" },
              { text: "Continue to the throne room" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 6: Before the King
  // ============================================================
  throne_room: {
    title: "Before the King",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "👑",
    narrative:
      "The throne room of Laffter Land is grand but somber. King Leopold sits straight-backed on a carved wooden throne, his face lined with worry. Queen Jeannie stands beside him, her eyes red but steady. The court conjurer — a thin, birdlike man in star-covered robes — explains the situation. 'The spell protecting Prince Elo weakens each day. If the child is not retrieved before the next solstice, the enchantment will fail and the dragon will...' He trails off. The queen grips the arm of the throne. The king speaks: 'We have sent our finest knights. None have returned. The territories between here and the Badlands are each ruled by a tyrant who blocks passage. Will you undertake this quest?'",
    choices: [
      {
        text: "Pledge your sword to rescue Prince Elo",
        next: "armory",
        rpgEffects: { gold: 50 },
        moralImpact: 1,
        successText:
          "The king nods solemnly. 'Then you shall have our full support. Gold for the road, and access to our armory.' He hands you a royal seal. 'Show this to any who question your purpose.'",
        itemsGained: ["royal_seal"],
      },
      {
        text: "Ask about the territories and their tyrants",
        next: "armory",
        rpgEffects: { gold: 50 },
        successText:
          "The conjurer unrolls a map. 'First, the Murkwood — ancient and treacherous. Beyond that, each territory is worse than the last. But you must cross them all to reach the Great Dark Castle.' The king adds, 'Take fifty gold and arm yourself well.'",
        itemsGained: ["royal_seal"],
      },
      {
        text: "Tell the king that Lurch destroyed Thornwall — this is personal",
        next: "armory",
        rpgEffects: { gold: 60 },
        moralImpact: 1,
        bondEffect: { grimjaw: 3, lyralei: 3, silas: 3 },
        successText:
          "A hush falls over the court. Queen Jeannie steps forward and takes your hand. 'Then you understand our pain better than anyone. Go with our blessing — and extra provisions.' The king adds ten more gold to your purse.",
        itemsGained: ["royal_seal"],
      },
    ],
  },

  // ============================================================
  // SCENE 7: The Royal Armory
  // ============================================================
  armory: {
    title: "The Royal Armory",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "⚔️",
    narrative:
      "The royal armorer leads you into a vaulted stone chamber lined with weapons and armor. Racks of swords, bows, staves, shields, and curious artifacts fill every wall. 'Choose your loadout carefully,' the armorer says. 'The Murkwood will test you in ways steel alone cannot answer.' He gestures toward a barrel by the door. 'And take a torch — where you're going, the darkness itself is your enemy.' Three weapon sets catch your eye, each suited to a different style of combat.",
    choices: [
      {
        text: "Take the Sword & Shield — strength and protection",
        next: "tavern",
        statBoost: { attack: 3, defense: 2 },
        itemsGained: ["sword_shield", "torch"],
        successText:
          "The blade hums as you draw it. Solid steel, well-balanced. The shield bears the crest of Laffter Land.",
      },
      {
        text: "Take the Bow & Leather Cloak — speed and precision",
        next: "tavern",
        statBoost: { attack: 2, cunning: 3 },
        itemsGained: ["bow_cloak", "torch"],
        successText:
          "The bow is yew, light and deadly. The leather cloak lets you move like a shadow.",
      },
      {
        text: "Take the Staff & Scrolls — knowledge and arcane power",
        next: "tavern",
        statBoost: { cunning: 5, defense: 1 },
        itemsGained: ["staff_scrolls", "torch"],
        successText:
          "The staff crackles with dormant energy. The scrolls contain basic wards and enchantments. Wisdom is the sharpest weapon.",
      },
    ],
  },

  // ============================================================
  // SCENE 8: The Boar's Head Inn
  // ============================================================
  tavern: {
    title: "The Boar's Head Inn",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🍖",
    narrative:
      "After arming yourself, you stop at the Boar's Head Inn for a meal before leaving Laffter Land. The place is rowdy — miners, merchants, and off-duty guards fill every bench. At a corner table sits a mountain of a man. His arms are thick as tree trunks, his face a map of old scars. He sits alone, turning a coin between battered fingers. The innkeeper whispers: 'That's Grimjaw. Best fighter in the guild. Mean as a badger, but honest as the day is long. He's been talking about the royal bounty on Prince Elo.'",
    choices: [
      {
        text: "Offer Grimjaw a share of the king's reward to join you",
        next: "forest_road",
        recruitMember: "grimjaw",
        bondEffect: { grimjaw: 5 },
        successText:
          "Grimjaw looks you up and down, stares at you for a long moment, then grins. 'You've got guts showing up at my table. Alright, knight — I'm in. But I get a fair cut of the treasure.' He stands, towering over you, and extends a hand the size of a dinner plate.",
      },
      {
        text: "Challenge Grimjaw to arm wrestling to test his mettle",
        next: "forest_road",
        recruitMember: "grimjaw",
        bondEffect: { grimjaw: 8 },
        successText:
          "He slams your arm down in two seconds flat, then roars with laughter. 'Ha! You've got courage, I'll give you that. Most men see these arms and run.' He wipes his eyes. 'Anyone fool enough to challenge me is fool enough for this quest. Count me in.'",
      },
      {
        text: "Go alone — you don't need anyone slowing you down",
        next: "forest_road",
        isLessIdeal: true,
        moralImpact: -1,
        successText:
          "You leave Grimjaw at his table. A knight of Thornwall needs no one.",
        setbackSteps: [
          {
            title: "The Lonely Road",
            chapter: "Detour",
            art: "🚶",
            narrative:
              "You march out of Laffter Land alone. The road ahead stretches empty and long. Pride in self-reliance is one thing, but refusing help when the stakes are this high? Even the greatest knights of old rode with companions at their side.",
            choices: [
              { text: "Reconsider your decision" },
              { text: "Acknowledge that teamwork has value" },
              { text: "Press on, but with humility" },
            ],
          },
          {
            title: "A Hard Lesson",
            chapter: "Detour",
            art: "💭",
            narrative:
              "As night falls and the forest looms, you realize how quiet it is without another voice. The best quests in every tale were never completed alone. Perhaps next time help is offered, you'll accept.",
            choices: [
              { text: "Learn from this choice" },
              { text: "Keep your eyes open for allies" },
              { text: "Continue with humility" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 9: The Forest Road
  // ============================================================
  forest_road: {
    title: "The Forest Road",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🌲",
    narrative:
      "Leaving Laffter Land behind, you follow the northern road toward the Murkwood. The prosperous farmlands give way to wild forest. By late afternoon, you reach a fork in the road. The main path continues straight toward the river crossing. But to the east, strange shimmering lights dance between the trees — blue and silver, pulsing like heartbeats. A signpost, nearly rotted through, reads: 'RIVER CROSSING — 3 leagues straight. EASTERN WOOD — here be mysteries.'",
    partyNarrative: {
      grimjaw:
        "Grimjaw eyes the mysterious lights with suspicion. 'I don't trust magic. But I trust my fists even less against whatever's out there in the dark.'",
    },
    choices: [
      {
        text: "Investigate the mysterious lights",
        next: "wandering_mage",
        successText:
          "Curiosity pulls you east. The lights grow brighter as you leave the main road.",
      },
      {
        text: "Take the direct path to the river crossing",
        next: "riverbank",
        successText:
          "You keep to the main road. It's the faster route, though you wonder what you're leaving behind.",
      },
      {
        text: "Make camp for the night and rest",
        next: "camp_rest",
        successText:
          "The day has been long. You find a sheltered clearing and set up camp as the sun dips below the treeline.",
      },
    ],
  },

  // ============================================================
  // SCENE 10: Lights in the Forest
  // ============================================================
  wandering_mage: {
    title: "Lights in the Forest",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🔮",
    narrative:
      "Following the lights deeper into the forest, you come upon a desperate scene. A young woman in tattered mage robes stands with her back against a massive oak, staff raised. Three grey wolves circle her, snarling. Her conjured lights are flickering — she's nearly spent her power. A nasty scratch runs across her arm. 'Stay back!' she shouts, uncertain if you're friend or foe.",
    partyNarrative: {
      grimjaw:
        "Grimjaw cracks his knuckles. 'Wolves. I hate wolves. Let's finish this quick.'",
    },
    choices: [
      {
        text: "Draw your weapon and charge the wolves",
        next: "riverbank",
        recruitMember: "lyralei",
        rpgEffects: { xp: 5, hp: -10 },
        bondEffect: { lyralei: 10, grimjaw: 3 },
        moralImpact: 1,
        successText:
          "You slash and shout, driving the wolves back. One snaps at your arm before they scatter into the underbrush. The mage lowers her staff, breathing hard. 'I'm Lyralei. I owe you my life. Where are you headed? I'd like to come along — my magic could be useful, and... I'd rather not be alone in these woods.'",
      },
      {
        text: "Grab a branch and use fire to frighten the wolves away",
        next: "riverbank",
        recruitMember: "lyralei",
        rpgEffects: { xp: 5 },
        bondEffect: { lyralei: 8, grimjaw: 2 },
        moralImpact: 1,
        successText:
          "You light a makeshift torch and advance. The wolves' eyes go wide and they bolt into the darkness. Lyralei slumps against the tree. 'Quick thinking. I'm Lyralei — I burned through my power studying the ley lines in this forest. Foolish. Let me travel with you. I can do more than parlor tricks once I've rested.'",
      },
      {
        text: "Leave her — it's too risky to get involved",
        next: "riverbank",
        isLessIdeal: true,
        moralImpact: -1,
        successText:
          "You turn away from a person in need. The wolf snarls echo behind you.",
        setbackSteps: [
          {
            title: "A Cry in the Dark",
            chapter: "Detour",
            art: "🐺",
            narrative:
              "As you walk away, Lyralei's scream cuts through the forest. You stop. The code of knighthood is clear — you do not leave the defenseless to die. The wolves will finish her in minutes.",
            choices: [
              { text: "Turn back immediately" },
              { text: "Remember your oath" },
              { text: "A knight protects the weak" },
            ],
          },
          {
            title: "Return to Honor",
            chapter: "Detour",
            art: "⚔️",
            narrative:
              "You race back and scatter the wolves, but the moment of hesitation cost you. Lyralei is wounded worse now. She eyes you warily. 'You came back. That... counts for something.' She limps beside you, but the trust is fragile.",
            choices: [
              { text: "Offer sincere help with her wounds" },
              { text: "Accept the shame and move forward" },
              { text: "Continue to the river" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 11: Forest Camp
  // ============================================================
  camp_rest: {
    title: "Forest Camp",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🏕️",
    narrative:
      "You find a sheltered spot between two ancient oaks and build a small fire. The warmth feels good after a long day on the road. If you have companions, they settle nearby, and for a while the forest feels less threatening. The crackling fire and the distant hoot of owls create a rare moment of peace on this dangerous quest.",
    partyNarrative: {
      grimjaw:
        "Grimjaw tears off a chunk of dried meat and chews thoughtfully. 'Not bad, this questing life. Better than picking fights at the guild. ...Don't tell anyone I said that.'",
      lyralei:
        "Lyralei traces glowing patterns in the air with her finger, humming softly. 'The ley lines here are strong. This forest has old magic in its roots.'",
    },
    choices: [
      {
        text: "Rest and tend your wounds by the fire",
        next: "riverbank",
        healAmount: 25,
        partyHealAmount: 20,
        successText:
          "Sleep comes easily for once. You wake at dawn feeling stronger, your wounds already beginning to close.",
      },
      {
        text: "Stand watch while the others sleep",
        next: "riverbank",
        healAmount: 10,
        bondEffect: { grimjaw: 5, lyralei: 5, silas: 5 },
        moralImpact: 1,
        successText:
          "You keep the fire alive through the night. Your companions sleep soundly, and in the morning they notice the care you took. Respect grows quietly.",
      },
      {
        text: "Share stories around the campfire",
        next: "riverbank",
        healAmount: 15,
        bondEffect: { grimjaw: 10, lyralei: 10, silas: 10 },
        successText:
          "You trade stories late into the night. Something shifts between you — strangers becoming something more. Shared hardship has a way of building trust.",
      },
    ],
  },

  // ============================================================
  // SCENE 12: The River Crossing
  // ============================================================
  riverbank: {
    title: "The River Crossing",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🌊",
    narrative:
      "The road ends at a wide, dark river. On the far bank, the Murkwood looms — a wall of twisted black trees so thick they block the fading daylight. A rickety ferry is tied to a post on your side, and beside it a cloaked figure sits hunched over a small cooking fire, roasting something unidentifiable on a stick. Smoke curls into the evening air. Somewhere upstream, the river narrows to rapids.",
    partyNarrative: {
      grimjaw:
        "Grimjaw peers across the river and shakes his head. 'That forest looks like it wants to eat us.'",
      lyralei:
        "Lyralei shivers. 'I sense old magic in that forest. Ancient and... not entirely friendly.'",
    },
    choices: [
      {
        text: "Approach the ferryman openly",
        next: "ferryman_encounter",
        successText:
          "You walk toward the cloaked figure. He doesn't look up from his fire.",
      },
      {
        text: "Scout from the treeline first",
        next: "ferryman_encounter",
        rpgEffects: { xp: 3 },
        successText:
          "You observe from cover. The ferryman moves with unsettling precision — every motion economical, like a predator at rest. Beneath his ragged cloak, you catch the glint of metal. This man is no simple boatman.",
      },
      {
        text: "Skip the ferry — look for a place to ford upstream",
        next: "ford_river",
        successText:
          "You head upstream, searching for a crossing point away from the mysterious ferryman.",
      },
    ],
  },

  // ============================================================
  // SCENE 13: The Ferryman
  // ============================================================
  ferryman_encounter: {
    title: "The Ferryman",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "⛵",
    narrative:
      "The cloaked figure finally looks up as you approach. Sharp grey eyes study you from beneath a hood. He's lean and angular, with a thin scar running from his left ear to his chin. He takes a slow bite of his roasted meat and speaks without standing. 'Well, well. Another batch of would-be heroes off to die in the Murkwood.' He gestures lazily toward the ferry. 'Fifty gold. One way. I don't haggle, I don't give discounts, and I don't care about your noble quest. Gold or get lost.'",
    partyNarrative: {
      grimjaw:
        "Grimjaw's hand drifts to his weapon. 'I could toss this runt into the river,' he mutters.",
      lyralei:
        "Lyralei whispers, 'There's something about him... he's more dangerous than he looks. Much more.'",
    },
    choices: [
      {
        text: "Pay the fifty gold toll",
        next: "murkwood_entry",
        requiresGold: 50,
        rpgEffects: { gold: -50 },
        failText: "You check your purse. Not enough gold. The ferryman smirks. 'Come back when you can afford it.'",
        successText:
          "You count out the coins. The ferryman scoops them up, bites one, and nods. 'Smart choice. Get in. And don't rock the boat — I just patched the hull.' The crossing is silent and tense.",
      },
      {
        text: "Draw your weapon and threaten him",
        isLessIdeal: true,
        moralImpact: -1,
        battleEncounter: {
          enemy: "Silas the Ferryman",
          enemyPower: 35,
          description:
            "The ferryman's cloak falls away in a single fluid motion, revealing pitch-black leather armor and twin silver daggers that seem to appear from nowhere. His lazy demeanor vanishes, replaced by the cold focus of a master fighter. 'Wrong choice, friend,' he whispers with a smile that doesn't reach his eyes.",
          winNext: "ferryman_defeated",
          winText:
            "Against all odds, your party overpowers the master fighter. Silas drops to one knee, battered. 'Impressive... you're the first to best me in twenty years.'",
          fatal: true,
          fleeNext: "riverbank",
          fleeDifficulty: 10,
          goldReward: 40,
          xpReward: 30,
        },
      },
      {
        text: "Appeal to his pride — 'A man of your skills, wasting away at a river?'",
        next: "ferryman_persuaded",
        requiresCunning: 10,
        failText:
          "The ferryman sees through your flattery instantly. 'Nice try, lad. I've bested men more silver-tongued than you. Gold. Or. Get. Lost.'",
        bondEffect: { silas: 5 },
        successText:
          "Something flickers in the ferryman's eyes. You've struck a nerve.",
      },
      {
        text: "Look for another way across",
        next: "ford_river",
        successText:
          "The ferryman shrugs. 'Your funeral, hero. The river's cold and fast up that way.'",
      },
    ],
  },

  // ============================================================
  // SCENE 14: Silas Persuaded
  // ============================================================
  ferryman_persuaded: {
    title: "A Dangerous Alliance",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🗡️",
    narrative:
      "The ferryman stares at you for a long moment, then throws his head back and laughs — a hard, bitter sound. 'You've got nerve, I'll give you that.' He stands, and you see now just how he moves — fluid, silent, every step precise. 'My name is Silas. And you're right. I've been rotting at this crossing for three years, taking coins from fools.' He draws one of his daggers and examines it. 'The king's bounty... now that's a proper payday. I'll come with you. But I get a double share. And if things go south, I disappear. Those are my terms.'",
    choices: [
      {
        text: "Welcome Silas to the party",
        next: "murkwood_entry",
        recruitMember: "silas",
        bondEffect: { silas: 5, grimjaw: -2 },
        successText:
          "You clasp forearms. His grip is like iron. Silas pushes the ferry across the river with practiced ease, not even breaking a sweat. 'Try to keep up, hero.'",
      },
      {
        text: "Accept his terms but set ground rules — no betrayal",
        next: "murkwood_entry",
        recruitMember: "silas",
        bondEffect: { silas: 8 },
        moralImpact: 1,
        successText:
          "Silas pauses, then nods slowly. 'Fair enough. I respect a leader who speaks plainly. You've got yourself a blade for hire, knight. Use me wisely.' He ferries you across the river in silence.",
      },
    ],
  },

  // ============================================================
  // SCENE 15: Ferryman Defeated (post-battle)
  // ============================================================
  ferryman_defeated: {
    title: "The Ferryman Falls",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "⚔️",
    narrative:
      "Silas kneels on the riverbank, daggers fallen from his hands. Bruises and cuts cover his arms. He looks up at you with something between respect and disbelief. 'Twenty years... no one's ever beaten me.' 'Take the ferry. And this —' he pushes a leather pouch toward you. 'I won't be needing it.' He staggers to his feet, grabs his cloak, and limps into the forest without looking back. You could have had a powerful ally. Instead, you have a wounded enemy somewhere in the trees behind you.",
    choices: [
      {
        text: "Take the ferry across and press on",
        next: "murkwood_entry",
        rpgEffects: { gold: 40, xp: 10 },
        successText:
          "You pole the ferry across yourself. The dark water is cold and silent.",
      },
      {
        text: "Search his camp for supplies",
        next: "murkwood_entry",
        rpgEffects: { gold: 60, xp: 5 },
        itemsGained: ["antique_dagger"],
        successText:
          "Among his things you find extra gold and a finely crafted antique dagger. A reminder of the man you chose to fight rather than befriend.",
      },
    ],
  },

  // ============================================================
  // SCENE 16: Ford the River
  // ============================================================
  ford_river: {
    title: "The Upstream Crossing",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "💧",
    narrative:
      "Half a mile upstream, the river widens over a rocky bed. The water is waist-deep and bitterly cold, with a strong current pulling toward the rapids downstream. Slippery stones shift underfoot. It's crossable, but it won't be comfortable — or safe.",
    partyNarrative: {
      grimjaw:
        "Grimjaw eyes the water with distaste. 'I sink like a stone. This better be worth it.'",
      lyralei:
        "Lyralei hugs her scrolls to her chest. 'The water will ruin my supplies if I'm not careful.'",
      silas:
        "Silas moves through the water like a ghost, barely making a ripple.",
    },
    choices: [
      {
        text: "Wade through carefully, using a rope between trees",
        next: "murkwood_entry",
        rpgEffects: { hp: -10 },
        partyHpEffect: -8,
        successText:
          "The cold water numbs your legs and the current tears at your footing, but you make it across. Everyone is soaked and shivering, but alive.",
      },
      {
        text: "Build a makeshift raft from fallen logs",
        next: "murkwood_entry",
        rpgEffects: { hp: -5 },
        requiresCunning: 7,
        failText:
          "The raft falls apart halfway across. You flounder through the water, taking a beating from the rocks. A rope would have been safer.",
        successText:
          "It takes time, but the raft holds. You float across with minimal trouble, only getting splashed. Clever beats strong sometimes.",
      },
      {
        text: "Turn back and try the ferryman after all",
        next: "ferryman_encounter",
        successText:
          "Maybe that rude ferryman is the better option after all. You retrace your steps to the crossing.",
      },
    ],
  },

  // ============================================================
  // SCENE 17: Into the Murkwood
  // ============================================================
  murkwood_entry: {
    title: "Into the Murkwood",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🌑",
    narrative:
      "The Murkwood swallows you whole. Twisted black trees press in from all sides, their branches intertwined overhead like the fingers of clasped hands. What little daylight remains is choked to a grey gloom. The air is thick, damp, and smells of rotting leaves and something older — something that has been here since before humans walked these lands. Strange sounds echo in the distance: a branch snapping, something breathing, a whisper that might be wind or might be a voice.",
    partyNarrative: {
      grimjaw:
        "Grimjaw grips his weapon tight and walks close. For once, he doesn't joke. 'Keep your eyes open. Everything in this forest wants to kill us.'",
      lyralei:
        "Lyralei's staff glows faintly, casting blue light a few feet ahead. 'The ley lines are twisted here. Something corrupted this forest long ago.'",
      silas:
        "Silas melts into the shadows, moving silently. Every few minutes he reappears at your side. 'Three figures in the trees. Eighty yards east. They're watching us.'",
    },
    choices: [
      {
        text: "Move cautiously along the old trail",
        next: "murkwood_ambush",
        rpgEffects: { xp: 3 },
        successText:
          "You follow a barely-visible trail of old boot prints and broken twigs. The forest presses close, but the path holds.",
      },
      {
        text: "Stick to open ground where you can see",
        next: "murkwood_ambush",
        successText:
          "You avoid the thickest growth, keeping to clearings where you can spot threats. It's slower, but safer... or so you think.",
      },
      {
        text: "Charge straight through — speed over caution",
        next: "murkwood_ambush",
        isLessIdeal: true,
        rpgEffects: { hp: -5 },
        successText:
          "Your haste costs you — branches whip your face and roots snag your boots.",
        setbackSteps: [
          {
            title: "Reckless Haste",
            chapter: "Detour",
            art: "🌿",
            narrative:
              "Crashing through the undergrowth, you stumble into a thornbush and tear your cloak. Worse, the noise alerts everything in the forest to your position. Patience in dangerous terrain isn't cowardice — it's wisdom.",
            choices: [
              { text: "Slow down and regroup" },
              { text: "Listen before moving" },
              { text: "Learn from the mistake" },
            ],
          },
          {
            title: "Steady Progress",
            chapter: "Detour",
            art: "🧭",
            narrative:
              "You patch your wounds and pick thorns from your gear. Moving more carefully now, you pick up the trail again. The Murkwood doesn't forgive impatience.",
            choices: [
              { text: "Proceed with caution" },
              { text: "Watch your footing" },
              { text: "Continue the journey" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 18: Ambush in the Murkwood
  // ============================================================
  murkwood_ambush: {
    title: "Shadows in the Trees",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🗡️",
    narrative:
      "A rope snaps taut across the trail. Figures drop from the branches — five ragged men with rusty swords and desperate eyes. Their leader, a gaunt man with a wolf-pelt cape, steps forward. 'Your gold and your weapons. Hand them over nice and slow, and maybe we let you walk out of this forest alive.' His men spread out, forming a loose circle around your party.",
    partyNarrative: {
      grimjaw:
        "Grimjaw rolls his neck and grins. 'Finally. I was getting bored.'",
      lyralei:
        "Lyralei's hands glow softly as she begins a wordless incantation. 'Say the word.'",
      silas:
        "Silas has already vanished into the shadows. You catch the glint of a dagger in the trees behind the bandits. He's flanking them.",
    },
    choices: [
      {
        text: "Draw weapons and fight!",
        battleEncounter: {
          enemy: "Murkwood Bandits",
          enemyPower: 14,
          description:
            "Five bandits with rusty swords fan out around you. They're desperate and hungry, but poorly trained. Their leader barks orders as they close in.",
          winNext: "dark_passage",
          winText:
            "The bandits scatter into the trees, leaving their wounded leader crawling in the dirt. Your party emerges victorious, though not unscathed.",
          loseNext: "dark_passage",
          loseText:
            "The bandits overwhelm you with numbers. You take a beating before they grab what they want and flee. Bruised but alive.",
          fleeNext: "dark_passage",
          fleeDifficulty: 5,
          goldReward: 20,
          xpReward: 15,
        },
        successText: "Steel rings as blades are drawn!",
      },
      {
        text: "Offer them thirty gold to let you pass",
        next: "dark_passage",
        requiresGold: 30,
        rpgEffects: { gold: -30 },
        failText: "You don't have enough gold to bribe them. The bandits close in...",
        successText:
          "The bandit leader snatches the gold and weighs it in his palm. 'Smart traveler. Move along, and don't come back this way.' His men melt back into the forest.",
      },
      {
        text: "Try to intimidate them into backing down",
        next: "dark_passage",
        requiresAttack: 18,
        failText:
          "The bandit leader laughs. 'You don't scare us, hero. There are five of us and you don't look that tough.' They advance.",
        successText:
          "You step forward, weapon raised, and let them see the royal seal of Laffter Land on your shield. The bandits exchange nervous glances. 'It's not worth it,' one mutters. They fade back into the trees.",
        moralImpact: 1,
      },
      {
        text: "Surrender your gold without a fight",
        next: "dark_passage",
        isLessIdeal: true,
        rpgEffects: { gold: -20 },
        successText:
          "You hand over your coins without resistance. The bandits take what they want and vanish.",
        setbackSteps: [
          {
            title: "Cowardice Has a Price",
            chapter: "Detour",
            art: "😞",
            narrative:
              "The bandits take your gold and laugh as they leave. Your companions — if you have any — look at you with quiet disappointment. A knight doesn't surrender to common thugs without even trying. The cost isn't just gold — it's respect.",
            choices: [
              { text: "Vow to stand firmer next time" },
              { text: "Acknowledge the failure" },
              { text: "Earn back your party's trust" },
            ],
          },
          {
            title: "Resolve Renewed",
            chapter: "Detour",
            art: "💪",
            narrative:
              "You tighten your grip on your weapon. That's the last time you back down from a fight you could have won. Every setback is a teacher if you let it be.",
            choices: [
              { text: "Move forward with determination" },
              { text: "Keep your weapon ready" },
              { text: "Continue through the Murkwood" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 19: The Dark Passage
  // ============================================================
  dark_passage: {
    title: "The Dark Passage",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🕳️",
    narrative:
      "Beyond the bandit ambush, the trail narrows to a rocky ravine. The trees thin out, replaced by mossy stone walls that rise on both sides. Ahead, the path splits. To the left, a gaping cave mouth yawns open — pitch black, with a foul wind breathing out of it like some living thing. Strange scratch marks line the stone around the entrance, and strange claw marks surround the entrance. To the right, the trail continues along the ridgeline through the forest — longer, but open to what pale light filters through the canopy.",
    partyNarrative: {
      grimjaw:
        "Grimjaw peers into the cave and spits. 'Something lives in there. Something big. I can smell it.'",
      lyralei:
        "Lyralei holds her staff forward, but its glow dies at the cave's mouth as if the darkness swallows it. 'There's a presence in there. Old. Hungry. We should not enter blind.'",
      silas:
        "Silas studies the claw marks with professional interest. 'These scratches are fresh. Whatever made them has claws the length of short swords. Your call, knight.'",
    },
    choices: [
      {
        text: "Light your torch and enter the cave",
        next: "dark_passage_lit",
        requiresItem: "torch",
        lockedText: "You reach for a torch, but you don't have one. The cave is impossibly dark — you'd be walking in blind.",
        consumesItems: ["torch"],
        rpgEffects: { xp: 10 },
        successText:
          "You strike the torch alight. Warm flame pushes back the darkness, and you step into the cave with fire held high.",
      },
      {
        text: "Enter the cave without a light — how bad can it be?",
        next: "jabberwocky_death",
        successText:
          "You step into the blackness. For a moment, there is only the sound of dripping water and your own breathing. Then something enormous shifts in the dark ahead of you...",
      },
      {
        text: "Take the forest trail around — the long way is the safe way",
        next: "clearing",
        successText:
          "You follow the ridgeline trail. It's longer, but the fading daylight guides your steps. Sometimes the wisest choice is the cautious one.",
      },
    ],
  },

  // ============================================================
  // SCENE 19b: The Lit Cave
  // ============================================================
  dark_passage_lit: {
    title: "The Jabberwocky's Lair",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🔥",
    narrative:
      "Your torch casts dancing shadows on the cave walls as you advance. The passage is wide enough for two abreast, with a ceiling lost in darkness above. Then your torchlight catches something that stops you cold — a massive shape curled against the far wall. A Jabberwocky. The creature is enormous: scaled hide the color of diseased iron, jaws lined with enormous teeth, and claws as long as daggers. It stirs at the light, one yellow eye cracking open. But the fire makes it flinch. It hisses — a sound like steam escaping a forge — and retreats deeper into the shadows, unwilling to challenge the flame. You edge past its nest of old armor and debris, heart hammering, and emerge from the far side of the cave into a silver-lit clearing.",
    partyNarrative: {
      grimjaw:
        "Grimjaw whispers through clenched teeth, barely breathing: 'That thing could eat a horse whole. Bless that torch, knight. Bless it.'",
      lyralei:
        "Lyralei's face is white. 'A Jabberwocky. They hunt by sound and smell in total darkness. Without that torch, we would never have seen it coming.'",
      silas:
        "Silas moves like a ghost, daggers drawn, eyes locked on the creature until you're clear. 'Remember this. There will be more dark places ahead. Never enter one without a light.'",
    },
    choices: [
      {
        text: "Press on quickly into the clearing ahead",
        next: "clearing",
        rpgEffects: { xp: 5 },
        bondEffect: { grimjaw: 5, lyralei: 5, silas: 5 },
        moralImpact: 1,
        successText:
          "You emerge from the cave trembling but alive. The clearing ahead glows with an otherworldly silver light. Your companions look at you with new respect — that torch saved everyone's life.",
      },
      {
        text: "Search the Jabberwocky's nest for anything useful",
        next: "clearing",
        rpgEffects: { xp: 5, gold: 25 },
        successText:
          "Among the scattered rubble and rusted armor, you find a pouch of gold coins from some less fortunate traveler. A reminder of what happens to those who wander these caves in the dark.",
      },
    ],
  },

  // ============================================================
  // SCENE 19c: Jabberwocky Death
  // ============================================================
  jabberwocky_death: {
    title: "It Is Very Dark",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🐲",
    narrative:
      "The darkness is absolute. You can't see your hand in front of your face. Water drips somewhere in the distance. Your footsteps echo off unseen walls. Then you hear it — a slow, wet breathing, deep and rhythmic, like bellows in a forge. A terrible smell fills the cave. Something massive scrapes against stone ahead. Two yellow eyes open in the darkness, each the size of a dinner plate, slitted like a cat's and burning with dim, hungry intelligence. A Jabberwocky. The creature's jaws open with a sound like cracking timber, and a blast of foul air washes over you. Without light, you never had a chance. The darkness was its domain, and you walked right into it.",
    partyNarrative: {
      grimjaw:
        "Grimjaw roars a challenge into the dark, but the sound is swallowed by the cave. 'I can't see it! Where is —'",
      lyralei:
        "Lyralei tries to conjure light, but the cave's darkness is deeper than magic. 'No... no, no, NO —'",
      silas:
        "Even Silas, master of shadows, cannot fight what he cannot see. 'This was a mistake,' he whispers. For once, there is fear in his voice.",
    },
    choices: [
      {
        text: "Try to run back toward the entrance",
        rpgEffects: { hp: -999 },
        successText:
          "You turn to flee, but the Jabberwocky is faster. In the dark, it is king. The creature catches you before you take three steps. Your adventure ends here — lost in the darkness. The Jabberwocky claims another victim. Remember: never enter a dark place without a torch.",
      },
      {
        text: "Draw your weapon and fight blind",
        rpgEffects: { hp: -999 },
        successText:
          "You swing wildly at the darkness, blade finding nothing but air. The Jabberwocky strikes from a direction you never expected. In absolute darkness, courage alone is not enough. Your quest ends here, lost to the creature you never saw. Remember: never enter a dark place without a torch.",
      },
      {
        text: "Stand perfectly still and hope it passes",
        rpgEffects: { hp: -999 },
        successText:
          "You hold your breath, but the Jabberwocky hunts by smell and sound — your heartbeat thunders like a drum in the silence. It finds you easily. The creature finds you in the dark. It's over. Remember: never enter a dark place without a torch.",
      },
    ],
  },

  // ============================================================
  // SCENE 20: The Radiant Pool
  // ============================================================
  clearing: {
    title: "The Radiant Pool",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "✨",
    narrative:
      "Deep in the heart of the Murkwood, you stumble into a clearing bathed in pale silver light. In its center lies a radiant pool of still, glowing water — its surface shimmers with golden light that seems to come from somewhere far below. Ancient stones ring the pool's edge, carved with symbols from a language long dead. A small crystal sphere rests on a moss-covered pedestal beside the water, pulsing with warm energy. The air here is different — clean, peaceful, as if the corruption of the forest cannot touch this place. Your wounds seem to ache less. Even the shadows at the edge of the clearing seem held at bay.",
    partyNarrative: {
      grimjaw:
        "Grimjaw kneels beside the pool, surprisingly reverent. 'My grandmother told me about places like this. Sacred ground. Even the wolves won't cross here.'",
      lyralei:
        "Lyralei's eyes widen. 'This pool predates the forest itself. The magic here is pure — older than any spell I've studied. We should treat this place with respect.'",
      silas:
        "Silas stands at the edge of the clearing, arms crossed. Something in his expression softens for just a moment before the mask returns. 'Didn't think places like this still existed.'",
    },
    choices: [
      {
        text: "Take the relic from the pedestal — it may prove useful against the dragon",
        next: "chapter1_end",
        itemsGained: ["murkwood_relic"],
        rpgEffects: { xp: 5 },
        successText:
          "As your fingers close around the relic, warmth floods through you. The crystal pulses once, twice, then dims to a steady glow. It feels right in your hand — like it was waiting for someone worthy.",
      },
      {
        text: "Kneel by the pool and reflect on the journey ahead",
        next: "chapter1_end",
        healAmount: 50,
        partyHealAmount: 40,
        bondEffect: { grimjaw: 5, lyralei: 5, silas: 8 },
        moralImpact: 1,
        successText:
          "You kneel at the water's edge and let the stillness wash over you. The pool's light ripples outward, and a wave of warmth flows through you and your companions. Wounds close, aches fade, and for a moment you feel a profound peace. Something ancient and good has blessed your quest.",
      },
      {
        text: "Study the inscriptions on the ancient stones",
        next: "chapter1_end",
        rpgEffects: { xp: 10 },
        statBoost: { cunning: 2 },
        successText:
          "The symbols carved into the stones reveal themselves slowly to your study. They speak of an age when dragons and humans lived in balance, before Lurch and his kind turned to destruction. The knowledge settles in your mind, sharpening your understanding of the world. This will prove valuable.",
      },
    ],
  },

  // ============================================================
  // SCENE 20: Edge of the Unknown
  // ============================================================
  chapter1_end: {
    title: "Edge of the Unknown",
    chapter: "Chapter 1 — The Murkwood Crossing",
    art: "🌅",
    narrative:
      "You emerge from the Murkwood as dawn breaks. Before you stretches a vast, scarred landscape — cracked earth, blackened ridges, and a sky stained amber by something that isn't the sun. In the far, far distance, barely visible on the horizon, a dark shape rises against the sky: the Great Dark Castle, where Prince Elo sleeps his enchanted sleep and the dragon Lurch waits. Between here and there lie territories unknown, each ruled by tyrants who will not let you pass easily. But you've crossed the Murkwood. You've faced bandits, rivers, and the darkness of the deep forest. The first test is behind you. Around you, your companions — if you've gathered them — stand in the dawn light, battered but unbowed. You've shared danger, and something has changed. They are no longer strangers walking the same road. They are the beginning of something more.",
    partyNarrative: {
      grimjaw:
        "Grimjaw stands beside you, staring at the Badlands. 'Long road ahead, knight. But I've seen worse.' He pauses. 'Not much worse. But worse.' A rare, genuine smile crosses his scarred face.",
      lyralei:
        "Lyralei shields her eyes against the amber glow. 'The magic ahead is... different. Darker. We'll need each other more than ever.' She glances at you. 'I'm glad I'm not making this journey alone.'",
      silas:
        "Silas surveys the landscape with professional assessment. 'Multiple defensible positions between here and the castle. At least four territories to cross. Three tyrants that I know of, probably more.' He looks at you. 'This is going to be interesting.'",
    },
    choices: [
      {
        text: "Set up camp and plan the next leg of the journey",
        endsStory: true,
        moralImpact: 1,
        bondEffect: { grimjaw: 5, lyralei: 5, silas: 5 },
        successText:
          "You build a fire at the forest's edge and look out over the challenges ahead. The first chapter is complete.",
      },
      {
        text: "Stand in silence and steel yourself for what's ahead",
        endsStory: true,
        moralImpact: 1,
        successText:
          "The dawn wind whips your cloak. Somewhere beyond this wasteland, a child needs saving and a dragon needs facing. You're ready.",
      },
      {
        text: "Look back at how far you've come, then forward to the journey ahead",
        endsStory: true,
        moralImpact: 1,
        bondEffect: { grimjaw: 3, lyralei: 3, silas: 3 },
        successText:
          "Behind you, the Murkwood. Ahead, the unknown. But you are not the same knight who walked into that guild hall. You have purpose, companions, and the beginning of a legend.",
      },
    ],
  },
};
