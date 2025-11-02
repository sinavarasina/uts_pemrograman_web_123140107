import { NavLink } from "react-router-dom";

export default function Sidebar() {
    const linkStyle = ({ isActive }) => ({
        display: "block",
        padding: "8px 12px",
        color: isActive ? "#e12885" : "#bec8d1",
        textDecoration: "none",
        fontWeight: isActive ? "bold" : "normal",
    });

    return (
        <aside
            style={{
                background: "#373b3e",
                color: "#bec8d1",
                padding: "1rem",
            }}
        >
            <nav>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    <li><NavLink to="/" style={linkStyle}>HOME</NavLink></li>
                    <li><NavLink to="/playlist" style={linkStyle}>PLAYLIST</NavLink></li>
                    <li><NavLink to="/about" style={linkStyle}>ABOUT</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
}

