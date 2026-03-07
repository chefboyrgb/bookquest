# BookQuest 📖

An interactive literary adventure engine for transforming classic books into choose-your-own-adventure games for children (grades 2–5).

**Current Implementation**: *The Lion, the Witch and the Wardrobe* by C.S. Lewis

## 🎮 What is BookQuest?

BookQuest turns reading into an active, engaging experience. Players:
- Navigate story worlds through meaningful choices
- Collect inventory items that reinforce key story moments
- Answer comprehension quizzes with educational feedback
- Build vocabulary through interactive definitions
- Track their journey in an adventure journal

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build
```

The app will run at `http://localhost:5173/`

## 📋 Project Documentation

- **[PROJECT_PLAN.md](./docs/PROJECT_PLAN.md)** — Full system design, story structure, learning objectives, and roadmap

## 🏗️ Architecture

BookQuest uses a **modular content system** where the game engine is separate from story content. This allows the same engine to power games for different books.

### Content Modules
- `BOOK_META` — Title, author, themes, learning objectives
- `VOCABULARY` — Grade-leveled word definitions
- `CHARACTERS` — Cast of characters with traits
- `LOCATIONS` — Virtual map and geography
- `ITEMS` — Collectible inventory tied to story moments
- `STORY_NODES` — Branching narrative with choices & quizzes

### Game Engine
- Navigation & state management
- Inventory system
- Quiz & assessment engine
- Vocabulary highlighting
- Progress tracking
- Story map visualization

## 🎯 Learning Outcomes

- Contextual vocabulary building (grades 2–5)
- Reading comprehension through narrative engagement
- Problem-solving through meaningful choices
- Character & theme understanding
- Writing readiness via adventure journal

## 📚 Roadmap

### ✅ Phase 1: Core Engine (Current)
- React-based interactive story game
- Complete Narnia implementation
- All core game mechanics

### 🚀 Phase 2: Enhanced Interaction (Planned)
- AI conversational characters
- Adaptive difficulty
- Text-to-speech for younger readers
- AI-generated illustrations

### 📖 Phase 3: Classroom Integration (Planned)
- Teacher dashboard
- Student progress tracking
- Writing assignment generator
- Content authoring tools

### 🌍 Phase 4: Platform Growth (Planned)
- Library of 20+ book adventures
- Community-contributed content
- Multiplayer gameplay
- Mobile apps (iOS/Android)

## 💻 Tech Stack

- **Frontend**: React 19 + Vite
- **Styling**: Inline CSS with responsive design
- **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)
- **Build Tool**: Vite 7
- **Linting**: ESLint with React plugin

## 📁 Project Structure

```
bookquest/
├── src/
│   ├── App.jsx          # Main game component
│   ├── App.css          # Styling
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── docs/
│   └── PROJECT_PLAN.md  # Full documentation
├── public/              # Static assets
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── eslint.config.js     # Linting rules
```

## 🤝 Contributing

This project was designed with modularity in mind. To adapt BookQuest for a new book:

1. Read the target book and identify key plot points
2. Create the six content modules with book-specific data
3. Keep the game engine unchanged
4. Test all story paths

See [PROJECT_PLAN.md](./docs/PROJECT_PLAN.md) for detailed instructions.

## 📝 License

This project is an educational implementation. Contact for licensing details.

---

**Made for curious readers.** 📚✨

