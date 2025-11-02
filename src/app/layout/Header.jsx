import { useRef } from "react";
export default function Header({ onSearchSubmit }) {
    const inputRef = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const term = inputRef.current?.value.trim();
        if (term) onSearchSubmit(term);
    };

    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "var(--color-dark)",

                padding: "0.5rem 1rem",
            }}
        >
            <button
                style={{
                    background: "var(--color-pink)",

                    color: "#fff",
                    border: "none",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    padding: "0.4rem 0.8rem",

                    cursor: "pointer",
                    borderRadius: "4px",
                }}
            >
                Filter
            </button>

            <form onSubmit={handleSubmit} role="search" style={{
                flex: 1
            }}>
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="Search..."
                    style={{

                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "6px",
                        border: "1px solid var(--color-border)",
                        background: "var(--color-dark)",
                        color: "var(--color-teal)",
                    }}
                />
            </form>

        </header>
    );
}
