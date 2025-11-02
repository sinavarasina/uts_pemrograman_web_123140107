import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playTrack = (track) => {
        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const pauseTrack = () => setIsPlaying(false);

    return (
        <PlayerContext.Provider
            value={{ currentTrack, isPlaying, playTrack, pauseTrack }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export const usePlayer = () => useContext(PlayerContext);

