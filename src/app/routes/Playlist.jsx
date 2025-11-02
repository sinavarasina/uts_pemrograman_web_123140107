import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";
import { useEffect, useState } from "react";
import MusicList from "../../components/MusicList";

export default function Playlist() {
    const { playlist, remove, clear } = usePlaylist();
    const { playTrack } = usePlayer();

    const [filtered, setFiltered] = useState(playlist);
    const [searchActive, setSearchActive] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const handler = (e) => {
            const term = (e.detail || "").toLowerCase();

            if (!term) {
                setFiltered(playlist);
                setSearchActive(false);
                setSearchTerm("");
                return;
            }

            const results = playlist.filter(
                (i) =>
                    i.trackName.toLowerCase().includes(term) ||
                    i.artistName.toLowerCase().includes(term) ||
                    i.collectionName.toLowerCase().includes(term)
            );

            setFiltered(results);
            setSearchActive(true);
            setSearchTerm(term);
        };

        window.addEventListener("playlistSearch", handler);
        return () => window.removeEventListener("playlistSearch", handler);
    }, [playlist]);

    useEffect(() => {
        if (!searchActive) {
            setFiltered(playlist);
        } else if (searchTerm) {
            const results = playlist.filter(
                (i) =>
                    i.trackName.toLowerCase().includes(searchTerm) ||
                    i.artistName.toLowerCase().includes(searchTerm) ||
                    i.collectionName.toLowerCase().includes(searchTerm)
            );
            setFiltered(results);
        }
    }, [playlist, searchActive, searchTerm]);

    return (
        <section>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    alignItems: "center",
                }}
            >
                <h1>Playlist Kamu</h1>
                <button
                    onClick={clear}
                    style={{
                        background: "var(--color-pink)",
                        color: "#fff",
                        padding: "0.4rem 0.8rem",
                        borderRadius: "4px",
                    }}
                >
                    Hapus Semua
                </button>
            </div>

            {searchActive && (
                <button
                    onClick={() => {
                        setFiltered(playlist);
                        setSearchActive(false);
                        setSearchTerm("");
                    }}
                    style={{
                        background: "transparent",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-light)",
                        padding: "0.3rem 0.6rem",
                        marginBottom: "0.8rem",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                >
                    ❌ Batalkan Pencarian
                </button>
            )}

            {filtered.length === 0 ? (
                <p style={{ marginTop: "1rem" }}>Tidak ada musik di playlist.</p>
            ) : (
                <MusicList
                    tracks={filtered}
                    onPlay={playTrack}
                    onRemove={remove}
                    showRemove
                    enableSort
                />
            )}
        </section>
    );
}

