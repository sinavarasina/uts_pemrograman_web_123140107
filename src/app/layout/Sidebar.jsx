import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const linkStyle = ({ isActive }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1rem",
        letterSpacing: "2px",
        color: isActive ? "var(--color-pink)" : "var(--color-dark)",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
        transition: "transform 0.2s ease, color 0.2s ease",
    });

    const verticalText = (text) =>
        text.split("").map((char, i) => <span key={i}>{char}</span>);

    return (
        <aside>
            <nav>
                <ul
                    style={{
                        listStyle: "none",
                        padding: 0,
                        margin: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "2.8rem",
                    }}
                >
                    <li>
                        <NavLink to="/" style={linkStyle}>
                            {verticalText("HOME")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/playlist" style={linkStyle}>
                            {verticalText("PLAYLIST")}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" style={linkStyle}>
                            {verticalText("ABOUT")}
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

