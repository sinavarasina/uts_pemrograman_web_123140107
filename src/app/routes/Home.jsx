import { useState, useEffect } from "react";
import { searchItunes } from "../../api/itunes";
import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";
import MusicList from "../../components/MusicList";

export default function Home() {
    const { add } = usePlaylist();
    const { playTrack } = usePlayer();

    const [term, setTerm] = useState(() => sessionStorage.getItem("searchTerm") || "");
    const [results, setResults] = useState(() => {
        const saved = sessionStorage.getItem("searchResults");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const handler = async (e) => {
            const { term, filters } = e.detail;
            if (!term) return;

            setTerm(term);
            setLoading(true);
            setError(null);

            try {
                const data = await searchItunes({ term, ...filters });
                setResults(data);

                sessionStorage.setItem("searchResults", JSON.stringify(data));
                sessionStorage.setItem("searchTerm", term);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        window.addEventListener("musicSearch", handler);

        const clearSession = () => {
            sessionStorage.removeItem("searchResults");
            sessionStorage.removeItem("searchTerm");
        };
        window.addEventListener("beforeunload", clearSession);

        return () => {
            window.removeEventListener("musicSearch", handler);
            window.removeEventListener("beforeunload", clearSession);
        };
    }, []);

    return (
        <section style={{ position: "relative", textAlign: "center" }}>
            <h1 style={{ marginBottom: "1rem" }}>MiTunesX — Music Explorer</h1>

            {term && <p>Hasil pencarian untuk <em>{term}</em></p>}
            {loading && <p>Mengambil data...</p>}
            {error && <p style={{ color: "red" }}>{error.message}</p>}

            {results.length > 0 ? (
                <MusicList
                    tracks={results}
                    onPlay={playTrack}
                    onAdd={add}
                    showAdd
                />
            ) : (
                !loading && (
                    <p
                        style={{
                            marginTop: "2rem",
                            fontSize: "0.95rem",
                            opacity: 0.85,
                        }}
                    >
                        Ketikkan kata kunci musik di atas untuk mulai mencari.
                    </p>
                )
            )}
        </section>
    );
}

