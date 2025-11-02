import { useEffect, useRef } from "react";
import { usePlayer } from "../../core/context/PlayerContext";

export default function Footer() {
    const { currentTrack, isPlaying, playTrack, pauseTrack } = usePlayer();
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current && currentTrack?.previewUrl) {
            audioRef.current.src = currentTrack.previewUrl;
            if (isPlaying) audioRef.current.play().catch(() => { });
        }
    }, [currentTrack, isPlaying]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            pauseTrack();
        } else {
            audioRef.current.play().catch(() => { });
            playTrack(currentTrack);
        }
    };

    if (!currentTrack)
        return (
            <footer
                style={{
                    background: "#373b3e",
                    color: "#bec8d1",
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                }}
            >
                Tidak ada lagu diputar
            </footer>
        );

    return (
        <footer
            style={{
                background: "#373b3e",
                color: "#bec8d1",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1rem",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                    src={currentTrack.artworkUrl100}
                    alt={currentTrack.trackName}
                    width={48}
                    height={48}
                    style={{ borderRadius: "6px" }}
                />
                <div>
                    <h4 style={{ margin: 0 }}>{currentTrack.trackName}</h4>
                    <small>{currentTrack.artistName}</small>
                </div>
            </div>

            <button onClick={togglePlay}>{isPlaying ? "Stop" : "Play"}</button>
            <audio ref={audioRef} />
        </footer>
    );
}

