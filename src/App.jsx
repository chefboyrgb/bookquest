import GameSelector from "./GameSelector.jsx";
import { SessionProvider } from "./context/SessionContext.jsx";
import "./App.css";

export default function App() {
  return (
    <SessionProvider>
      <GameSelector />
    </SessionProvider>
  );
}

