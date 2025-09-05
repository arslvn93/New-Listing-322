import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Global declarations for TypeScript - moved to top level
declare global {
  interface Window {
    ScrollMagic: any;
  }
}

// Initialize ScrollMagic and improve scroll performance
document.addEventListener('DOMContentLoaded', () => {
  // Optimize scroll performance by reducing animation work
  const passiveSupported = (() => {
    let passive = false;
    try {
      // Use a proper event type instead of "test"
      const options = {
        get passive() { 
          passive = true;
          return passive;
        }
      };
      // Use a no-op function instead of null
      const noop = () => {};
      window.addEventListener("scroll", noop, options as AddEventListenerOptions);
      window.removeEventListener("scroll", noop, options as AddEventListenerOptions);
    } catch (err) {
      passive = false;
    }
    return passive;
  })();

  // Use passive listeners for scroll events without forcing repaints
  window.addEventListener('scroll', () => {}, passiveSupported ? { passive: true } : false);
});

createRoot(document.getElementById("root")!).render(<App />);
