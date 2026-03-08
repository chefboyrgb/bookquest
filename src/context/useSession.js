// useSession hook — import this in components to access classroom session
import { useContext } from "react";
import { SessionContext } from "./SessionContext.jsx";

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used within a SessionProvider");
  return ctx;
}
