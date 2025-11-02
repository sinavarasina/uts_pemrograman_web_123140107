import { useState, useEffect } from "react";
import { searchItunes } from "../../api/itunes";
import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";
import MusicList from "../../components/MusicList";

export default function Home() {
    const { add } = usePlaylist();
    const { playTrack } = usePlayer();

    const [term, setTerm] = useState(() => localStorage.getItem("searchTerm") || "");
    const [results, setResults] = useState(() => {
        const saved = localStorage.getItem("searchResults");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handler = async (e) => {
            const q = e.detail.trim();
            if (!q) return;
            setTerm(q);
            setLoading(true);
            setError(null);

            try {
                const data = await searchItunes({ term: q });
                setResults(data);
                localStorage.setItem("searchResults", JSON.stringify(data));
                localStorage.setItem("searchTerm", q);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        window.addEventListener("musicSearch", handler);
        return () => window.removeEventListener("musicSearch", handler);
    }, []);

    return (
        <section>
            <h1 style={{ marginBottom: "1rem" }}>MiTunesX — Music Explorer</h1>
            {term && <p>Hasil pencarian untuk <em>{term}</em></p>}
            {loading && <p>Mengambil data...</p>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}
            {results.length > 0 ? (
                <MusicList tracks={results} onPlay={playTrack} onAdd={add} showAdd />
            ) : (
                !loading && <p>Ketikkan kata kunci musik di atas untuk mulai mencari.</p>
            )}
        </section>
    );
}

