export default function Loading({ label = "Loading..." }) {
    return (
        <div style={boxStyle}>
            <div style={{ fontWeight: 600 }}>Loading</div>
            <div style={{ opacity: 0.7 }}>{label}</div>
        </div>
    );
}

const boxStyle = {
    width: 280,
    padding: 16,
    border: "1px solid #ddd",
    borderRadius: 12,
    textAlign: "center",
};
