import { useSearchParams } from "react-router-dom";
import useFetch from "../../core/hooks/useFetch";
import { searchItunes } from "../../api/itunes";
import { usePlaylist } from "../../core/hooks/usePlaylist";
import { usePlayer } from "../../core/context/PlayerContext";

export default function Search() {
    const [params] = useSearchParams();
    const term = params.get("q");
    const { add } = usePlaylist();
    const { playTrack } = usePlayer();

    const { data, loading, error } = useFetch(
        async () => {
            if (!term) return null;
            return await searchItunes({ term });
        },
        [term]
    );

    if (!term) return <p>Ketik kata kunci di kolom pencarian.</p>;
    if (loading) return <p>Mengambil data...</p>;
    if (error) return <p style={{ color: "red" }}>{error.message}</p>;
    if (!data || data.length === 0) return <p>Tidak ada hasil.</p>;

    return (
        <section>
            <h2>Hasil untuk: <em>{term}</em></h2>
            <ul>
                {data.map((track) => (
                    <li key={track.trackId}>
                        <img src={track.artworkUrl100} alt={track.trackName} />
                        <div>
                            <strong>{track.trackName}</strong> — {track.artistName}
                        </div>
                        <button onClick={() => playTrack(track)}>Play</button>
                        <button onClick={() => add(track)}>+ Playlist</button>
                    </li>
                ))}
            </ul>
        </section>
    );
}

