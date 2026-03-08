// GameSelector — Choose which adventure to play
// Displays all available games and routes to the selected one

import { useState, useEffect } from "react";
import GameEngine from "./engine/GameEngine.jsx";
import { AVAILABLE_GAMES } from "./games/registry.js";
import { useSession } from "./context/useSession.js";
import CreateClass from "./components/CreateClass.jsx";
import TeacherDashboard from "./components/TeacherDashboard.jsx";
import cookedIcon from "./img/cooked.png";

export default function GameSelector() {
  const enabledGames = Object.values(AVAILABLE_GAMES).filter(
    (game) => game.enabled !== false,
  );
  const [selectedGame, setSelectedGame] = useState(enabledGames[0]?.id ?? null);
  const [gameStarted, setGameStarted] = useState(false);
  const [savedState, setSavedState] = useState(null);

  // Classroom state
  const [view, setView] = useState("home"); // home | joinClass | createClass | teacherDashboard
  const [joinCode, setJoinCode] = useState("");
  const [joinName, setJoinName] = useState("");
  const [joinError, setJoinError] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);
  const [savedGames, setSavedGames] = useState({}); // gameId → { completed, score, lastSaved }
  const [resumePrompt, setResumePrompt] = useState(null); // { gameId, state }
  const [dashboardClass, setDashboardClass] = useState(null); // preloaded class for dashboard

  const session = useSession();
  const { isInClass, studentName, className, classId, sessionReady } = session;

  const currentGame =
    enabledGames.find((game) => game.id === selectedGame) ?? enabledGames[0];

  // Load saved games when in a class
  useEffect(() => {
    if (isInClass && sessionReady) {
      session.getSavedGames().then(setSavedGames).catch(() => {});
    } else {
      setSavedGames({});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInClass, sessionReady, classId]);

  const handleJoinClass = async () => {
    if (!joinCode.trim() || !joinName.trim()) {
      setJoinError("Please enter both a class code and your name.");
      return;
    }
    setJoinLoading(true);
    setJoinError("");
    try {
      await session.joinClass(joinCode.trim().toUpperCase(), joinName.trim());
      setView("home");
      setJoinCode("");
      setJoinName("");
    } catch (err) {
      setJoinError(err.message);
    } finally {
      setJoinLoading(false);
    }
  };

  const handleLeaveClass = () => {
    session.leaveClass();
    setSavedGames({});
  };

  const handleStartGame = async () => {
    if (!currentGame) return;
    // Check for saved progress if in a class
    if (isInClass) {
      try {
        const saved = await session.loadProgress(currentGame.id);
        if (saved && !saved.completed) {
          setResumePrompt({ gameId: currentGame.id, state: saved.state });
          return;
        }
      } catch {
        // no saved state, start fresh
      }
    }
    setSavedState(null);
    setGameStarted(true);
  };

  const handleResume = () => {
    if (resumePrompt) {
      setSavedState(resumePrompt.state);
      setResumePrompt(null);
      setGameStarted(true);
    }
  };

  const handleStartFresh = async () => {
    if (resumePrompt) {
      await session.clearProgress(resumePrompt.gameId);
      setSavedState(null);
      setResumePrompt(null);
      setGameStarted(true);
    }
  };

  const handleExitGame = () => {
    setGameStarted(false);
    setSavedState(null);
    // Refresh saved games
    if (isInClass && sessionReady) {
      session.getSavedGames().then(setSavedGames).catch(() => {});
    }
  };

  // Resume prompt overlay
  if (resumePrompt) {
    return (
      <div style={styles.container}>
        <div style={{ ...styles.header, marginTop: "15vh" }}>
          <h1 style={styles.title}>📖 Continue Your Adventure?</h1>
          <p style={styles.subtitle}>You have a saved game for {currentGame?.title}</p>
        </div>
        <div style={styles.buttonContainer}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={handleResume} style={styles.startButton}>
              Continue Where I Left Off →
            </button>
            <button onClick={handleStartFresh} style={styles.secondaryButton}>
              Start Over
            </button>
            <button onClick={() => setResumePrompt(null)} style={styles.secondaryButton}>
              ← Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Teacher menu — choose create or access existing
  if (view === "teacherMenu") {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>🎓 Teacher Portal</h1>
          <p style={styles.subtitle}>Create a new class or access an existing one</p>
        </div>
        <div style={{ maxWidth: "460px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          <button onClick={() => setView("createClass")} style={{ ...styles.startButton, width: "100%" }}>
            ➕ Create a New Class
          </button>
          <button onClick={() => setView("teacherDashboard")} style={{ ...styles.startButton, width: "100%" }}>
            🔑 Access Existing Class (Teacher Code)
          </button>
          <button onClick={() => setView("home")} style={{ ...styles.secondaryButton, width: "100%", marginTop: "8px" }}>
            ← Back
          </button>
        </div>
      </div>
    );
  }

  // Create Class view
  if (view === "createClass") {
    return (
      <CreateClass
        onBack={() => setView("teacherMenu")}
        onDone={(result) => {
          setDashboardClass({ id: result.classId, className: result.joinCode, joinCode: result.joinCode, ...result });
          setView("teacherDashboard");
        }}
      />
    );
  }

  // Teacher Dashboard view
  if (view === "teacherDashboard") {
    return (
      <TeacherDashboard
        preloadedClass={dashboardClass}
        onBack={() => { setDashboardClass(null); setView("home"); }}
      />
    );
  }

  // Join Class view
  if (view === "joinClass") {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Join a Class</h1>
          <p style={styles.subtitle}>Enter the code your teacher gave you</p>
        </div>
        <div style={{ maxWidth: "460px", margin: "0 auto" }}>
          <div style={styles.formCard}>
            <label style={styles.label}>Class Code</label>
            <input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              placeholder="e.g. ABC123"
              style={{ ...styles.formInput, letterSpacing: "3px", textAlign: "center" }}
              maxLength={8}
              autoFocus
            />
            <label style={{ ...styles.label, marginTop: "16px" }}>Your Name</label>
            <input
              type="text"
              value={joinName}
              onChange={(e) => setJoinName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleJoinClass()}
              placeholder="e.g. Alex or Team Rocket"
              style={styles.formInput}
              maxLength={40}
            />
            {joinError && <p style={styles.formError}>{joinError}</p>}
            <div style={{ display: "flex", gap: "12px", marginTop: "20px", justifyContent: "center" }}>
              <button onClick={() => { setView("home"); setJoinError(""); }} style={styles.secondaryButton}>
                ← Back
              </button>
              <button
                onClick={handleJoinClass}
                disabled={joinLoading}
                style={{ ...styles.startButton, ...(joinLoading ? { opacity: 0.5 } : {}) }}
              >
                {joinLoading ? "Joining..." : "Join →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show game selection screen
  if (!gameStarted) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.headerTop}>
            <div style={styles.headerLeft}>
              <button onClick={() => setView("teacherMenu")} style={styles.headerButton}>
                🎓 Teacher
              </button>
            </div>
            <div>
              <h1 style={styles.title}>📚 Reader's Quest</h1>
              <p style={styles.subtitle}>Choose Your Adventure</p>
              {isInClass && (
                <p style={styles.sessionBanner}>
                  Playing as <strong>{studentName}</strong> in <strong>{className}</strong>
                  <button onClick={handleLeaveClass} style={styles.leaveButton}>
                    Leave
                  </button>
                </p>
              )}
            </div>
            <div style={styles.headerRight}>
              {!isInClass ? (
                <button onClick={() => setView("joinClass")} style={styles.joinButton}>
                  🏫 Join Class
                </button>
              ) : (
                <a
                  href="https://buymeacoffee.com/chefboyrgb"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.donateButton}
                  title="Support BookQuest"
                >
                  ☕ Donate
                </a>
              )}
            </div>
          </div>
        </div>

        <div style={styles.gameGrid}>
          {enabledGames.map((game) => {
            const saved = savedGames[game.id];
            return (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                style={{
                  ...styles.gameCard,
                  ...(selectedGame === game.id ? styles.gameCardSelected : {}),
                  position: "relative",
                }}
              >
                {saved && !saved.completed && (
                  <div style={styles.continueBadge}>▶ Continue</div>
                )}
                {saved?.completed && (
                  <div style={styles.completedBadge}>✓ Completed</div>
                )}
                <div style={styles.gameEmoji}>{game.emoji}</div>
                <h3 style={styles.gameTitle}>{game.title}</h3>
                <p style={styles.gameAuthor}>by {game.author}</p>
                {saved?.completed && saved.score != null && (
                  <p style={styles.savedScore}>Score: {saved.score}</p>
                )}
              </button>
            );
          })}

          {enabledGames.length === 0 && (
            <p style={styles.noGamesText}>
              No games are enabled yet. Toggle `enabled: true` in
              src/games/registry.js.
            </p>
          )}
        </div>

        <div style={styles.buttonContainer}>
          <button
            onClick={handleStartGame}
            style={{
              ...styles.startButton,
              ...(currentGame ? {} : styles.startButtonDisabled),
            }}
            disabled={!currentGame}
          >
            {isInClass && savedGames[currentGame?.id] && !savedGames[currentGame?.id]?.completed
              ? "Continue Adventure →"
              : "Start Adventure →"}
          </button>
        </div>

        {!isInClass && (
          <div style={styles.footer}>
            <a
              href="https://buymeacoffee.com/chefboyrgb"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerLink}
              title="Support BookQuest"
            >
              <img src={cookedIcon} alt="Support" style={styles.footerIcon} />
            </a>
          </div>
        )}
      </div>
    );
  }

  // Show selected game
  if (!currentGame) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Reader's Quest</h1>
          <p style={styles.subtitle}>No enabled games found</p>
        </div>
      </div>
    );
  }

  return (
    <GameEngine
      content={currentGame.content}
      gameId={currentGame.id}
      savedState={savedState}
      onExit={handleExitGame}
    />
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
    color: "#e8d4b8",
    fontFamily: "'Georgia', serif",
    padding: "clamp(18px, 4vw, 40px) clamp(12px, 4vw, 24px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "clamp(24px, 6vw, 60px)",
  },
  headerTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  headerLeft: {
    display: "flex",
    gap: "8px",
  },
  headerRight: {
    display: "flex",
    gap: "8px",
  },
  headerButton: {
    padding: "8px 16px",
    background: "rgba(201, 168, 76, 0.15)",
    border: "1px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "6px",
    color: "#c9a84c",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  joinButton: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, #c9a84c 0%, #e8c84c 100%)",
    border: "none",
    borderRadius: "6px",
    color: "#1a1a2e",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 2px 8px rgba(201, 168, 76, 0.3)",
    whiteSpace: "nowrap",
  },
  donateButton: {
    padding: "8px 16px",
    background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
    border: "none",
    borderRadius: "6px",
    color: "#1a1a2e",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s",
    boxShadow: "0 2px 8px rgba(251, 191, 36, 0.3)",
    whiteSpace: "nowrap",
  },
  sessionBanner: {
    marginTop: "8px",
    fontSize: "14px",
    color: "#c9a84c",
  },
  leaveButton: {
    marginLeft: "10px",
    padding: "2px 10px",
    background: "transparent",
    border: "1px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "4px",
    color: "#a0826d",
    fontSize: "12px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  title: {
    fontSize: "clamp(32px, 7vw, 56px)",
    margin: "0 0 10px",
    color: "#c9a84c",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  subtitle: {
    fontSize: "clamp(16px, 3.5vw, 24px)",
    color: "#a0826d",
    fontStyle: "italic",
    margin: 0,
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
    gap: "clamp(14px, 3vw, 30px)",
    maxWidth: "1000px",
    margin: "0 auto clamp(20px, 4vw, 40px)",
  },
  gameCard: {
    background: "rgba(45, 40, 60, 0.6)",
    border: "2px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "12px",
    padding: "clamp(22px, 4vw, 40px) clamp(14px, 3vw, 20px)",
    cursor: "pointer",
    transition: "all 0.3s",
    textAlign: "center",
    color: "inherit",
    fontFamily: "inherit",
    fontSize: "16px",
  },
  gameCardSelected: {
    background: "rgba(201, 168, 76, 0.15)",
    border: "2px solid #c9a84c",
    boxShadow: "0 0 20px rgba(201, 168, 76, 0.3)",
  },
  continueBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(34, 197, 94, 0.2)",
    border: "1px solid rgba(34, 197, 94, 0.5)",
    borderRadius: "12px",
    padding: "3px 10px",
    fontSize: "11px",
    fontWeight: "bold",
    color: "#22c55e",
  },
  completedBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(201, 168, 76, 0.2)",
    border: "1px solid rgba(201, 168, 76, 0.5)",
    borderRadius: "12px",
    padding: "3px 10px",
    fontSize: "11px",
    fontWeight: "bold",
    color: "#c9a84c",
  },
  savedScore: {
    fontSize: "13px",
    color: "#c9a84c",
    marginTop: "6px",
    fontWeight: "bold",
  },
  gameEmoji: {
    fontSize: "clamp(48px, 12vw, 80px)",
    marginBottom: "20px",
  },
  gameTitle: {
    fontSize: "clamp(18px, 4.5vw, 24px)",
    color: "#c9a84c",
    margin: "10px 0",
  },
  gameAuthor: {
    fontSize: "14px",
    color: "#a0826d",
    margin: "0",
  },
  noGamesText: {
    textAlign: "center",
    color: "#c9a84c",
    fontSize: "16px",
    padding: "20px",
    background: "rgba(45, 40, 60, 0.6)",
    border: "1px solid rgba(201, 168, 76, 0.3)",
    borderRadius: "12px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  startButton: {
    padding: "14px clamp(20px, 6vw, 40px)",
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
  startButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  secondaryButton: {
    padding: "14px clamp(20px, 6vw, 40px)",
    background: "transparent",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "8px",
    color: "#c9a84c",
    fontSize: "clamp(16px, 3.5vw, 18px)",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  formCard: {
    background: "rgba(45, 40, 60, 0.8)",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "12px",
    padding: "clamp(20px, 4vw, 30px)",
  },
  formInput: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "16px",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "8px",
    background: "rgba(26, 26, 46, 0.8)",
    color: "#e8d4b8",
    fontFamily: "'Georgia', serif",
    outline: "none",
    boxSizing: "border-box",
  },
  formError: {
    color: "#ef4444",
    fontSize: "14px",
    marginTop: "8px",
  },
  label: {
    display: "block",
    color: "#c9a84c",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  footer: {
    position: "fixed",
    bottom: "max(12px, env(safe-area-inset-bottom))",
    right: "max(12px, env(safe-area-inset-right))",
    display: "flex",
    alignItems: "center",
    zIndex: 10,
  },
  footerLink: {
    display: "inline-block",
    textDecoration: "none",
    transition: "transform 0.3s",
  },
  footerIcon: {
    width: "clamp(72px, 20vw, 120px)",
    height: "clamp(72px, 20vw, 120px)",
    transition: "all 0.3s",
    cursor: "pointer",
  },
};
