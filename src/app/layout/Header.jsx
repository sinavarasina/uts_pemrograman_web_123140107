import { useRef } from "react";

export default function Header({ onSearchSubmit }) {
    const inputRef = useRef(null);

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

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const term = inputRef.current.value.trim();
                    if (term) onSearchSubmit(term);
                }}
                style={{ flex: 1 }}
            >
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="Search..."
                    style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                    }}
                />
            </form>
        </header>
    );
}

