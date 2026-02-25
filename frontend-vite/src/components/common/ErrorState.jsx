export default function ErrorState({
    title = "Error",
    message = "문제가 발생했습니다.",
    onRetry,
}) {
    return (
        <div style={boxStyle}>
            <div style={{ fontWeight: 600 }}>{title}</div>
            <div style={{ opacity: 0.7, marginTop: 4 }}>{message}</div>

            {typeof onRetry === "function" && (
                <button style={btnStyle} onClick={onRetry}>
                    재시도
                </button>
            )}
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

const btnStyle = {
    marginTop: 12,
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid #ccc",
    cursor: "pointer",
};
