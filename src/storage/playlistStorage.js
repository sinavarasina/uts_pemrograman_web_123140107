const KEY = "playlist";

export function getPlaylist() {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : [];
}

export function savePlaylist(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
}

export function addToPlaylist(item) {
    const list = getPlaylist();
    if (!list.some((i) => i.trackId === item.trackId)) {
        list.push(item);
        savePlaylist(list);
    }
    return list;
}

export function removeFromPlaylist(trackId) {
    const list = getPlaylist().filter((i) => i.trackId !== trackId);
    savePlaylist(list);
    return list;
}

export function clearPlaylist() {
    localStorage.removeItem(KEY);
}

