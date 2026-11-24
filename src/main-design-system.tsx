import { createRoot } from "react-dom/client";
import AppDesignSystem from "./AppDesignSystem.tsx";
import "./index.css";
import { iniciarClarity } from "@/lib/clarity";

/* Entrada do build só do Design System. O vite.config.ts troca o
   /src/main.tsx do index.html por este arquivo quando VITE_APP=design-system.
   O Clarity só liga aqui se VITE_CLARITY_PROJECT_ID estiver definido. */
iniciarClarity();

createRoot(document.getElementById("root")!).render(<AppDesignSystem />);
