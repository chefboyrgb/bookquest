export const storyNodes = {
  // ============================================================
  // SCENE 1: The Bunkhouse
  // ============================================================
  start: {
    title: "Bunkhouse 7-G",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🏚️",
    narrative:
      "The mining bell clanged twelve hours ago and won't ring again for six more. Bunkhouse 7-G is dark, packed with sleeping miners — men and women with dust in their lungs and tracking bands on their wrists. {playerName} lies awake on a thin mat, staring at the metal ceiling. You've been a captive worker on Lowler Prime your whole life. Digging myrridium out of the rock for the Nefaridrone Empire. You've never seen the stars except through the clouded dome of the mine shaft. But tonight something is different. The electronic lock on the bunkhouse door is flickering — the power relay must be glitching again. The red light blinks... and goes dark.",
    choices: [
      {
        text: "Slip out of bed and test the door",
        next: "door_open",
        moralImpact: 1,
        rpgEffects: { xp: 5 },
        successText:
          "Your heart pounds as you ease off the mat. The door slides open with a soft hiss. The corridor beyond is dimly lit and empty.",
      },
      {
        text: "Wake up your bunkmate and tell them about the door",
        next: "door_open",
        moralImpact: 1,
        successText:
          "Your bunkmate rolls over and stares at you with wide eyes. 'Don't be stupid,' they whisper. 'If they catch you out there...' But they don't stop you. 'Go. And don't look back.'",
      },
      {
        text: "Stay in bed — it's too dangerous",
        next: "door_open",
        isLessIdeal: true,
        successText:
          "You pull the blanket over your head. But sleep won't come. The door is open. When has a door ever been open? This might be your only chance. Ever.",
        setbackSteps: [
          {
            title: "Fear in the Dark",
            chapter: "Detour",
            art: "😰",
            narrative:
              "Minutes tick by. The lock stays dark. You think about every day you've spent in the mines — the dust, the pain, the guards with their shock sticks. Is this really the life you want forever?",
            choices: [
              { text: "Get up before the chance is gone" },
              { text: "Remember what freedom means" },
              { text: "Think about what's out there, beyond the sky" },
            ],
          },
          {
            title: "Now or Never",
            chapter: "Detour",
            art: "💪",
            narrative:
              "You throw off the blanket. The lock is still dead. You don't know if this chance will ever come again. Your hands are shaking, but your legs carry you to the door.",
            choices: [
              { text: "Slip through the door" },
              { text: "Take a deep breath and go" },
              { text: "Step into the unknown" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 2: The Open Door
  // ============================================================
  door_open: {
    title: "The Corridor",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🚪",
    narrative:
      "The bunkhouse corridor stretches in both directions. Emergency floor lights cast a sickly green glow. To the left, the path leads deeper into the mining complex — storerooms, the mess hall, and the maintenance tunnels. To the right, a long corridor leads toward the surface levels and the officer's quarters. You can hear the rhythmic clank of a patrol droid somewhere above. You need to move — the power relay could reset at any moment and seal you inside again.",
    choices: [
      {
        text: "Head left toward the storerooms — maybe find supplies",
        next: "storeroom",
        rpgEffects: { xp: 3 },
        successText:
          "You pad silently down the left corridor. If you're going to escape this planet, you'll need more than just courage.",
      },
      {
        text: "Head right toward the surface — get out as fast as possible",
        next: "patrol_encounter",
        rpgEffects: { xp: 3 },
        successText:
          "Speed over preparation. You turn right and move quickly toward the surface access stairs.",
      },
      {
        text: "Wait and listen — figure out the patrol patterns first",
        next: "storeroom",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "You press against the wall and listen. Clank... clank... clank. The droid passes every ninety seconds. That gives you a window. Smart thinking.",
      },
    ],
  },

  // ============================================================
  // SCENE 3: The Storeroom
  // ============================================================
  storeroom: {
    title: "Supply Storeroom",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "📦",
    narrative:
      "The storeroom is a cluttered mess of crates, tools, and spare parts. Mining equipment lines the walls. But among the drilling bits and rock samples, you spot some things that could actually be useful: a stack of emergency food modules on a shelf, a crate labeled 'O2 CANISTERS — HAZARD TEAM ONLY,' and a battered med kit hanging on the wall. You can't carry everything — you'll need to choose quickly before the next patrol sweep.",
    choices: [
      {
        text: "Grab the food modules and O2 canisters",
        next: "patrol_encounter",
        itemsGained: ["food_module", "o2_canister"],
        rpgEffects: { xp: 3 },
        successText:
          "You stuff the food modules into your coveralls and clip two O2 canisters to your belt. Essential supplies secured.",
      },
      {
        text: "Take the med kit and O2 canisters",
        next: "patrol_encounter",
        itemsGained: ["med_kit", "o2_canister"],
        rpgEffects: { xp: 3 },
        successText:
          "The med kit is compact and the O2 canisters are small enough to carry. Medical supplies could save your life.",
      },
      {
        text: "Search for anything useful in the back",
        next: "patrol_encounter",
        itemsGained: ["food_module", "o2_canister", "laser_cutter"],
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "Behind a stack of drilling equipment, you find a laser cutter — a tool miners use to slice through rock. It doubles as a weapon in a pinch. You grab that along with food and O2.",
      },
    ],
  },

  // ============================================================
  // SCENE 4: Patrol Encounter
  // ============================================================
  patrol_encounter: {
    title: "Roving Patrol",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🤖",
    narrative:
      "You round a corner and freeze. Twenty meters ahead, a Nefaridrone patrol droid hovers at head height — a round, armored sphere with glowing red sensors and a shock prod mounted underneath. It hasn't seen you yet. Its sensor array is sweeping left to right in a slow arc. There's a ventilation shaft in the ceiling to your left, and a storage alcove to your right that's half-blocked by crates.",
    choices: [
      {
        text: "Duck into the storage alcove and hide",
        next: "surface_access",
        rpgEffects: { xp: 3 },
        successText:
          "You squeeze behind the crates and hold your breath. The droid floats past, its red sensor sweeping over your hiding spot. It pauses... then continues down the corridor. Your heart is in your throat, but you're safe.",
      },
      {
        text: "Climb into the ventilation shaft",
        next: "surface_access",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        successText:
          "You pull yourself up into the shaft and crawl through the narrow metal duct. It's tight and dusty, but it takes you past the patrol entirely. You drop down on the far side, closer to the surface.",
      },
      {
        text: "Try to sprint past it before it turns",
        next: "surface_access",
        isLessIdeal: true,
        rpgEffects: { hp: -10 },
        successText:
          "You bolt! The droid's sensors snap toward you and it fires its shock prod. Pain sears through your leg, but momentum carries you around the corner and out of range.",
        setbackSteps: [
          {
            title: "Alarm!",
            chapter: "Detour",
            art: "🚨",
            narrative:
              "The droid shrieks an alarm tone. Red lights flash in the corridor. You scramble down a side passage as boots pound somewhere behind you. Running headfirst into danger without a plan is a quick way to get caught — or worse.",
            choices: [
              { text: "Find a hiding spot and wait for the alarm to pass" },
              { text: "Think before you act next time" },
              { text: "Keep moving but more carefully now" },
            ],
          },
          {
            title: "Close Call",
            chapter: "Detour",
            art: "😮‍💨",
            narrative:
              "After what feels like an eternity hiding in a supply closet, the alarm dies down. The patrol droids move on to another sector. Your leg throbs where the shock prod hit you. Lesson learned: stealth beats speed.",
            choices: [
              { text: "Move on more carefully" },
              { text: "Stay alert" },
              { text: "Continue toward the surface" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 5: Surface Access
  // ============================================================
  surface_access: {
    title: "Surface Level",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🪜",
    narrative:
      "You climb the final set of stairs and emerge onto the surface level of the mining compound. The sky above Lowler Prime is a muddy orange-brown — you've never seen it at night before. Stars glimmer faintly through the atmospheric haze. The compound stretches out before you: guard towers with searchlights sweeping the perimeter, rows of industrial buildings, and — there — Hangar Bay 3, where the officers keep their personal ships. A searchlight beam passes overhead. You've got maybe thirty seconds before it sweeps back.",
    choices: [
      {
        text: "Sprint to the hangar while the searchlight is away",
        next: "hangar_bay",
        rpgEffects: { xp: 5 },
        successText:
          "You run like you've never run before. Your boots pound the dusty ground. The searchlight begins its return sweep as you dive through the hangar door. Made it.",
      },
      {
        text: "Move between buildings, using cover",
        next: "hangar_bay",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        moralImpact: 1,
        successText:
          "You dart from shadow to shadow — behind a fuel depot, along a wall, under a loading platform. It takes longer, but no searchlight ever touches you.",
      },
      {
        text: "Look for a guard uniform to disguise yourself",
        next: "hangar_bay",
        rpgEffects: { xp: 3 },
        successText:
          "You spot a laundry bin near the guard barracks and pull out a rumpled officer's jacket. It's too big, but in the dark it might fool a droid's sensors. You walk toward the hangar with your head down, heart hammering.",
      },
    ],
  },

  // ============================================================
  // SCENE 6: Hangar Bay 3
  // ============================================================
  hangar_bay: {
    title: "Hangar Bay 3",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🛫",
    narrative:
      "The hangar is massive — a steel cavern lined with ships of various sizes. Most are heavy mining haulers, locked down with security clamps. But in the far corner, gleaming under a single light, sits something beautiful. A sleek, silver, single-seat star cruiser with swept-back wings and a glowing blue engine pod. The nameplate reads: 'GALAXY HOPPER 9000 — PROPERTY OF MAJOR ZANE.' It's the most incredible machine you've ever seen. And it's unlocked. The cockpit canopy is up, the running lights are on — as if someone was about to take it for a spin and got called away. This is it. This is your way off this rock.",
    choices: [
      {
        text: "Climb in and figure out the controls",
        next: "cockpit",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "You scramble up the ladder and drop into the pilot seat. The console lights up at your touch. Half the switches are labeled in symbols you don't recognize — but the big green button that says 'START' is pretty clear.",
      },
      {
        text: "Search the hangar for fuel cells first",
        next: "cockpit",
        itemsGained: ["fuel_cell", "fuel_cell"],
        rpgEffects: { xp: 5 },
        successText:
          "Smart thinking. You find a rack of spare fuel cells near the maintenance bay and grab two. Then you climb aboard the Galaxy Hopper. Who knows how far you need to fly?",
      },
      {
        text: "Check if there's a simpler ship to steal",
        next: "cockpit",
        isLessIdeal: true,
        successText:
          "The haulers are locked down tight. A battered shuttle has no fuel. The Galaxy Hopper is the only ship ready to fly. Sometimes you don't choose your destiny — it chooses you.",
        setbackSteps: [
          {
            title: "No Other Options",
            chapter: "Detour",
            art: "🔒",
            narrative:
              "You try three other ships. Locked. Dead batteries. Missing an engine. The Galaxy Hopper gleams in the corner, practically inviting you in. Hesitation wastes precious time — the patrols could find you at any moment.",
            choices: [
              { text: "Get in the Galaxy Hopper" },
              { text: "Stop wasting time" },
              { text: "Accept that this is the one" },
            ],
          },
          {
            title: "The Only Way",
            chapter: "Detour",
            art: "🚀",
            narrative:
              "You climb the ladder to the Galaxy Hopper's cockpit. The seat adjusts automatically. The console hums. Whatever happens next, there's no going back.",
            choices: [
              { text: "Take the controls" },
              { text: "Power up the ship" },
              { text: "This is it" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 7: In the Cockpit
  // ============================================================
  cockpit: {
    title: "The Galaxy Hopper 9000",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🚀",
    narrative:
      "The cockpit wraps around you like a second skin. Screens flicker to life showing engine status, fuel levels, and navigation charts. The ship's AI chirps: 'Good evening, Major Zane. All systems nominal. Where shall we go tonight?' It thinks you're Zane! The engine thrums beneath your seat. The hangar doors ahead are closed, but there's a manual override panel on the wall — if you can reach it. Or maybe the ship's weapons can blast through them. The fuel gauge shows three-quarters full. O2 recycler is operational. This ship has everything.",
    choices: [
      {
        text: "'Open the hangar doors,' you tell the AI, trying to sound like Zane",
        next: "liftoff",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 2 },
        moralImpact: 1,
        successText:
          "You lower your voice and bark the command. The AI pauses for one terrifying second, then responds: 'Of course, Major. Opening hangar doors.' The massive steel doors grind apart. Brilliant.",
      },
      {
        text: "Fire the ship's weapons at the hangar doors",
        next: "liftoff",
        rpgEffects: { xp: 3, hp: -5 },
        successText:
          "You jab the weapons trigger. Twin laser bolts blow the hangar doors off their tracks in a shower of sparks and twisted metal. Not subtle — but effective. Alarms scream across the compound.",
      },
      {
        text: "Run out and hit the manual override, then sprint back",
        next: "liftoff",
        rpgEffects: { xp: 3 },
        successText:
          "You leap out, slam the override switch, and scramble back into the cockpit. The doors open slowly — too slowly — but they open.",
      },
    ],
  },

  // ============================================================
  // SCENE 8: Liftoff
  // ============================================================
  liftoff: {
    title: "Liftoff!",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🔥",
    narrative:
      "You push the throttle forward. The Galaxy Hopper surges off the landing pad with a roar that shakes the entire hangar. G-forces slam you back into the seat as the ship rockets through the hangar doors and into the night sky. The brown haze of Lowler Prime falls away below you — mines, guard towers, bunkhouses — all shrinking to dots. For the first time in your life, you are flying. For the first time in your life, you are FREE. The ship's AI announces: 'Altitude: 10,000 meters and climbing. Warning: planetary defense grid is tracking this vessel.' Of course it is. This was never going to be the easy part.",
    resourceDrain: { fuel: 10 },
    choices: [
      {
        text: "Push to maximum thrust — punch through the atmosphere!",
        next: "defense_grid",
        rpgEffects: { xp: 5 },
        successText:
          "You shove the throttle to maximum. The ship screams as it tears through the upper atmosphere. The brown sky turns to black. Stars appear. Real stars.",
      },
      {
        text: "Fly low and weave between the mountains to avoid detection",
        next: "defense_grid",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        successText:
          "You drop to treetop level and weave through canyons and mountain passes. The defense grid's tracking keeps losing you in the terrain. Risky, but clever.",
      },
      {
        text: "Try to disable the defense grid signal with the ship's systems",
        next: "defense_grid",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 2 },
        successText:
          "You fumble through the ship's electronic warfare suite and manage to jam the tracking signal. The AI comments: 'Impressive for someone who's never flown before, Major.'",
      },
    ],
  },

  // ============================================================
  // SCENE 9: Defense Grid
  // ============================================================
  defense_grid: {
    title: "The Defense Grid",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "💥",
    narrative:
      "Red warning lights flood the cockpit. 'INCOMING — DEFENSE LASER TARGETING,' the AI warns. Ahead, you can see the orbital ring — a massive metal structure encircling the planet, bristling with weapon platforms. Three defense lasers swivel toward you, their charging beams glowing angry red. Behind you, the compound's lights are going crazy. They know you're running. The AI calculates: 'Impact in twelve seconds. Recommend evasive action.' Your hands are sweating on the controls.",
    resourceDrain: { fuel: 5 },
    choices: [
      {
        text: "Barrel roll through the laser fire!",
        next: "zane_transmission",
        rpgEffects: { xp: 10, hp: -10 },
        successText:
          "You throw the ship into a wild spin. Laser beams scorch past the canopy — so close you feel the heat. One clips the rear stabilizer, rocking the ship, but you blast through a gap in the orbital ring and out into open space!",
      },
      {
        text: "Dive back toward the planet and fly under the orbital ring",
        next: "zane_transmission",
        rpgEffects: { xp: 10 },
        moralImpact: 1,
        successText:
          "You pull a terrifying dive, plunging back toward the atmosphere. The lasers fire into empty space above you. Then you skim along the underside of the orbital ring, too close for the weapons to track, and slingshot out the far side. Free and clear!",
      },
      {
        text: "Target the nearest laser platform and shoot it",
        next: "zane_transmission",
        rpgEffects: { xp: 8, hp: -5 },
        statBoost: { attack: 1 },
        successText:
          "You squeeze the trigger. The Galaxy Hopper's cannons bark and the nearest laser platform explodes in a shower of sparks. The explosion creates a gap in the grid — you punch through it, taking a glancing hit from the second platform. The third fires too late.",
      },
    ],
  },

  // ============================================================
  // SCENE 10: Zane's Transmission
  // ============================================================
  zane_transmission: {
    title: "Major Zane's Tantrum",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "📻",
    narrative:
      "You're in open space. The brown marble of Lowler Prime shrinks behind you. Stars surround you in every direction — more than you ever imagined. It's so beautiful you almost forget to breathe. Then the comm system crackles to life. A face appears on the screen — red-faced, bulging veins, absolutely furious. Major Zane. His black uniform is half-buttoned, his hair is wild, and he appears to be standing in his pajamas. 'YOU! You sneaky, ship-stealing little PEST! That is MY ship! MY Galaxy Hopper! Do you have any idea how much that thing COST?! I am going to find you! I am going to chase you across EVERY star system in this quadrant! You hear me?! EVERY! SINGLE! ONE!'",
    choices: [
      {
        text: "Say: 'Sorry, Major. Nice ship though!'",
        next: "navigation",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "Zane's face turns from red to purple. 'NICE?! It's a GALAXY HOPPER NINE THOUSAND! It's the nicest ship on this whole GARBAGE PLANET!' He sputters. 'You — you — I'll find you!' The transmission cuts to static. You can't help but grin.",
      },
      {
        text: "Turn off the comm — you don't need to hear this",
        next: "navigation",
        rpgEffects: { xp: 3 },
        successText:
          "You slap the comm switch off mid-rant. Zane's purple face vanishes. Silence fills the cockpit. Freedom sounds a lot like silence.",
      },
      {
        text: "Say: 'I'm never going back to those mines. Come and get me.'",
        next: "navigation",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "Zane goes quiet for one second — genuinely stunned. Then his eye twitches. 'Oh, I will. Mark my words, mining pest. Major Zane does NOT forget and does NOT forgive!' He jabs a finger at the screen. 'This isn't over!' The comm goes dead. No, Major. For you, it's just beginning.",
      },
    ],
  },

  // ============================================================
  // SCENE 11: Navigation
  // ============================================================
  navigation: {
    title: "Charting a Course",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🗺️",
    narrative:
      "With Lowler Prime behind you, the Galaxy Hopper's navigation computer lights up with a star map. Thousands of destinations blink across the display. The AI speaks: 'Major, shall I plot a standard patrol route?' It still thinks you're Zane. You've heard whispers in the mine about a place called Icon 7 — a massive space station where the Nefaridrone Empire's grip is weaker. The Creeds run it, a syndicate that cares more about profit than politics. It might be the one place in this quadrant where a runaway mining kid could disappear. The nav computer shows Icon 7 as a yellow blip, three star systems away. At Warp 1, it'll take a while — and burn fuel.",
    resourceDrain: { food: 5 },
    choices: [
      {
        text: "Plot a direct course to Icon 7",
        next: "deep_space",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "You tap Icon 7 on the star map. The AI calculates the route: 'Course plotted. Estimated arrival at Warp 1: fourteen hours. Engaging warp drive.' The stars stretch into streaks of light. You're on your way.",
      },
      {
        text: "Search the nav computer for closer safe havens",
        next: "deep_space",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        successText:
          "You scan the nearby systems. A few small outposts, but all flagged as Nefaridrone-controlled. Icon 7 is the closest independent station. It's the only real option. You set the course.",
      },
      {
        text: "Ask the AI what it knows about Icon 7",
        next: "deep_space",
        rpgEffects: { xp: 3 },
        successText:
          "The AI pulls up a data file: 'Icon 7. Megacity-class space station. Population: 2.3 million. Governed by the Creed Syndicate. Current status: hosting a quasar observation festival. Note: multiple open warrants for Major Zane on this station.' You smile. They don't like Zane there either. Perfect.",
      },
    ],
  },

  // ============================================================
  // SCENE 12: Deep Space
  // ============================================================
  deep_space: {
    title: "The Void Between Stars",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🌌",
    narrative:
      "Warp drive engaged. The Galaxy Hopper rockets through the void at the speed of light — Warp 1. Outside the canopy, stars streak past in ribbons of blue and white. Inside, the cockpit hums softly. For the first time in your life, no one is telling you what to do. No bells. No shift whistles. No shock prods. Just you, the ship, and infinite space. The AI runs a systems check. Fuel is holding. O2 recycler is working. And there's a small pantry behind the pilot seat with some of Major Zane's personal food stash — fancy stuff you've never seen before.",
    resourceDrain: { fuel: 10, food: 5 },
    choices: [
      {
        text: "Try some of Zane's fancy food — you deserve it",
        next: "distress_signal",
        rpgEffects: { xp: 3 },
        successText:
          "You open a container labeled 'Nebula Noodles — Premium Grade.' It's the best thing you've ever tasted. Warm, savory, with little bits of something spicy. After years of gray mining gruel, this feels like a miracle.",
      },
      {
        text: "Check all the ship's systems carefully",
        next: "distress_signal",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        successText:
          "You spend an hour learning every gauge, switch, and readout. Fuel consumption, shield status, weapons charge, communications array. Knowledge is power — especially when you're alone in deep space.",
      },
      {
        text: "Try to get some sleep — it's been a long night",
        next: "distress_signal",
        healAmount: 20,
        successText:
          "The pilot seat reclines. The hum of the warp drive is surprisingly soothing. You fall asleep for the first time as a free person. When you wake, you feel better than you have in years.",
      },
    ],
  },

  // ============================================================
  // SCENE 13: Distress Signal
  // ============================================================
  distress_signal: {
    title: "A Voice in the Dark",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "📡",
    narrative:
      "Halfway to Icon 7, the comm system picks up a faint signal. The AI translates: 'This is cargo vessel Starwren... engine failure... life support failing... anyone... please...' The signal is weak — coming from a small ship adrift in an asteroid field off your current route. Diverting would cost fuel and time, and the asteroid field is dangerous. But someone out there is dying.",
    resourceDrain: { fuel: 5 },
    choices: [
      {
        text: "Divert to help — you can't ignore someone in trouble",
        next: "asteroid_rescue",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "You pull the ship off course and head into the asteroid field. The right thing to do isn't always the easy thing.",
      },
      {
        text: "Try to boost their signal and call for other help",
        next: "asteroid_rescue",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        moralImpact: 1,
        successText:
          "You use the Galaxy Hopper's powerful comm array to amplify the Starwren's distress call. But no one else responds. You're the only one close enough. You turn the ship toward the asteroids.",
      },
      {
        text: "Keep going — you can't risk it",
        next: "approach_icon7",
        isLessIdeal: true,
        successText:
          "You fly past. The distress signal fades behind you. It's the safe choice, but it doesn't feel right.",
        setbackSteps: [
          {
            title: "The Signal Fades",
            chapter: "Detour",
            art: "📻",
            narrative:
              "The distress call grows weaker with every passing second. You stare at the comm display. Someone is out there, alone and scared — just like you were in that bunkhouse. You escaped because a door opened. Maybe you're supposed to be someone else's open door.",
            choices: [
              { text: "Turn the ship around" },
              { text: "You know what the right thing is" },
              { text: "Nobody helped you — but you can be better than that" },
            ],
          },
          {
            title: "Course Corrected",
            chapter: "Detour",
            art: "🔄",
            narrative:
              "You pull the ship into a hard turn and head for the asteroid field. Better late than never. The distress signal strengthens as you close in.",
            choices: [
              { text: "Push toward the signal" },
              { text: "Scan for the stranded ship" },
              { text: "Hurry — they don't have much time" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 14: Asteroid Field Rescue
  // ============================================================
  asteroid_rescue: {
    title: "Into the Rocks",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "☄️",
    narrative:
      "The asteroid field is a maze of spinning rocks — some the size of houses, some the size of cities. The Galaxy Hopper's shields deflect pebble-sized impacts, but the bigger ones require dodging. Your ship's sensors lock onto the Starwren: a small cargo vessel wedged between two asteroids, its engine dark, emergency lights blinking. Inside, you can see a figure slumped over the controls — an older man, barely conscious. His O2 is almost gone.",
    resourceDrain: { fuel: 10, oxygen: 15 },
    choices: [
      {
        text: "Dock alongside and give him an O2 canister",
        next: "rescued_merchant",
        requiresItem: "o2_canister",
        consumesItems: ["o2_canister"],
        rpgEffects: { xp: 10 },
        moralImpact: 1,
        lockedText: "You want to give him oxygen, but you don't have a spare canister. You'll need to find another way.",
        successText:
          "You bring the ships together with agonizing precision. The Galaxy Hopper's docking clamp engages. You crack the airlock and push an O2 canister through. The man gasps, coughs, and slowly opens his eyes. 'You... saved my life, kid.'",
      },
      {
        text: "Use the ship's tow cable to pull the Starwren out of the rocks",
        next: "rescued_merchant",
        rpgEffects: { xp: 10, hp: -5 },
        moralImpact: 1,
        successText:
          "You extend the tow cable and latch onto the Starwren's hull. The Galaxy Hopper strains against the asteroids' gravity, engines screaming. Metal groans — then the Starwren breaks free. You drag it clear of the field as the old man revives in the fresh air beyond the rocks.",
      },
      {
        text: "Broadcast his position and get out — the asteroids are too dangerous",
        next: "approach_icon7",
        isLessIdeal: true,
        rpgEffects: { xp: 3 },
        successText:
          "You mark his position on the emergency channel and pull away. It's something — but you know it might not be enough.",
        setbackSteps: [
          {
            title: "Not Enough",
            chapter: "Detour",
            art: "😔",
            narrative:
              "As you fly away, the man's fading voice crackles over the comm: 'Please... don't go...' His O2 readout is almost zero. Broadcasting his position means nothing if no one else is nearby. You have the power to save him right now.",
            choices: [
              { text: "Turn back and help properly" },
              { text: "You'd want someone to do this for you" },
              { text: "Do the hard thing — it's the right thing" },
            ],
          },
          {
            title: "Back Into the Rocks",
            chapter: "Detour",
            art: "☄️",
            narrative:
              "You push back into the asteroid field. Rocks ping off your shields. But someone needs you. That matters more than safety.",
            choices: [
              { text: "Find the Starwren and dock" },
              { text: "Save him" },
              { text: "Continue the rescue" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 15: The Rescued Merchant
  // ============================================================
  rescued_merchant: {
    title: "A Grateful Stranger",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "👨‍🦳",
    narrative:
      "The old man's name is Corvan. He's a freelance trader who's been hauling goods between systems for forty years. His engine blew a power coupling, and he drifted into the asteroid field. 'Three hours,' he says, shaking his head. 'Three more hours and I'd have been dead.' He studies you with sharp eyes. 'You're no officer. Too young, too nice, and that ship is too clean for someone who looks like they've been sleeping in a mine.' He grins. 'Runaway, huh? Don't worry — I've got no love for the Nefaridrone. Here — take these. You earned them.' He pushes supplies toward you.",
    itemsGained: ["fuel_cell", "food_module"],
    rpgEffects: { gold: 40 },
    choices: [
      {
        text: "Thank Corvan and ask him about Icon 7",
        next: "approach_icon7",
        bondEffect: { lelania: 0 },
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "Corvan nods. 'Icon 7's your best bet. Big enough to hide in, busy enough that nobody asks questions. There's a quasar festival on right now — the whole station's a party. Just... watch out for the Creeds. They're all smiles until you owe them money.' He clasps your hand. 'Good luck, kid. You've got a good heart.'",
      },
      {
        text: "Ask if he has any spare ship parts",
        next: "approach_icon7",
        rpgEffects: { xp: 3 },
        itemsGained: ["nav_computer"],
        successText:
          "Corvan rummages through the Starwren's hold. 'Here — a backup navigation computer. Military grade. It'll make your star charts twice as accurate.' He winks. 'Think of it as a thank-you present.'",
      },
      {
        text: "Offer to tow him to the nearest station",
        next: "approach_icon7",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "Corvan waves you off. 'My backup engine's coming online. I'll limp to Waypoint 6 — it's close. You get yourself to Icon 7 before that Major catches up.' He salutes you. 'You're a good kid. The galaxy needs more like you.'",
      },
    ],
  },

  // ============================================================
  // SCENE 16: Approaching Icon 7
  // ============================================================
  approach_icon7: {
    title: "Icon 7 in Sight",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🌟",
    narrative:
      "After hours in warp, the Galaxy Hopper drops back to normal space. And there it is. Icon 7. The space station is massive — bigger than anything you could have imagined. It's a city in space: towers and domes and docking arms stretching in every direction, glittering with a million lights. Ships of every size swarm around it like bees around a hive. And above it all, dominating the sky, is the quasar — a blazing sphere of light that shifts through every color of the rainbow, pulsing and spinning like a cosmic disco ball. It's the most beautiful thing you've ever seen. The AI announces: 'Approaching Icon 7. Docking clearance required.'",
    resourceDrain: { fuel: 10 },
    choices: [
      {
        text: "Request docking clearance using Zane's credentials",
        next: "docking",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        successText:
          "You let the AI transmit Zane's officer codes. A bored voice responds: 'Galaxy Hopper 9000, credentials accepted. Proceed to Docking Arm C-14. Welcome to Icon 7, Major.' You wince at the name, but it works.",
      },
      {
        text: "Hail the station and ask for guest docking",
        next: "docking",
        rpgEffects: { xp: 3, gold: -20 },
        successText:
          "You switch off the military transponder and hail as a civilian. 'Single-seat cruiser requesting guest berth.' The controller responds: 'Docking fee: 20 credits. Proceed to Arm C-14.' You pay the fee from Zane's onboard account. Thanks, Major.",
      },
      {
        text: "Just fly in and find an empty dock",
        next: "docking",
        isLessIdeal: true,
        successText:
          "You weave through traffic and find an open berth. Not the smoothest entrance — a patrol drone tags your ship, but you're already docked.",
        setbackSteps: [
          {
            title: "Spotted",
            chapter: "Detour",
            art: "🚨",
            narrative:
              "A security drone latches onto your hull and scans the ship. 'Unauthorized docking detected. Vessel is registered to Nefaridrone military. State your business.' Sneaking into a city-station without clearance draws exactly the kind of attention you don't want.",
            choices: [
              { text: "Talk your way out of it" },
              { text: "Stay calm and cooperate" },
              { text: "Explain you're a visitor" },
            ],
          },
          {
            title: "Cleared — Barely",
            chapter: "Detour",
            art: "😅",
            narrative:
              "After an awkward exchange with station security, they let you through with a warning. 'Next time, follow procedure.' You step off the ship and into Icon 7 with your heart still racing.",
            choices: [
              { text: "Head into the station" },
              { text: "Try to blend in" },
              { text: "Explore Icon 7" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 17: Docking at Icon 7
  // ============================================================
  docking: {
    title: "Welcome to Icon 7",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🏙️",
    narrative:
      "The Galaxy Hopper settles into Docking Arm C-14 with a gentle clunk. The canopy hisses open and you step out onto a metal platform. Then the full force of Icon 7 hits you. NOISE. Music, voices, engines, announcements in a dozen languages. SMELLS. Cooking food, engine exhaust, flowers from some alien garden. LIGHT. Neon signs, holographic advertisements, the quasar's rainbow glow pouring through the station's massive observation domes. People rush past — traders, workers, kids, robots of every shape and size. A street vendor shouts: 'Festival food! Best in the quadrant! Nebula dogs! Starfire candy!' You've never seen so many people. You've never seen so many colors. After a lifetime in gray mines, this is... overwhelming.",
    choices: [
      {
        text: "Try the festival food — you've earned a celebration",
        next: "festival",
        rpgEffects: { xp: 3, gold: -10 },
        successText:
          "You buy a nebula dog — it's some kind of sausage in glowing bread with purple sauce. It is quite possibly the greatest thing that has ever happened to you. You eat it in three bites and immediately buy another.",
      },
      {
        text: "Find somewhere quiet to get your bearings",
        next: "festival",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "You find a bench in a quieter corridor and sit down. Breathe. You made it. You're on Icon 7. Now you need a plan — a place to stay, a way to earn credits, and a new identity.",
      },
      {
        text: "Look for a job board — you need to earn credits to survive",
        next: "festival",
        rpgEffects: { xp: 5 },
        successText:
          "You spot a digital job board near the docking arm. Dozens of postings scroll past: cargo handlers, maintenance crews, greenhouse workers, security assistants. Greenhouse work catches your eye — it's in the outer Z quadrant, far from the main crowds.",
      },
    ],
  },

  // ============================================================
  // SCENE 18: The Quasar Festival
  // ============================================================
  festival: {
    title: "The Quasar Festival",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🎉",
    narrative:
      "Icon 7's main concourse has been transformed for the quasar festival. Holographic streamers hang from every surface. A live band plays space-jazz on a floating stage. Above it all, the quasar blazes through the observation dome — a swirling ball of blue, gold, and violet light that makes everything shimmer. Kids run through the crowd with light-up toys. Vendors hawk their wares. You pass a sign: 'JOBS — STELLAR GREENHOUSE — Z QUADRANT — GOOD PAY, MEALS INCLUDED.' That's the job posting you noticed. Working with plants in a greenhouse doesn't sound bad at all. And the meals included part is very appealing.",
    resourceDrain: { food: 5 },
    choices: [
      {
        text: "Follow the signs to the Stellar Greenhouse and apply for work",
        next: "greenhouse_arrival",
        rpgEffects: { xp: 5 },
        moralImpact: 1,
        successText:
          "You follow the signs through the station's winding corridors, deeper into the Z quadrant. The crowds thin out. The music fades. The greenhouse dome appears ahead — a massive bubble of glass and steel filled with green, growing things.",
      },
      {
        text: "Explore the festival more — when will you get another chance?",
        next: "greenhouse_arrival",
        rpgEffects: { xp: 3, gold: -15 },
        successText:
          "You wander the festival in amazement. Watch a robot dance competition. Try something called 'starfire candy' that fizzes in your mouth. Buy a pair of decent boots with some of your credits. Eventually, you find your way to the greenhouse job posting and decide it's time to be practical.",
      },
      {
        text: "Look for information about the Creeds and how things work here",
        next: "greenhouse_arrival",
        rpgEffects: { xp: 5 },
        statBoost: { cunning: 1 },
        successText:
          "You ask around carefully. A friendly food vendor tells you: 'The Creeds run the money. The station council handles the rules. And nobody crosses the troublemakers on Level 9 unless they want trouble. Stay in the open quadrants — Z quad is safe. Good greenhouse jobs out there.' You file it all away and head for the greenhouse.",
      },
    ],
  },

  // ============================================================
  // SCENE 19: The Stellar Greenhouse
  // ============================================================
  greenhouse_arrival: {
    title: "The Stellar Greenhouse",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🌱",
    narrative:
      "The Stellar Greenhouse is breathtaking. A vast dome of reinforced glass lets in filtered starlight and the quasar's rainbow glow. Inside, rows upon rows of plants stretch into the distance — everything from towering fruit trees to fields of wheat to exotic flowers you've never seen. The air is warm, humid, and smells like growing things. After the mines of Lowler Prime, it feels like paradise. A kind-faced woman at the entrance looks up from a datapad. 'Here for the job? Good timing — we need the help. The work's honest, the food's real, and we don't ask too many questions.' She holds out a hand. 'I'm Maren. My family runs this section of the greenhouse.'",
    choices: [
      {
        text: "Accept the job gratefully",
        next: "meet_lelania",
        rpgEffects: { xp: 5, gold: 30 },
        moralImpact: 1,
        successText:
          "You shake Maren's hand. 'You look like you could use a good meal,' she says with a warm smile. 'Come on — I'll introduce you to my daughter. She's about your age. She can show you the ropes.'",
      },
      {
        text: "Ask what the job pays and what's expected",
        next: "meet_lelania",
        rpgEffects: { xp: 5, gold: 30 },
        successText:
          "Maren nods approvingly. 'Smart to ask. Thirty credits a day, meals included, quarters in the worker dormitory. You'll help tend crops, run the irrigation bots, and make deliveries to the inner quadrants.' She waves you in. 'My daughter Lelania will show you around.'",
      },
      {
        text: "Hesitate — can you trust these people?",
        next: "meet_lelania",
        rpgEffects: { xp: 3, gold: 30 },
        isLessIdeal: true,
        successText:
          "Trust doesn't come easy after a lifetime in chains. But Maren's eyes are kind and her handshake is firm.",
        setbackSteps: [
          {
            title: "Old Fears",
            chapter: "Detour",
            art: "😟",
            narrative:
              "You pull back. Every adult authority figure you've ever known has been cruel. Overseers, guards, Major Zane. But Maren waits patiently, not pushing. 'It's okay,' she says gently. 'Take your time.' Not everyone in the galaxy is a Nefaridrone.",
            choices: [
              { text: "Accept the kindness you're being offered" },
              { text: "Remember that you're free now" },
              { text: "Give these people a chance" },
            ],
          },
          {
            title: "A New Start",
            chapter: "Detour",
            art: "🤝",
            narrative:
              "You take Maren's hand. Her grip is warm and steady. 'Welcome to the greenhouse, kid. You're safe here.' For the first time in your life, you actually believe it.",
            choices: [
              { text: "Follow her inside" },
              { text: "Start the new job" },
              { text: "Step into your new life" },
            ],
          },
        ],
      },
    ],
  },

  // ============================================================
  // SCENE 20: Meeting Lelania
  // ============================================================
  meet_lelania: {
    title: "A New Friend",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "👩‍💻",
    narrative:
      "Maren leads you through the rows of crops to a workstation near the irrigation controls. A girl your age sits cross-legged on a crate, a holographic display floating in front of her. Her fingers fly across the controls, and the greenhouse's watering bots respond in perfect sync — spinning, adjusting, finding dry spots. She looks up and grins. 'Mom! Is this the new hire? Finally, someone to help with the heavy lifting.' She hops off the crate and sticks out her hand. 'I'm Lelania. I run the bots around here. Well, I run ALL the tech around here. Mom and Dad do the actual plant stuff. I just make sure the computers don't have a meltdown.' She pushes a pair of goggles up onto her forehead. 'So. What's your story?'",
    choices: [
      {
        text: "Tell her the truth — you escaped from the mines",
        next: "chapter1_end",
        rpgEffects: { xp: 5 },
        bondEffect: { lelania: 10 },
        moralImpact: 1,
        successText:
          "Lelania's eyes go wide. 'You... escaped from Lowler Prime? On a stolen Galaxy Hopper?!' She stares at you. Then a slow, amazed grin spreads across her face. 'That is the coolest thing I've ever heard. You HAVE to tell me everything.' She drags you to a bench and demands the full story. By the time you're done, the stars are shifting outside the dome and you've made your first real friend.",
      },
      {
        text: "Keep it vague — just say you're new to Icon 7",
        next: "chapter1_end",
        rpgEffects: { xp: 3 },
        bondEffect: { lelania: 5 },
        successText:
          "Lelania nods. 'Mysterious type, huh? That's fine. Lots of people come to Icon 7 to start over.' She winks. 'Don't worry — I've got enough personality for both of us. Come on, I'll show you how the irrigation system works. Try not to get the bots angry.' Over the next few hours, her warmth and humor break through your walls. She's funny, smart, and doesn't judge. You start to relax for the first time in... ever.",
      },
      {
        text: "Ask her about herself first",
        next: "chapter1_end",
        rpgEffects: { xp: 5 },
        bondEffect: { lelania: 8 },
        moralImpact: 1,
        successText:
          "Lelania beams. 'Finally, someone who asks! Okay: I've lived on Icon 7 my whole life. Mom and Dad run the greenhouse. I'm basically a tech genius — don't let anyone tell you otherwise. And I've hacked the station's song-request system three times to play my favorite band during announcements.' She laughs. 'Your turn?' You share a little, and she shares a lot, and by the end of the day you know this is someone you can count on.",
      },
    ],
  },

  // ============================================================
  // SCENE 21: End of Chapter 1
  // ============================================================
  chapter1_end: {
    title: "A Place to Belong",
    chapter: "Chapter 1 — Escape from Lowler Prime",
    art: "🌅",
    narrative:
      "Days pass on Icon 7. You settle into a rhythm at the greenhouse — tending crops, running deliveries, learning the station's twisting corridors. The quasar festival winds down, but the quasar itself still blazes above, painting everything in shifting color. Maren and her husband Dorin are kind. The work is honest. The food is incredible. And Lelania... she's become your best friend. She teaches you about computers and AI. You tell her about the mines, about the escape, about Major Zane's purple face on the comm screen (she nearly falls off her crate laughing). For the first time in your life, you have a home. A real one. But somewhere out there, Major Zane is searching for his ship. The Nefaridrone Empire never forgets a runaway. And in the dark spaces between the stars, the Mothgang pirates are on the move. Your adventure is just beginning.",
    partyNarrative: {
      lelania:
        "Lelania punches your shoulder. 'Hey. Whatever happens next — we're in this together, okay? I'm not going anywhere.' She grins. 'Well, unless someone tries to take my computer. Then all bets are off.'",
    },
    choices: [
      {
        text: "Lean back and watch the quasar with your new friend",
        endsStory: true,
        moralImpact: 1,
        bondEffect: { lelania: 5 },
        successText:
          "You sit on the greenhouse roof with Lelania, legs dangling over the edge, watching the quasar paint the sky in impossible colors. You escaped. You survived. You found a friend. Chapter 1 complete.",
      },
      {
        text: "Promise yourself: no matter what comes, you'll protect the people you care about",
        endsStory: true,
        moralImpact: 1,
        successText:
          "The captive miner from Lowler Prime is gone. In your place stands someone new — someone with a ship, a friend, and a reason to keep fighting. Whatever the galaxy throws at you next, you'll be ready.",
      },
      {
        text: "Check on the Galaxy Hopper — make sure your escape route is ready",
        endsStory: true,
        moralImpact: 1,
        successText:
          "You visit Docking Arm C-14 and run your hand along the Galaxy Hopper's hull. This ship carried you to freedom. It'll carry you to whatever comes next. You top off the fuel and check the systems. Ready for anything.",
      },
    ],
  },
};
