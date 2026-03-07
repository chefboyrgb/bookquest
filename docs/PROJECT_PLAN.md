# BookQuest — Interactive Literary Adventure Engine

> **Project Plan & Technical Specification**  
> First Implementation: *The Lion, the Witch and the Wardrobe*  
> Target Audience: Grades 2–5 (Ages 7–11)  
> Version: March 2026

---

## 1. Executive Summary

BookQuest is a browser-based interactive learning game that transforms classic literature into choose-your-own-adventure experiences for children in grades 2 through 5. Inspired by text-adventure games like Zork and Bureaucracy, children are dropped into a book's world where they navigate a virtual map, collect an inventory of meaningful items, make decisions at branching story points, and answer comprehension questions—all while building reading skills, problem-solving abilities, and genuine enjoyment of literature.

The system is designed with a modular architecture so that the game engine remains constant while the content layer (story data, items, characters, vocabulary, map, and quiz questions) can be swapped out to create new games for different books. The first implementation covers C.S. Lewis's *The Lion, the Witch and the Wardrobe*.

---

## 2. Learning Objectives

The game targets three intersecting educational goals across the grade 2–5 spectrum:

### 2.1 Reading Skills

- **Contextual vocabulary building**: highlighted words are clickable with grade-leveled definitions
- **Reading comprehension**: through narrative engagement and embedded quiz questions
- **Fluency practice**: text is written at accessible reading levels with scaffolded complexity
- **Joy of reading**: the interactive format transforms passive reading into active story participation

### 2.2 Problem-Solving Skills

- **Decision-making**: at branching story points with tagged skill categories (courage, wisdom, empathy, etc.)
- **Inventory management**: collecting and recognizing when items are relevant to story progression
- **Cause-and-effect reasoning**: seeing how choices lead to different narrative outcomes

### 2.3 Book Content Mastery

- **Accurate plot knowledge**: story nodes follow the book's actual events in sequence
- **Character understanding**: meeting and interacting with characters reveals their motivations and traits
- **Theme recognition**: choices are designed to surface themes (sacrifice, courage, forgiveness, good vs. evil)
- **Writing readiness**: the adventure journal records all choices, providing a scaffold for writing assignments

---

## 3. System Architecture

The architecture follows a strict separation between the **Game Engine** (constant across all books) and the **Content Layer** (unique per book). This is the core design principle that makes the system reusable.

### 3.1 Modular Content System

Six independent data modules comprise the content for each book. Each can be edited, replaced, or extended without affecting the others or the game engine:

| Module | Purpose | Key Fields |
|--------|---------|-----------|
| **BOOK_META** | Title, author, grade range, themes, learning objectives | `id`, `title`, `author`, `series`, `gradeRange`, `themes[]`, `learningObjectives[]` |
| **VOCABULARY** | Grade-leveled word definitions shown as clickable highlights | `word`, `definition`, `grade` (2–5 difficulty scale) |
| **CHARACTERS** | Cast of characters with traits and story roles | `id`, `name`, `emoji`, `trait`, `role` description |
| **LOCATIONS** | Virtual map with interconnected locations | `id`, `name`, `region`, `description`, `connections[]` |
| **ITEMS** | Collectible inventory items tied to story moments | `id`, `name`, `icon`, `description` (thematic significance) |
| **STORY_NODES** | Branching narrative with choices, quizzes, and vocabulary links | `id`, `chapter`, `location`, `title`, `narrative`, `choices[]`, `quiz{}`, `vocabHighlights[]`, `itemsGained[]` |

### 3.2 Game Engine Components

The game engine handles all logic and rendering. It reads from the content modules and never contains book-specific data:

1. **State Manager** — Tracks current node, inventory, visited nodes, quiz scores, journal entries
2. **Narrative Renderer** — Displays story text with vocabulary highlights, item notifications, and location banners
3. **Choice System** — Presents branching decisions with skill tags and handles node transitions
4. **Inventory Manager** — Collects items from story events, displays them with descriptions
5. **Quiz Engine** — Multiple-choice questions at story checkpoints with explanatory feedback
6. **Vocabulary System** — Clickable word definitions matched to the current node's highlights
7. **Journal Tracker** — Records every choice for later review and writing exercises
8. **Progress Tracker** — Calculates completion percentage, score, and skills practiced
9. **Story Map Visualizer** — Shows all nodes with visited/current/undiscovered states

---

## 4. Story Flow — The Lion, the Witch and the Wardrobe

Below is the complete decision tree for the first BookQuest implementation. Each node represents a scene. Arrows represent player choices. The primary path follows the book's actual plot, while alternative paths provide exploration loops that ultimately guide the player back to key story events.

### 4.1 Complete Node Map

