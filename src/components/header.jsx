import { useRef, useEffect } from "react";

export default function Header({ onSearchSubmit }) {
    const inputRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            const active = document.activeElement;
            const isTyping =
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA" ||
                active.tagName === "SELECT" ||
                active.isContentEditable;

            if (e.key === "/" && !isTyping) {
                e.preventDefault();
                inputRef.current?.focus();
            }

            if (e.key === "Escape" && active === inputRef.current) {
                e.preventDefault();
                inputRef.current?.blur();
            }
        };

        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const term = inputRef.current?.value.trim();
        if (term) onSearchSubmit(term);
    };

    return (
        <header
            style={{
                background: "#137a7f",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <form onSubmit={handleSubmit} role="search">
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="Cari musik... (tekan / untuk fokus)"
                    style={{
                        padding: "0.5rem 1rem",
                        width: "320px",
                        borderRadius: "8px",
                        border: "none",
                    }}
                />
            </form>
        </header>
    );
}

