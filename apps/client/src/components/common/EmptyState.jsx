export default function EmptyState({
  title = "Empty",
  description = "표시할 데이터가 없습니다.",
}) {
  return (
    <div style={boxStyle}>
      <div style={{ fontWeight: 600 }}>{title}</div>
      <div style={{ opacity: 0.7, marginTop: 4 }}>{description}</div>
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
