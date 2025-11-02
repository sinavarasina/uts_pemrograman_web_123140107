import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import Footer from "./components/footer";

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

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",
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

                <main
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        padding: "1rem",
                        backgroundColor: "#fff",
                    }}
                >
                    <Outlet />
                </main>

                <Footer />
            </div>
        </div>
    );
}

