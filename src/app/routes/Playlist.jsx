import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";
import MusicList from "../../components/MusicList";

export default function Playlist() {
    const { playlist, remove, clear } = usePlaylist();
    const { playTrack } = usePlayer();

    return (
        <section>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h1>Playlist</h1>
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

            {playlist.length === 0 ? (
                <p>Tidak ada musik di playlist.</p>
            ) : (
                <MusicList
                    tracks={playlist}
                    onPlay={playTrack}
                    onRemove={remove}
                    showRemove
                />
            )}
        </section>
    );
}

