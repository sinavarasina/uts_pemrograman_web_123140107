export default function MusicList({ tracks, onPlay, onAdd, onRemove, showAdd = false, showRemove = false }) {
    return (
        <div>
            {tracks.map((track) => (
                <div
                    key={track.trackId}
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
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: "1" }}>
                        <img
                            src={track.artworkUrl100}
                            alt={track.trackName}
                            width="48"
                            height="48"
                            style={{ borderRadius: "2px", flexShrink: 0 }}
                        />
                        <div style={{ lineHeight: "1.3" }}>
                            <div style={{ fontSize: "0.9rem", fontWeight: "500" }}>{track.trackName}</div>
                            <div style={{ fontSize: "0.8rem", color: "var(--color-teal)" }}>
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
                    </div>
                </div>
            ))}
        </div>
    );
}

