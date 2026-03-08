// CreateClass — Teacher creates a new class and receives codes
// Zero PII: no email, no password, no account

import { useState } from "react";
import { db } from "../firebase.js";
import { collection, doc, setDoc, query, where, getDocs } from "firebase/firestore";

function generateCode(length) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0/O/1/I to avoid confusion
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function hashCode(plaintext) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function generateUniqueJoinCode() {
  for (let attempt = 0; attempt < 10; attempt++) {
    const code = generateCode(6);
    const q = query(collection(db, "classes"), where("joinCode", "==", code));
    const snap = await getDocs(q);
    if (snap.empty) return code;
  }
  throw new Error("Could not generate unique join code. Please try again.");
}

export default function CreateClass({ onDone, onBack }) {
  const [className, setClassName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null); // { joinCode, teacherCode }
  const [copied, setCopied] = useState("");

  const handleCreate = async () => {
    if (!className.trim()) {
      setError("Please enter a class name.");
      return;
    }
    setCreating(true);
    setError("");
    try {
      const joinCode = await generateUniqueJoinCode();
      const teacherCode = generateCode(8);
      const teacherCodeHash = await hashCode(teacherCode);

      const classRef = doc(collection(db, "classes"));
      await setDoc(classRef, {
        className: className.trim(),
        joinCode,
        teacherCodeHash,
        createdAt: new Date().toISOString(),
      });

      setResult({ joinCode, teacherCode, classId: classRef.id });
    } catch (err) {
      setError(err.message || "Failed to create class.");
    } finally {
      setCreating(false);
    }
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(label);
      setTimeout(() => setCopied(""), 2000);
    });
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html><head><title>Reader's Quest — Class Codes</title>
      <style>body{font-family:Georgia,serif;padding:40px;color:#333}
      h1{color:#1a1a2e}h2{color:#c9a84c;margin-top:30px}
      .code{font-size:32px;font-family:monospace;background:#f0f0f0;padding:12px 20px;border-radius:8px;display:inline-block;letter-spacing:4px}
      .warning{color:#dc2626;font-weight:bold;margin-top:10px}</style></head>
      <body><h1>📚 Reader's Quest</h1>
      <h2>Class: ${result.joinCode}</h2>
      <p><strong>Class Code (share with students):</strong></p>
      <div class="code">${result.joinCode}</div>
      <h2>Teacher Code</h2>
      <p class="warning">⚠️ Save this code! It cannot be recovered.</p>
      <div class="code">${result.teacherCode}</div>
      <p style="margin-top:40px;color:#999">Created: ${new Date().toLocaleDateString()}</p>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Show result screen with codes
  if (result) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Class Created!</h1>
          <p style={styles.subtitle}>{className}</p>
        </div>
        <div style={styles.main}>
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>📋 Class Code (share with students)</h3>
            <div style={styles.codeDisplay}>{result.joinCode}</div>
            <button
              onClick={() => copyToClipboard(result.joinCode, "join")}
              style={styles.copyButton}
            >
              {copied === "join" ? "✓ Copied!" : "📋 Copy Code"}
            </button>
          </div>

          <div style={{ ...styles.card, borderColor: "#dc2626" }}>
            <h3 style={{ ...styles.cardTitle, color: "#ef4444" }}>🔑 Teacher Code (keep secret!)</h3>
            <div style={styles.codeDisplay}>{result.teacherCode}</div>
            <p style={styles.warning}>
              ⚠️ Save this code now! It cannot be recovered. You need it to view your class dashboard.
            </p>
            <div style={styles.buttonRow}>
              <button
                onClick={() => copyToClipboard(result.teacherCode, "teacher")}
                style={styles.copyButton}
              >
                {copied === "teacher" ? "✓ Copied!" : "📋 Copy Code"}
              </button>
              <button onClick={handlePrint} style={styles.copyButton}>
                🖨️ Print Both Codes
              </button>
            </div>
          </div>

          <div style={styles.buttonRow}>
            <button onClick={() => onDone(result)} style={styles.primaryButton}>
              Go to Dashboard →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show create form
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>📚 Create a Class</h1>
        <p style={styles.subtitle}>No account needed — just a class name</p>
      </div>
      <div style={styles.main}>
        <div style={styles.card}>
          <label style={styles.label}>Class Name</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="e.g. Mrs. Smith's 3rd Grade"
            style={styles.input}
            maxLength={60}
            autoFocus
          />
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.buttonRow}>
            <button onClick={onBack} style={styles.secondaryButton}>
              ← Back
            </button>
            <button
              onClick={handleCreate}
              disabled={creating}
              style={{
                ...styles.primaryButton,
                ...(creating ? { opacity: 0.5, cursor: "wait" } : {}),
              }}
            >
              {creating ? "Creating..." : "Create Class →"}
            </button>
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
    padding: "clamp(18px, 4vw, 40px) clamp(12px, 4vw, 24px)",
  },
  header: {
    textAlign: "center",
    marginBottom: "clamp(24px, 6vw, 40px)",
  },
  title: {
    fontSize: "clamp(28px, 6vw, 44px)",
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
    maxWidth: "560px",
    margin: "0 auto",
  },
  card: {
    background: "rgba(45, 40, 60, 0.8)",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "12px",
    padding: "clamp(20px, 4vw, 30px)",
    marginBottom: "20px",
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
    fontSize: "16px",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "8px",
    background: "rgba(26, 26, 46, 0.8)",
    color: "#e8d4b8",
    fontFamily: "'Georgia', serif",
    outline: "none",
    boxSizing: "border-box",
  },
  codeDisplay: {
    fontSize: "clamp(28px, 7vw, 40px)",
    fontFamily: "monospace",
    letterSpacing: "6px",
    textAlign: "center",
    color: "#c9a84c",
    background: "rgba(26, 26, 46, 0.6)",
    padding: "16px",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  warning: {
    color: "#ef4444",
    fontSize: "14px",
    fontWeight: "bold",
    margin: "8px 0 12px",
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
    padding: "12px 24px",
    background: "transparent",
    border: "2px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "8px",
    color: "#c9a84c",
    fontSize: "16px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
  copyButton: {
    padding: "10px 20px",
    background: "rgba(201, 168, 76, 0.15)",
    border: "1px solid rgba(201, 168, 76, 0.4)",
    borderRadius: "6px",
    color: "#c9a84c",
    fontSize: "14px",
    cursor: "pointer",
    fontFamily: "inherit",
  },
};
