export default function SearchResultTable({ data, onPlay, onAdd }) {
    return (
        <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                background: "var(--color-dark)",
                borderRadius: "8px",
                overflow: "hidden",
            }}
        >
            <thead
                style={{
                    background: "var(--color-deep)",
                    color: "var(--color-light)",
                }}
            >
                <tr>
                    <th>Artwork</th>
                    <th>Track Name</th>
                    <th>Artist</th>
                    <th>Collection</th>
                    <th>Release Date</th>
                    <th>Price (USD)</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {data.map((track) => (
                    <tr key={track.trackId}>
                        <td>
                            <img
                                src={track.artworkUrl100}
                                alt={track.trackName}
                                width="60"
                                height="60"
                                style={{ borderRadius: "6px" }}
                            />
                        </td>
                        <td>{track.trackName}</td>
                        <td>{track.artistName}</td>
                        <td>{track.collectionName}</td>
                        <td>{new Date(track.releaseDate).toLocaleDateString()}</td>
                        <td>{track.trackPrice ? `$${track.trackPrice}` : "-"}</td>
                        <td>
                            <button
                                onClick={() => onPlay(track)}
                                style={{
                                    marginRight: "0.3rem",
                                    background: "var(--color-pink)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "0.3rem 0.6rem",
                                    cursor: "pointer",
                                }}
                            >
                                ▶ Play
                            </button>
                            <button
                                onClick={() => onAdd(track)}
                                style={{
                                    background: "var(--color-teal)",
                                    color: "#000",
                                    border: "none",
                                    borderRadius: "4px",
                                    padding: "0.3rem 0.6rem",
                                    cursor: "pointer",
                                }}
                            >
                                + Playlist
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

