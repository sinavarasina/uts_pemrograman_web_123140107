import { NavLink } from "react-router-dom";
export default function Sidebar() {
    const linkStyle = ({ isActive }) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontSize: "1rem",
        lineHeight: "1.2",
        letterSpacing: "2px",
        padding: "10px 0",
        color: isActive ? "var(--color-pink)" : "var(--color-dark)",

        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
        transition: "color 0.3s ease",
    });
    const verticalText = (text) =>
        text.split("").map((char, i) => <span key={i}>{char}</span>);
    return (
        <aside
            style={{
                background: "var(--color-teal)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                justifyContent: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <nav>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>

                    <li><NavLink to="/" style={linkStyle}>{verticalText("HOME")}</NavLink></li>
                    <li><NavLink to="/playlist" style={linkStyle}>{verticalText("PLAYLIST")}</NavLink></li>
                    <li><NavLink to="/about" style={linkStyle}>{verticalText("ABOUT")}</NavLink></li>
                </ul>
            </nav>
        </aside>

    );
}
