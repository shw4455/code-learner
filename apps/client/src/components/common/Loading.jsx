export default function Loading({ label = "불러오는 중..." }) {
  return (
    <div style={boxStyle}>
      <div style={{ fontWeight: 600 }}>Loading</div>
      <div style={{ opacity: 0.7, marginTop: 4 }}>{label}</div>
    </div>
  );
}

const boxStyle = {
  width: 320,
  padding: 16,
  border: "1px solid #ddd",
  borderRadius: 12,
  textAlign: "center",
};
