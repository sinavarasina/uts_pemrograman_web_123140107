import { useEffect, useState } from "react";
import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";

export default function Playlist() {
    const { playlist, remove, clear } = usePlaylist();
    const { playTrack } = usePlayer();
    const [filtered, setFiltered] = useState(playlist);

    useEffect(() => {
        const handler = (e) => {
            const term = e.detail.toLowerCase();
            setFiltered(
                playlist.filter(
                    (item) =>
                        item.trackName.toLowerCase().includes(term) ||
                        item.artistName.toLowerCase().includes(term)
                )
            );
        };
        window.addEventListener("playlistSearch", handler);
        return () => window.removeEventListener("playlistSearch", handler);
    }, [playlist]);

    return (
        <section>
            <h1>Playlist Kamu</h1>
            <button onClick={clear}>Hapus Semua</button>
            {filtered.length === 0 ? (
                <p>Tidak ada musik di playlist.</p>
            ) : (
                <ul>
                    {filtered.map((track) => (
                        <li key={track.trackId}>
                            <img src={track.artworkUrl100} alt={track.trackName} />
                            <span>{track.trackName}</span>
                            <button onClick={() => playTrack(track)}>Play</button>
                            <button onClick={() => remove(track.trackId)}>Hapus</button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

