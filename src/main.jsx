import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PlayerProvider } from "./core/context/PlayerContext";
import App from "./app/App";
import "./styles/index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <PlayerProvider>
            <App />
        </PlayerProvider>
    </StrictMode>
);

