import { usePlayer } from "../../core/context/PlayerContext";

export default function Footer() {
    const { currentTrack, isPlaying, progress, duration, playTrack, pauseTrack, seek } = usePlayer();

    const handleSeek = (e) => {
        if (!duration) return;
        const rect = e.target.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const ratio = clickX / rect.width;
        seek(duration * ratio);
    };

    return (
        <footer
            style={{
                background: "var(--color-light)",
                color: "var(--color-deep)",
                display: "flex",
                flexDirection: "column",
                borderTop: "2px solid var(--color-border)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: currentTrack ? "space-between" : "center",
                    padding: "0.5rem 1rem",
                }}
            >
                {!currentTrack ? (
                    <p>Tidak ada lagu yang diputar</p>
                ) : (
                    <>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                            <img
                                src={currentTrack.artworkUrl100}
                                alt={currentTrack.trackName}
                                width="48"
                                height="48"
                                style={{ borderRadius: "4px" }}
                            />
                            <div>
                                <h4 style={{ margin: 0 }}>{currentTrack.trackName}</h4>
                                <small>{currentTrack.artistName}</small>
                            </div>
                        </div>
                        <button
                            onClick={() =>
                                isPlaying ? pauseTrack() : playTrack(currentTrack)
                            }
                            style={{
                                background: "var(--color-pink)",
                                color: "#fff",
                                padding: "0.4rem 1rem",
                                fontWeight: "bold",
                            }}
                        >
                            {isPlaying ? "Pause" : "Play"}
                        </button>
                    </>
                )}
            </div>

            {/* Seekbar tipis */}
            {currentTrack && (
                <div
                    onClick={handleSeek}
                    style={{
                        height: "4px",
                        width: "100%",
                        background: "var(--color-border)",
                        position: "relative",
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            height: "100%",
                            width: duration ? `${(progress / duration) * 100}%` : "0%",
                            background: "var(--color-pink)",
                            transition: "width 0.15s linear",
                        }}
                    />
                </div>
            )}
        </footer>
    );
}

