import { useState, useEffect, useCallback } from "react";
import {
    getPlaylist,
    savePlaylist,
    addToPlaylist,
    removeFromPlaylist,
    clearPlaylist,
} from "../storage/playlistStorage";

export function usePlaylist() {
    const [playlist, setPlaylist] = useState(getPlaylist());

    const add = useCallback((track) => {
        const newList = addToPlaylist(track);
        setPlaylist(newList);
    }, []);

    const remove = useCallback((trackId) => {
        const newList = removeFromPlaylist(trackId);
        setPlaylist(newList);
    }, []);

    const clear = useCallback(() => {
        clearPlaylist();
        setPlaylist([]);
    }, []);

    useEffect(() => {
        savePlaylist(playlist);
    }, [playlist]);

    useEffect(() => {
        const syncHandler = (e) => {
            if (e.key === "playlist") setPlaylist(getPlaylist());
        };
        window.addEventListener("storage", syncHandler);
        return () => window.removeEventListener("storage", syncHandler);
    }, []);

    return { playlist, add, remove, clear };
}

