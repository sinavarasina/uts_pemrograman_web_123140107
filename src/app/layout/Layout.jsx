import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    const navigate = useNavigate();
    const location = useLocation();
    const isPlaylistPage = location.pathname === "/playlist";

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "70px 1fr",
                gridTemplateRows: "auto 1fr auto",
                height: "100vh",
                background: "var(--color-background)",
                color: "var(--color-light)",
            }}
        >
            <aside
                style={{
                    gridRow: "1 / span 3",
                    background: "var(--color-teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Sidebar />
            </aside>

            <header
                style={{
                    gridColumn: "2",
                    background: "var(--color-dark)",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                }}
            >
                <Header
                    onSearchSubmit={(term) => {
                        if (isPlaylistPage)
                            window.dispatchEvent(new CustomEvent("playlistSearch", { detail: term }));
                        else
                            window.dispatchEvent(new CustomEvent("musicSearch", { detail: term }));
                    }}
                />
            </header>

            <main
                style={{
                    gridColumn: "2",
                    overflowY: "auto",
                    padding: "1rem",
                    background: "var(--color-dark)",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <Outlet />
            </main>

            <footer
                style={{
                    gridColumn: "2",
                    background: "var(--color-light)",
                    color: "var(--color-deep)",
                    borderTop: "2px solid var(--color-border)",
                }}
            >
                <Footer />
            </footer>
        </div>
    );
}