| Node ID | Chapter | Title | Choices Lead To | Features |
|---------|---------|-------|-----------------|----------|
| `start` | Prologue | The Spare Room | `enter_wardrobe`, `explore_house` | Quiz, Vocab |
| `explore_house` | Prologue | Exploring the House | `enter_wardrobe` | Loop-back |
| `enter_wardrobe` | Ch 1 | Into the Wardrobe | `at_lamppost`, `turn_back_1` | Quiz, Vocab, +fur_coat |
| `turn_back_1` | Ch 1 | Back Through the Coats | `tell_siblings`, `at_lamppost` | Branch |
| `tell_siblings` | Ch 1 | Nobody Believes You | `at_lamppost` | Loop-back |
| `at_lamppost` | Ch 2 | The Lamppost | `meet_tumnus`, `hide_from_tumnus` | Quiz, +lamppost_drawing |
| `hide_from_tumnus` | Ch 2 | Watching from Trees | `meet_tumnus` | Loop-back |
| `meet_tumnus` | Ch 2 | Tea with Tumnus | `tumnus_helps`, `learn_about_witch` | Quiz, Vocab |
| `learn_about_witch` | Ch 2 | The Witch's Rule | `tumnus_helps` | Vocab, Lore |
| `tumnus_helps` | Ch 3 | A Brave Choice | `meet_beavers`, `rush_rescue` | Branch |
| `rush_rescue` | Ch 3 | Too Dangerous! | `meet_beavers` | Problem-solving |
| `meet_beavers` | Ch 4 | The Beavers' Dam | `aslan_plan`, `search_edmund` | Quiz, Vocab |
| `search_edmund` | Ch 4 | Edmund Is Gone | `aslan_plan` | Vocab, +turkish_delight |
| `aslan_plan` | Ch 5 | Journey to Aslan | `meet_aslan`, `christmas_prophecy` | Vocab, +3 weapons |
| `christmas_prophecy` | Ch 5 | Prophecy Explained | `meet_aslan` | Vocab, Lore |
| `meet_aslan` | Ch 6 | Meeting Aslan | `aslan_sacrifice`, `brave_offer` | Quiz, +aslan_mane |
| `brave_offer` | Ch 6 | Aslan's Wisdom | `aslan_sacrifice_setup` | Theme: sacrifice |
| `aslan_sacrifice_setup` | Ch 7 | The Darkest Night | `aslan_returns`, `understand_sacrifice` | Quiz, Vocab |
| `understand_sacrifice` | Ch 7 | Deeper Magic | `aslan_returns` | Vocab, +stone_table_piece |
| `aslan_returns` | Ch 8 | The Deeper Magic | `free_prisoners`, `battle_beruna` | Quiz, +stone_table_piece |
| `free_prisoners` | Ch 8 | Stone to Life | `battle_beruna` | Vocab |
| `battle_beruna` | Ch 9 | Battle of Beruna | `coronation` | Quiz, Vocab |
| `coronation` | Ch 10 | Kings & Queens | `golden_age`, `ending` | Quiz, Vocab |
| `golden_age` | Ch 10 | The Golden Age | `ending` | Theme reflection |
| `ending` | Epilogue | Back Through Wardrobe | (none — end) | Final Quiz |

### 4.2 Story Flow Design Principles

- **Primary Path Integrity**: The main path follows the actual book plot accurately. A child who follows the primary path will learn all key events in correct sequence.
- **Exploration Loops**: Alternative choices create side paths that loop back to the main story within 1–2 nodes. No path leads to a dead end or permanently diverges from the book's plot.
- **No Wrong Answers**: Every choice teaches something. 'Cautious' choices might provide extra lore; 'impulsive' choices teach through gentle redirection.
- **Skill Tagging**: Each choice is tagged with a problem-solving skill (courage, wisdom, empathy, planning, etc.) so educators can track skill development.
- **Progressive Complexity**: Earlier chapters have simpler choices (2 options); later chapters can introduce more nuanced decisions.

---

## 5. Inventory System Design

Inspired by classic text adventures, the inventory system gives children tangible 'proof' of their journey. Each item is tied to a specific story moment, reinforcing memory of key events and their significance.

| Item | Obtained At | Book Connection | Teaching Purpose |
|------|-------------|-----------------|------------------|
| 🧥 Fur Coat | Entering the Wardrobe | The children wear the Professor's fur coats into Narnia | Marks the transition between worlds |
| 🏮 Lamppost Sketch | The Lamppost | The iconic lamppost at the border of Narnia | Geography/setting awareness |
| 🍬 Turkish Delight | Edmund's Betrayal | Enchanted candy the Witch uses to tempt Edmund | Theme: temptation and consequences |
| ⚔️ Peter's Sword | Father Christmas | Gifts given as the Witch's winter weakens | Theme: responsibility, prophecy |
| 🏹 Susan's Bow | Father Christmas | A bow that never misses and a horn for help | Each child receives a role |
| 🧪 Lucy's Cordial | Father Christmas | Healing potion used to save Edmund after battle | Theme: healing, compassion |
| ✨ Golden Thread | Meeting Aslan | Symbolizes Aslan's power and sacrifice | Theme: sacrifice, deeper magic |
| 🪨 Stone Table Piece | The Deeper Magic | The cracked Stone Table after Aslan's return | Theme: resurrection, hope |

