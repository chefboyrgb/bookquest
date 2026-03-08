// TeacherDashboard — Leaderboard + class management
// Teacher enters their Teacher Code to access

import { useState, useEffect, useCallback } from "react";
import { db } from "../firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

async function hashCode(plaintext) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function TeacherDashboard({ preloadedClass, onBack }) {
  const [teacherCode, setTeacherCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [classData, setClassData] = useState(preloadedClass || null); // { id, className, joinCode }
  const [sessions, setSessions] = useState([]);
  const [copied, setCopied] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const loadSessions = useCallback(async (classId) => {
    const q = query(
      collection(db, "sessions"),
      where("classId", "==", classId),
      orderBy("finalScore", "desc")
    );
    const snap = await getDocs(q);
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setSessions(rows);
  }, []);

  // If preloaded (just created), load sessions on mount
  useEffect(() => {
    if (preloadedClass) {
      loadSessions(preloadedClass.id);
    }
  }, [preloadedClass, loadSessions]);

  const handleLogin = async () => {
    if (!teacherCode.trim()) {
      setError("Please enter your Teacher Code.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const hash = await hashCode(teacherCode.trim().toUpperCase());
      const q = query(
        collection(db, "classes"),
        where("teacherCodeHash", "==", hash)
      );
      const snap = await getDocs(q);
      if (snap.empty) {
        setError("Invalid Teacher Code. Codes are case-insensitive.");
        setLoading(false);
        return;
      }
      const classDoc = snap.docs[0];
      const data = { id: classDoc.id, ...classDoc.data() };
      setClassData(data);
      await loadSessions(data.id);
    } catch (err) {
      setError(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClass = async () => {
    if (!classData) return;
    setLoading(true);
    try {
      // Delete all sessions for this class
      const q = query(
        collection(db, "sessions"),
        where("classId", "==", classData.id)
      );
      const snap = await getDocs(q);
      const deletePromises = snap.docs.map((d) => deleteDoc(doc(db, "sessions", d.id)));
      await Promise.all(deletePromises);
      // Delete the class
      await deleteDoc(doc(db, "classes", classData.id));
      onBack();
    } catch (err) {
      setError("Failed to delete class: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyJoinCode = () => {
    navigator.clipboard.writeText(classData.joinCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatDate = (isoString) => {
    if (!isoString) return "—";
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  // Login screen
  if (!classData) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>🔑 Teacher Dashboard</h1>
          <p style={styles.subtitle}>Enter your Teacher Code to view your class</p>
        </div>
        <div style={styles.main}>
          <div style={styles.card}>
            <label style={styles.label}>Teacher Code</label>
            <input
              type="text"
              value={teacherCode}
              onChange={(e) => setTeacherCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="e.g. ABCD1234"
              style={{ ...styles.input, letterSpacing: "3px", textAlign: "center" }}
              maxLength={12}
              autoFocus
            />
            {error && <p style={styles.error}>{error}</p>}
            <div style={styles.buttonRow}>
              <button onClick={onBack} style={styles.secondaryButton}>
                ← Back
              </button>
              <button
                onClick={handleLogin}
                disabled={loading}
                style={{
                  ...styles.primaryButton,
                  ...(loading ? { opacity: 0.5, cursor: "wait" } : {}),
                }}
              >
                {loading ? "Verifying..." : "View Dashboard →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  const completedSessions = sessions.filter((s) => s.completed);
  const inProgressSessions = sessions.filter((s) => !s.completed);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📊 {classData.className}</h1>
        <p style={styles.subtitle}>Teacher Dashboard</p>
      </div>
      <div style={styles.main}>
        {/* Join code card */}
        <div style={styles.card}>
          <div style={styles.joinRow}>
            <div>
              <span style={{ color: "#a0826d", fontSize: "14px" }}>Class Code:</span>
              <span style={styles.joinCodeInline}>{classData.joinCode}</span>
            </div>
            <button onClick={copyJoinCode} style={styles.smallButton}>
              {copied ? "✓ Copied" : "📋 Copy"}
            </button>
          </div>
        </div>

        {/* Leaderboard */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🏆 Leaderboard</h3>
          {completedSessions.length === 0 ? (
            <p style={styles.emptyText}>
              No completed games yet. Students join with code{" "}
              <strong>{classData.joinCode}</strong> and start an adventure!
            </p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>#</th>
                    <th style={styles.th}>Student</th>
                    <th style={styles.th}>Game</th>
                    <th style={styles.th}>Score</th>
                    <th style={styles.th}>Completed</th>
                  </tr>
                </thead>
                <tbody>
                  {completedSessions.map((s, i) => (
                    <tr key={s.id} style={i % 2 === 0 ? styles.evenRow : {}}>
                      <td style={styles.td}>
                        {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}
                      </td>
                      <td style={styles.td}>{s.studentName}</td>
                      <td style={styles.td}>{s.gameId}</td>
                      <td style={{ ...styles.td, fontWeight: "bold", color: "#c9a84c" }}>
                        {s.finalScore ?? 0}
                      </td>
                      <td style={{ ...styles.td, fontSize: "12px", color: "#a0826d" }}>
                        {formatDate(s.lastSavedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* In progress */}
        {inProgressSessions.length > 0 && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📖 In Progress</h3>
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Student</th>
                    <th style={styles.th}>Game</th>
                    <th style={styles.th}>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {inProgressSessions.map((s, i) => (
                    <tr key={s.id} style={i % 2 === 0 ? styles.evenRow : {}}>
                      <td style={styles.td}>{s.studentName}</td>
                      <td style={styles.td}>{s.gameId}</td>
                      <td style={{ ...styles.td, fontSize: "12px", color: "#a0826d" }}>
                        {formatDate(s.lastSavedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats summary */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📈 Stats</h3>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{sessions.length}</div>
              <div style={styles.statLabel}>Total Sessions</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{completedSessions.length}</div>
              <div style={styles.statLabel}>Completed</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>{inProgressSessions.length}</div>
              <div style={styles.statLabel}>In Progress</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statNumber}>
                {new Set(sessions.map((s) => s.studentName)).size}
              </div>
              <div style={styles.statLabel}>Students</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ ...styles.buttonRow, marginTop: "20px" }}>
          <button onClick={() => loadSessions(classData.id)} style={styles.secondaryButton}>
            🔄 Refresh
          </button>
          <button onClick={onBack} style={styles.secondaryButton}>
            ← Back to Home
          </button>
          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              style={styles.dangerButton}
            >
              🗑️ Delete Class
            </button>
          ) : (
            <button onClick={handleDeleteClass} style={styles.dangerButtonConfirm}>
              {loading ? "Deleting..." : "⚠️ Confirm Delete — This cannot be undone"}
            </button>
          )}
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
    padding: "clamp(18px, 4vw, 40px) clamp(12px, 4vw, 24px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "clamp(20px, 4vw, 30px)",
  },
  title: {
    fontSize: "clamp(24px, 5vw, 38px)",
    margin: "0 0 8px",
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
    maxWidth: "700px",
    margin: "0 auto",
  },
  card: {
    background: "rgba(45, 40, 60, 0.8)",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "12px",
    padding: "clamp(16px, 3vw, 24px)",
    marginBottom: "16px",
  },
  cardTitle: {
    color: "#c9a84c",
    fontSize: "18px",
    margin: "0 0 12px",
  },
  label: {
    display: "block",
    color: "#c9a84c",
    fontSize: "14px",
    marginBottom: "8px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    fontSize: "18px",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "8px",
    background: "rgba(26, 26, 46, 0.8)",
    color: "#e8d4b8",
    fontFamily: "monospace",
    outline: "none",
    boxSizing: "border-box",
  },
  joinRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "8px",
  },
  joinCodeInline: {
    fontFamily: "monospace",
    fontSize: "22px",
    letterSpacing: "4px",
    color: "#c9a84c",
    fontWeight: "bold",
    marginLeft: "12px",
  },
  tableWrapper: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    color: "#c9a84c",
    fontSize: "13px",
    padding: "8px 10px",
    borderBottom: "1px solid rgba(201, 168, 76, 0.3)",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "8px 10px",
    fontSize: "14px",
  },
  evenRow: {
    background: "rgba(201, 168, 76, 0.05)",
  },
  emptyText: {
    color: "#a0826d",
    fontSize: "14px",
    textAlign: "center",
    fontStyle: "italic",
    padding: "16px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
    gap: "12px",
    textAlign: "center",
  },
  statItem: {
    background: "rgba(26, 26, 46, 0.6)",
    borderRadius: "8px",
    padding: "12px 8px",
  },
  statNumber: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#c9a84c",
  },
  statLabel: {
    fontSize: "12px",
    color: "#a0826d",
    marginTop: "4px",
  },
  error: {
    color: "#ef4444",
    fontSize: "14px",
    marginTop: "8px",
  },
  buttonRow: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  primaryButton: {
    padding: "12px 24px",
    background: "linear-gradient(135deg, #c9a84c 0%, #e8c84c 100%)",
    border: "none",
    borderRadius: "8px",
    color: "#1a1a2e",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "inherit",
    boxShadow: "0 4px 15px rgba(201, 168, 76, 0.4)",
  },
  secondaryButton: {
    padding: "10px 20px",
    background: "transparent",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "8px",
    color: "#c9a84c",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  smallButton: {
    padding: "6px 14px",
    background: "rgba(201, 168, 76, 0.15)",
    border: "1px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "6px",
    color: "#c9a84c",
    fontSize: "13px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  dangerButton: {
    padding: "10px 20px",
    background: "transparent",
    border: "2px solid rgba(220, 38, 38, 0.4)",
    borderRadius: "8px",
    color: "#ef4444",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  dangerButtonConfirm: {
    padding: "10px 20px",
    background: "rgba(220, 38, 38, 0.2)",
    border: "2px solid #dc2626",
    borderRadius: "8px",
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "bold",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};
