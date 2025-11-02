import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";
import { useEffect, useState } from "react";
import MusicList from "../../components/MusicList";

export default function Playlist() {
    const { playlist, remove, clear } = usePlaylist();
    const { playTrack } = usePlayer();
    const [filtered, setFiltered] = useState(playlist);

    useEffect(() => {
        const handler = (e) => {
            const term = e.detail.toLowerCase();
            if (!term) {
                setFiltered(playlist);
                return;
            }

            setFiltered(
                playlist.filter(
                    (i) =>
                        i.trackName.toLowerCase().includes(term) ||
                        i.artistName.toLowerCase().includes(term) ||
                        i.collectionName.toLowerCase().includes(term)
                )
            );
        };

        window.addEventListener("playlistSearch", handler);
        return () => window.removeEventListener("playlistSearch", handler);
    }, [playlist]);

    return (
        <section>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h1>Playlist Kamu</h1>
                <button
                    onClick={clear}
                    style={{
                        background: "var(--color-pink)",
                        color: "#fff",
                        padding: "0.4rem 0.8rem",
                    }}
                >
                    Hapus Semua
                </button>
            </div>

            {filtered.length === 0 ? (
                <p>Tidak ada musik di playlist.</p>
            ) : (
                <MusicList
                    tracks={filtered}
                    onPlay={playTrack}
                    onRemove={remove}
                    showRemove
                />
            )}
        </section>
    );
}

