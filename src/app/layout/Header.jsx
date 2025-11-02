import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import useKeymap from "../../core/hooks/useKeymap";
import FilterModal from "../../components/FilterModal";

export default function Header({ onSearchSubmit }) {
    const inputRef = useRef(null);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({});
    const [error, setError] = useState("");
    const location = useLocation();
    const isPlaylist = location.pathname === "/playlist";

    useKeymap(inputRef);

    const handleSubmit = (e) => {
        e.preventDefault();
        const term = inputRef.current.value.trim();

        if (!term) {
            setError("Kata kunci pencarian wajib diisi!");
            inputRef.current.focus();
            return;
        }

        setError("");
        const eventDetail = { term, filters };
        const eventName = isPlaylist ? "playlistSearch" : "musicSearch";
        window.dispatchEvent(new CustomEvent(eventName, { detail: eventDetail }));

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
                flexWrap: "wrap",
            }}
        >
            <button
                onClick={() => setFilterOpen(true)}
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

            <form onSubmit={handleSubmit} style={{ flex: 1, position: "relative" }}>

                <input
                    ref={inputRef}
                    type="text"
                    placeholder={
                        isPlaylist
                            ? "Cari musik di playlist... (/)"
                            : "Cari musik di iTunes... (/)"
                    }
                    onFocus={(e) => {
                        e.target.style.borderColor = "var(--color-pink)";
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = "var(--color-border)";
                    }}
                    style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        background: "var(--color-dark)",
                        color: "var(--color-teal)",
                        border: error
                            ? "1px solid var(--color-pink)"
                            : "1px solid var(--color-border)",
                        outline: "none",
                        transition: "border-color 0.2s ease",
                    }}
                    onChange={() => setError("")}
                />
                {error && (
                    <span
                        style={{
                            position: "absolute",
                            top: "105%",
                            left: "4px",
                            fontSize: "0.75rem",
                            color: "var(--color-pink)",
                        }}
                    >
                        {error}
                    </span>
                )}
            </form>

            <FilterModal
                open={filterOpen}
                onClose={() => setFilterOpen(false)}
                onApply={(f) => {
                    setFilters(f);
                    setFilterOpen(false);
                }}
            />
        </header>
    );
}

