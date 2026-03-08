// SessionContext — manages classroom session state (join code, student name, save/load)
// Zero PII: no emails, no passwords, no Firebase Auth

import { createContext, useState, useCallback } from "react";
import { db } from "../firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

const SessionContext = createContext(null);
export { SessionContext };

const STORAGE_KEY = "rq_session";
const TTL_DAYS = 30;

function getStoredSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function storeSession(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function clearStoredSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function SessionProvider({ children }) {
  const [classId, setClassId] = useState(() => {
    const stored = getStoredSession();
    return stored?.classId || null;
  });
  const [className, setClassName] = useState(() => {
    const stored = getStoredSession();
    return stored?.className || "";
  });
  const [studentName, setStudentName] = useState(() => {
    const stored = getStoredSession();
    return stored?.studentName || "";
  });
  const [sessionReady] = useState(true);

  const isInClass = !!(classId && studentName);

  // Join a class with a join code + display name
  const joinClass = useCallback(async (joinCode, name) => {
    const q = query(collection(db, "classes"), where("joinCode", "==", joinCode.toUpperCase()));
    const snap = await getDocs(q);
    if (snap.empty) throw new Error("Class not found. Check your join code.");

    const classDoc = snap.docs[0];
    const classData = classDoc.data();

    // Check name uniqueness within the class
    const nameQ = query(
      collection(db, "sessions"),
      where("classId", "==", classDoc.id),
      where("studentName", "==", name.trim()),
    );
    await getDocs(nameQ);
    // Allow re-joining with the same name (resume)

    setClassId(classDoc.id);
    setStudentName(name.trim());
    setClassName(classData.className || "");
    storeSession({ classId: classDoc.id, studentName: name.trim(), className: classData.className || "" });
  }, []);

  const leaveClass = useCallback(() => {
    setClassId(null);
    setStudentName("");
    setClassName("");
    clearStoredSession();
  }, []);

  // Save game progress to Firestore
  const saveProgress = useCallback(async (gameId, gameState, completed = false, finalScore = null) => {
    if (!classId || !studentName || !gameId) return;

    const docId = `${classId}_${studentName}_${gameId}`;
    const now = Timestamp.now();
    const expiresAt = Timestamp.fromMillis(Date.now() + TTL_DAYS * 24 * 60 * 60 * 1000);

    await setDoc(doc(db, "sessions", docId), {
      classId,
      studentName,
      gameId,
      state: gameState,
      completed,
      finalScore,
      lastSavedAt: now,
      expiresAt,
    });
  }, [classId, studentName]);

  // Load saved game progress from Firestore
  const loadProgress = useCallback(async (gameId) => {
    if (!classId || !studentName || !gameId) return null;

    const q = query(
      collection(db, "sessions"),
      where("classId", "==", classId),
      where("studentName", "==", studentName),
      where("gameId", "==", gameId),
    );
    const snap = await getDocs(q);
    if (snap.empty) return null;

    const data = snap.docs[0].data();
    // Check if expired
    if (data.expiresAt && data.expiresAt.toMillis() < Date.now()) {
      // Expired — delete and return null
      await deleteDoc(snap.docs[0].ref);
      return null;
    }
    return data;
  }, [classId, studentName]);

  // Clear a saved session (e.g. on Play Again)
  const clearProgress = useCallback(async (gameId) => {
    if (!classId || !studentName || !gameId) return;
    const docId = `${classId}_${studentName}_${gameId}`;
    try {
      await deleteDoc(doc(db, "sessions", docId));
    } catch {
      // Ignore — may not exist
    }
  }, [classId, studentName]);

  // Check which games have saved sessions
  const getSavedGames = useCallback(async () => {
    if (!classId || !studentName) return {};

    const q = query(
      collection(db, "sessions"),
      where("classId", "==", classId),
      where("studentName", "==", studentName),
    );
    const snap = await getDocs(q);
    const saved = {};
    snap.docs.forEach((d) => {
      const data = d.data();
      if (!data.expiresAt || data.expiresAt.toMillis() >= Date.now()) {
        saved[data.gameId] = {
          completed: data.completed || false,
          score: data.finalScore || data.state?.score || 0,
          lastSaved: data.lastSavedAt?.toDate?.() || null,
        };
      }
    });
    return saved;
  }, [classId, studentName]);

  return (
    <SessionContext.Provider value={{
      classId,
      className,
      studentName,
      isInClass,
      sessionReady,
      joinClass,
      leaveClass,
      saveProgress,
      loadProgress,
      clearProgress,
      getSavedGames,
    }}>
      {children}
    </SessionContext.Provider>
  );
}
