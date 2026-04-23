import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

console.log("[Main] Bootstrapping Maharashtra Innovation Platform...");
createRoot(document.getElementById("root")!).render(<App />);
