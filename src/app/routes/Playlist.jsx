import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";
import PlaylistTable from "../../components/PlaylistTable";
import { useEffect, useState } from "react";

export default function Playlist() {
    const { playlist, remove, clear } = usePlaylist();
    const { playTrack } = usePlayer();
    const [filtered, setFiltered] = useState(playlist);

    useEffect(() => setFiltered(playlist), [playlist]);

    return (
        <section style={{ textAlign: "center", marginTop: "1rem" }}>
            <h2>Playlist</h2>
            {filtered.length === 0 ? (
                <p>Tidak ada musik di playlist.</p>
            ) : (
                <>
                    <button
                        onClick={clear}
                        style={{
                            marginBottom: "1rem",
                            background: "var(--color-pink)",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            padding: "0.5rem 1rem",
                            cursor: "pointer",
                            fontWeight: "bold",
                        }}
                    >
                        Hapus Semua
                    </button>
                    <PlaylistTable data={filtered} onPlay={playTrack} onRemove={remove} />
                </>
            )}
        </section>
    );
}

