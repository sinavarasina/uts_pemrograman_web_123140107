import { useEffect, useState } from "react";
import { searchItunes } from "../../api/itunes";
import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";
import SortBar from "../../components/SortBar";
import SearchResultTable from "../../components/SearchResultTable";

export default function Home() {
    const [term, setTerm] = useState(localStorage.getItem("searchTerm") || "");
    const [data, setData] = useState(() => {
        const stored = localStorage.getItem("searchResults");
        return stored ? JSON.parse(stored) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("releaseDate");

    const { add } = usePlaylist();
    const { playTrack } = usePlayer();

    useEffect(() => {
        const handler = async (e) => {
            const query = e.detail.trim();
            if (!query) return;
            setTerm(query);
            localStorage.setItem("searchTerm", query);
            setLoading(true);
            setError(null);
            try {
                const results = await searchItunes({ term: query, media: "music", entity: "musicTrack", limit: 25 });
                setData(results);
                localStorage.setItem("searchResults", JSON.stringify(results));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        window.addEventListener("musicSearch", handler);
        return () => window.removeEventListener("musicSearch", handler);
    }, []);

    const sorted = [...data].sort((a, b) => {
        if (sortBy === "price") return (a.trackPrice || 0) - (b.trackPrice || 0);
        return new Date(b.releaseDate) - new Date(a.releaseDate);
    });

    return (
        <section style={{ color: "var(--color-light)", marginTop: "1rem", textAlign: "center" }}>
            <h1>MiTunesX — Music Explorer</h1>
            <p>Cari musik, album, dan artist langsung dari iTunes API.</p>

            {loading && <p>Mengambil data…</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && term && data.length === 0 && <p>Tidak ada hasil ditemukan.</p>}

            {data.length > 0 && (
                <>
                    <SortBar sortBy={sortBy} onChange={setSortBy} />
                    <SearchResultTable data={sorted} onPlay={playTrack} onAdd={add} />
                </>
            )}
        </section>
    );
}

