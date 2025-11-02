export default function SortBar({ sortBy, onChange }) {
    return (
        <div style={{ margin: "1rem 0" }}>
            <label style={{ marginRight: "0.5rem" }}>Sort By:</label>
            <select
                value={sortBy}
                onChange={(e) => onChange(e.target.value)}
                style={{
                    padding: "0.4rem",
                    borderRadius: "4px",
                    border: "1px solid var(--color-border)",
                }}
            >
                <option value="releaseDate">Release Date</option>
                <option value="price">Price</option>
            </select>
        </div>
    );
}

