import { useState, useMemo, useEffect } from "react";

function formatDuration(ms) {
    if (!ms) return "-";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function MusicList({
    tracks,
    onPlay,
    onAdd,
    onRemove,
    showAdd = false,
    showRemove = false,
    enableSort = false,
}) {
    const [selected, setSelected] = useState(null);
    const [sortBy, setSortBy] = useState("releaseDate");

    useEffect(() => {
        setSortBy("releaseDate");
    }, [tracks]);

    const sortedTracks = useMemo(() => {
        if (!enableSort) return tracks;
        const sorted = [...tracks];
        switch (sortBy) {
            case "price":
                return sorted.sort((a, b) => (b.trackPrice || 0) - (a.trackPrice || 0));
            case "title":
                return sorted.sort((a, b) => a.trackName.localeCompare(b.trackName));
            default:
                return sorted.sort(
                    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
                );
        }
    }, [tracks, sortBy, enableSort]);

    return (
        <div>
            {enableSort && (
                <div style={{ marginBottom: "0.8rem", textAlign: "right" }}>
                    <label
                        htmlFor="sort"
                        style={{ marginRight: "0.5rem", fontSize: "0.9rem" }}
                    >
                        Urutkan:
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            background: "var(--color-dark)",
                            color: "var(--color-teal)",
                            border: "1px solid var(--color-border)",
                            padding: "0.25rem 0.5rem",
                            borderRadius: "4px",
                        }}
                    >
                        <option value="releaseDate">Tanggal Rilis</option>
                        <option value="price">Harga</option>
                        <option value="title">Judul Lagu (A–Z)</option>
                    </select>
                </div>
            )}

            {sortedTracks.map((track) => (
                <div
                    key={track.trackId || track.collectionId}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(255,255,255,0.05)",
                        padding: "0.5rem 0.75rem",
                        marginBottom: "0.5rem",
                        borderRadius: "2px",
                        transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
                    }
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            flex: "1",
                        }}
                    >
                        <img
                            src={track.artworkUrl100}
                            alt={track.trackName}
                            width="48"
                            height="48"
                            style={{ borderRadius: "2px", flexShrink: 0 }}
                        />
                        <div style={{ lineHeight: "1.3", textAlign: "left" }}>
                            <div
                                style={{
                                    fontSize: "0.9rem",
                                    fontWeight: "500",
                                    color: "var(--color-light)",
                                }}
                            >
                                {track.trackName}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.8rem",
                                    color: "var(--color-teal)",
                                }}
                            >
                                {track.artistName}
                            </div>
                            <div
                                style={{
                                    fontSize: "0.75rem",
                                    color: "var(--color-light)",
                                    opacity: 0.7,
                                }}
                            >
                                {track.collectionName}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                            {new Date(track.releaseDate).getFullYear()}
                        </div>
                        <div style={{ fontSize: "0.75rem" }}>
                            {track.trackPrice ? `$${track.trackPrice}` : "-"}
                        </div>
                        <button
                            onClick={() => onPlay(track)}
                            style={{
                                background: "var(--color-pink)",
                                color: "#fff",
                                padding: "0.3rem 0.6rem",
                                fontSize: "0.8rem",
                            }}
                        >
                            ▶
                        </button>
                        {showAdd && (
                            <button
                                onClick={() => onAdd(track)}
                                style={{
                                    background: "var(--color-teal)",
                                    color: "var(--color-dark)",
                                    padding: "0.3rem 0.6rem",
                                    fontSize: "0.8rem",
                                }}
                            >
                                ＋
                            </button>
                        )}
                        {showRemove && (
                            <button
                                onClick={() => onRemove(track.trackId)}
                                style={{
                                    background: "var(--color-dark)",
                                    color: "#fff",
                                    padding: "0.3rem 0.6rem",
                                    fontSize: "0.8rem",
                                }}
                            >
                                ✕
                            </button>
                        )}
                        <button
                            onClick={() => setSelected(track)}
                            style={{
                                background: "transparent",
                                border: "1px solid var(--color-border)",
                                color: "var(--color-light)",
                                padding: "0.3rem 0.6rem",
                                fontSize: "0.8rem",
                            }}
                        >
                            Lihat Detail
                        </button>
                    </div>
                </div>
            ))}

            {selected && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 50,
                    }}
                    onClick={() => setSelected(null)}
                >
                    <div
                        style={{
                            background: "var(--color-dark)",
                            color: "var(--color-light)",
                            borderRadius: "6px",
                            padding: "1.2rem 1.5rem",
                            width: "90%",
                            maxWidth: "420px",
                            textAlign: "left",
                            boxShadow: "0 0 12px rgba(0,0,0,0.3)",
                            animation: "fadeIn 0.2s ease-in",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selected.artworkUrl100}
                            alt={selected.trackName}
                            width="100%"
                            style={{
                                borderRadius: "6px",
                                marginBottom: "1rem",
                            }}
                        />
                        <h3
                            style={{
                                marginBottom: "0.4rem",
                                textAlign: "left",
                                fontSize: "1.1rem",
                                color: "#fff",
                            }}
                        >
                            {selected.trackName}
                        </h3>
                        <p style={{ color: "var(--color-teal)", marginBottom: "0.6rem" }}>
                            {selected.artistName}
                        </p>
                        <p><strong>Album:</strong> {selected.collectionName}</p>
                        <p><strong>Genre:</strong> {selected.primaryGenreName}</p>
                        <p><strong>Durasi:</strong> {formatDuration(selected.trackTimeMillis)}</p>
                        <p><strong>Rilis:</strong> {new Date(selected.releaseDate).toLocaleDateString()}</p>
                        <p><strong>Harga:</strong> {selected.trackPrice ? `$${selected.trackPrice}` : "N/A"}</p>
                        <p><strong>Negara:</strong> {selected.country}</p>

                        <a
                            href={selected.trackViewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-block",
                                marginTop: "0.8rem",
                                color: "var(--color-pink)",
                                textDecoration: "underline",
                                textAlign: "left",
                            }}
                        >
                            Buka di Apple Music →
                        </a>

                        <button
                            onClick={() => setSelected(null)}
                            style={{
                                marginTop: "1rem",
                                width: "100%",
                                background: "var(--color-pink)",
                                color: "#fff",
                                padding: "0.4rem",
                                borderRadius: "4px",
                                fontWeight: "bold",
                            }}
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

