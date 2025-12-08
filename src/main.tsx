import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerServiceWorker } from "./lib/serviceWorker";
import { initDB, clearOldCache } from "./lib/offline";

// Initialize offline support
// Register service worker in both dev and prod for testing
registerServiceWorker();

// Initialize IndexedDB
initDB().then(() => {
  // Clear old cache on startup
  clearOldCache();
});

createRoot(document.getElementById("root")!).render(<App />);
