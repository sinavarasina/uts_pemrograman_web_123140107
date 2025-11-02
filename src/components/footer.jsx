import { useState, useRef, useEffect } from "react";
import { usePlaylist } from "../hooks/usePlaylist";

export default function Footer() {
    const { playlist } = usePlaylist();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const currentTrack = playlist[currentIndex];

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
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => { });
            setIsPlaying(true);
        }
    };

    const playNext = () => {
        if (playlist.length === 0) return;
        setCurrentIndex((prev) => (prev + 1) % playlist.length);
    };

    const playPrev = () => {
        if (playlist.length === 0) return;
        setCurrentIndex((prev) =>
            prev === 0 ? playlist.length - 1 : prev - 1
        );
    };

    if (!currentTrack) {
        return (
            <footer
                style={{
                    background: "#373b3e",
                    color: "#bec8d1",
                    padding: "0.75rem 1rem",
                    textAlign: "center",
                }}
            >
                <span>Tidak ada lagu diputar</span>
            </footer>
        );
    }

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
            {/* Info lagu */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                    src={currentTrack.artworkUrl100}
                    alt={currentTrack.trackName}
                    width={48}
                    height={48}
                    style={{
                        borderRadius: "6px",
                    }}
                />
                <div>
                    <h4 style={{ margin: 0 }}>{currentTrack.trackName}</h4>
                    <small>{currentTrack.artistName}</small>
                </div>
            </div>

            {/* Kontrol */}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <button onClick={playPrev}>⏮</button>
                <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
                <button onClick={playNext}>⏭</button>
            </div>

            {/* Audio tag */}
            <audio ref={audioRef} onEnded={playNext} />
        </footer>
    );
}

