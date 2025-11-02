import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { searchItunes } from "../api/itunes";

export default function Search() {
    const [params] = useSearchParams();
    const term = params.get("q");

    const { data, loading, error } = useFetch(
        async () => {
            if (!term) return null;
            const results = await searchItunes({ term });
            return results;
        },
        [term]
    );


    if (!term) return <p>Ketik kata kunci di kolom pencarian.</p>;
    if (loading) return <p>Mengambil data dari iTunes...</p>;
    if (error) return <p style={{ color: "red" }}>{error.message}</p>;
    if (!data) return <p>Tidak ada hasil.</p>;

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
                    </li>
                ))}
            </ul>
        </section>
    );
}

