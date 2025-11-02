import { useState } from "react";

export default function FilterModal({ open, onClose, onApply }) {
    const [filters, setFilters] = useState({
        country: "US",
        media: "music",
        entity: "musicTrack",
        limit: 50,
        explicit: "Yes",
    });

    if (!open) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
            }}
            onClick={onClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: "var(--color-dark)",
                    color: "var(--color-light)",
                    padding: "1rem 1.5rem",
                    borderRadius: "4px",
                    minWidth: "320px",
                    maxWidth: "90vw",
                }}
            >
                <h3 style={{ marginBottom: "1rem", color: "var(--color-teal)" }}>
                    Search Filters
                </h3>

                <label>Country</label>
                <input
                    name="country"
                    value={filters.country}
                    onChange={handleChange}
                    placeholder="US"
                    style={{ width: "100%", marginBottom: "0.6rem" }}
                />

                <label>Media Type</label>
                <select
                    name="media"
                    value={filters.media}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "0.6rem" }}
                >
                    <option value="music">Music</option>
                    <option value="musicVideo">Music Video</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="podcast">Podcast</option>
                    <option value="movie">Movie</option>
                    <option value="all">All</option>
                </select>

                <label>Entity</label>
                <select
                    name="entity"
                    value={filters.entity}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "0.6rem" }}
                >
                    <option value="musicTrack">musicTrack</option>
                    <option value="album">album</option>
                    <option value="mix">mix</option>
                    <option value="musicArtist">musicArtist</option>
                </select>

                <label>Limit</label>
                <input
                    type="number"
                    min="1"
                    max="200"
                    name="limit"
                    value={filters.limit}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "0.6rem" }}
                />

                <label>Explicit</label>
                <select
                    name="explicit"
                    value={filters.explicit}
                    onChange={handleChange}
                    style={{ width: "100%", marginBottom: "1rem" }}
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <button
                        onClick={() => onApply(filters)}
                        style={{
                            background: "var(--color-teal)",
                            color: "var(--color-dark)",
                            padding: "0.4rem 0.8rem",
                        }}
                    >
                        Apply
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: "var(--color-pink)",
                            color: "#fff",
                            padding: "0.4rem 0.8rem",
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

