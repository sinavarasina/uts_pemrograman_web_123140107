import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const isPlaylistPage = location.pathname === "/playlist";

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "64px 1fr",
                gridTemplateRows: "auto 1fr auto",
                gridTemplateAreas: `
  
        "sidebar header"
          "sidebar main"
          "sidebar footer"
        `,
                height: "100vh",
                backgroundColor: "var(--color-background)",
                color: "var(--color-light)",

            }}
        >
            <aside style={{ gridArea: "sidebar" }}>
                <Sidebar />
            </aside>

            <header
                style={{

                    gridArea: "header",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                }}
            >

                <Header
                    onSearchSubmit={(term) => {
                        if (isPlaylistPage) {
                            window.dispatchEvent(

                                new CustomEvent("playlistSearch", { detail: term })
                            );
                        } else {
                            navigate(`/search?q=${encodeURIComponent(term)}`);
                        }
                    }}
                />
            </header>

            <main
                style={{

                    gridArea: "main",
                    overflowY: "auto",
                    padding: "1rem",
                    background: "var(--color-dark)",
                }}

            >
                <Outlet />
            </main>

            <footer style={{ gridArea: "footer" }}>
                <Footer />
            </footer>

        </div>
    );
}