---

## 6. Assessment & Quiz System

Quizzes are embedded at key story checkpoints (not every node). They are optional but encouraged. Each quiz includes four multiple-choice options and an explanatory answer that teaches even when the child guesses wrong. The quiz system tracks cumulative scores.

### 6.1 Quiz Placement Strategy

- Placed after narrative-rich nodes where key information has been presented
- Questions test comprehension of plot, character motivation, and theme — not memorization of trivial details
- Wrong answers receive encouraging, educational feedback rather than punitive responses
- The final node quiz covers the book's central theme, reinforcing the overarching lesson

---

## 7. Adapting for New Books

The BookQuest engine is designed for reuse. To create a game for a new book, an author or educator replaces the six content modules while the game engine remains unchanged. Below is the step-by-step workflow:

### Step 1: Read the Book and Identify Key Elements

- List 8–12 major plot events that form the primary story path
- Identify 5–10 key characters with clear traits and roles
- Map 6–12 distinct locations that form a virtual geography
- Select 8–15 vocabulary words appropriate to the grade range

### Step 2: Design the Story Flow

- Create the primary path (10–20 nodes) following the book's actual plot
- Add 5–10 exploration loop nodes for alternative choices
- Ensure every branch loops back within 1–2 nodes
- Tag each choice with a problem-solving skill category

### Step 3: Write the Content Modules

- **BOOK_META**: Update title, author, themes, and learning objectives
- **VOCABULARY**: Define words with grade levels (2–5 scale)
- **CHARACTERS**: Create entries with emoji, traits, and role descriptions
- **LOCATIONS**: Define locations with region groupings and connection adjacency lists
- **ITEMS**: Design 6–10 collectible items with thematic significance and teaching purpose
- **STORY_NODES**: Write narrative text, choices, quizzes, and link vocabulary highlights

### Step 4: Test and Iterate

- Play through every path to verify narrative coherence
- Verify all node connections resolve (no broken links)
- Test vocabulary highlights appear correctly in context
- Review quiz questions for age-appropriateness and accuracy

### 7.1 Suggested Books for Future Implementation

| Book | Author | Grades | Key Themes |
|------|--------|--------|-----------|
| Charlotte's Web | E.B. White | 2–3 | Friendship, life cycles, loyalty |
| The Phantom Tollbooth | Norton Juster | 3–5 | Curiosity, wordplay, learning |
| A Wrinkle in Time | Madeleine L'Engle | 4–5 | Love, individuality, courage |
| The Hobbit | J.R.R. Tolkien | 4–5 | Adventure, cleverness, home |
| Island of the Blue Dolphins | Scott O'Dell | 3–5 | Survival, nature, resilience |
| Tuck Everlasting | Natalie Babbitt | 3–5 | Mortality, choices, nature |

---

## 8. Technical Implementation Roadmap

### Phase 1: Core Engine (Current) ✅

- React-based single-page application with all six content modules
- Choice-based navigation, inventory collection, vocabulary popups, quiz engine
- Story map visualizer, adventure journal, progress tracking
- Editor view showing all data modules for transparency and modification

### Phase 2: Enhanced Interaction 🚀

- AI-powered conversational layer: children can 'talk' to characters using Claude API for natural dialogue
- Adaptive difficulty: adjust reading level and vocabulary based on quiz performance
- Text-to-speech integration for younger readers (grade 2) who need audio support
- Illustration generation: AI-generated scene images that match the narrative moment

### Phase 3: Classroom Integration 📚

- Teacher dashboard showing class progress, quiz scores, and skill development per student
- Writing assignment generator that uses the journal as a scaffold
- Content authoring tool for teachers to create custom book adventures
- Progress persistence with student accounts and cross-session save states

### Phase 4: Platform Growth 🌍

- Library of 20+ book adventures covering grades K–8
- Community-contributed content with quality review process
- Multiplayer mode: siblings or classmates play together, making collaborative decisions
- Mobile app versions for iOS and Android

---

## Summary

BookQuest represents a new approach to literary education: combining the narrative power of classic books with the engagement of interactive games. By making reading active, choice-driven, and rewarding, we transform how children connect with literature and develop essential reading comprehension and problem-solving skills.
