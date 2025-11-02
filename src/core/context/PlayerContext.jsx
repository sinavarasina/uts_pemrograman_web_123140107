import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    const playTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const pauseTrack = () => setIsPlaying(false);

    const seek = (time) => {
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !currentTrack?.previewUrl) return;

        audio.src = currentTrack.previewUrl;
        audio.play().catch(() => setIsPlaying(false));
        setIsPlaying(true);
    }, [currentTrack]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) audio.play().catch(() => setIsPlaying(false));
        else audio.pause();
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const update = () => setProgress(audio.currentTime);
        const loaded = () => setDuration(audio.duration || 0);

        audio.addEventListener("timeupdate", update);
        audio.addEventListener("loadedmetadata", loaded);

        return () => {
            audio.removeEventListener("timeupdate", update);
            audio.removeEventListener("loadedmetadata", loaded);
        };
    }, []);

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                progress,
                duration,
                playTrack,
                pauseTrack,
                seek,
            }}
        >
            {children}
            <audio ref={audioRef} hidden />
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);

