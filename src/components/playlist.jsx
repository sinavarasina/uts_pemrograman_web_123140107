import { useEffect, useState } from "react";
import { usePlaylist } from "../hooks/usePlaylist";

export default function Playlist() {
    const { playlist, add, remove, clear } = usePlaylist();
    const [filtered, setFiltered] = useState(playlist);

    useEffect(() => {
        const handleSearch = (e) => {
            const term = e.detail.toLowerCase();
            setFiltered(
                playlist.filter(
                    (item) =>
                        item.trackName.toLowerCase().includes(term) ||
                        item.artistName.toLowerCase().includes(term)
                )
            );
        };

        window.addEventListener("playlistSearch", handleSearch);
        return () => window.removeEventListener("playlistSearch", handleSearch);
    }, [playlist]);

    return (
        <section>
            <h1>Playlist Kamu</h1>
            <button onClick={clear}>Hapus Semua</button>

            {filtered.length === 0 ? (
                <p>Tidak ada musik dalam playlist.</p>
            ) : (
                <ul>
                    {filtered.map((track) => (
                        <li key={track.trackId}>
                            <img src={track.artworkUrl100} alt={track.trackName} />
                            <span>{track.trackName}</span>
                            <button onClick={() => remove(track.trackId)}>Hapus</button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

