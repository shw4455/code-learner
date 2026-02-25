export default function SkeletonList({ rows = 5 }) {
    return (
        <div style={{ width: 320 }}>
            {Array.from({ length: rows }).map((_, idx) => (
                <div key={idx} style={rowStyle} />
            ))}
        </div>
    );
}

const rowStyle = {
    height: 14,
    marginBottom: 10,
    borderRadius: 8,
    background: "#eee",
    border: "1px solid #e5e5e5",
};
