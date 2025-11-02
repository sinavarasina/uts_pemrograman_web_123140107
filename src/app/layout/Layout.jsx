import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const isPlaylistPage = location.pathname === "/playlist";

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "200px 1fr",
                gridTemplateRows: "auto 1fr auto",
                height: "100vh",
            }}
        >
            <Sidebar />
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                <main style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    );
}

