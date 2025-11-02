import { useEffect } from "react";

export default function useKeymap(inputRef) {
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
    }, [inputRef]);
}

