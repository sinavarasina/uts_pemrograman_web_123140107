import { useRef } from "react";
import { useLocation } from "react-router-dom";
import useKeymap from "../../core/hooks/useKeymap";

export default function Header({ onSearchSubmit }) {
    const inputRef = useRef(null);
    useKeymap(inputRef);

    const location = useLocation();
    const isPlaylist = location.pathname === "/playlist";

    const handleSubmit = (e) => {
        e.preventDefault();
        const term = inputRef.current.value.trim();
        if (!term) return;

        if (isPlaylist) {
            window.dispatchEvent(new CustomEvent("playlistSearch", { detail: term }));
        } else {
            window.dispatchEvent(new CustomEvent("musicSearch", { detail: term }));
        }

        if (onSearchSubmit) onSearchSubmit(term);
    };

    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                background: "var(--color-dark)",
                borderBottom: "2px solid var(--color-border)",
            }}
        >
            <button
                style={{
                    background: "var(--color-pink)",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    padding: "0.4rem 0.8rem",
                }}
            >
                Filter
            </button>

            <form onSubmit={handleSubmit} style={{ flex: 1 }}>
                <input
                    ref={inputRef}
                    type="search"
                    placeholder={isPlaylist ? "Cari di playlist..." : "Cari musik global..."}
                    style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                    }}
                />
            </form>
        </header>
    );
}

