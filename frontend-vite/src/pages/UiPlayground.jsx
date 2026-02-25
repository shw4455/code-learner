import Loading from "../components/common/Loading.jsx";
import EmptyState from "../components/common/EmptyState.jsx";
import ErrorState from "../components/common/ErrorState.jsx";

export default function UiPlayground() {
    return (
        <div style={stackStyle}>
            <Loading label="불러오는 중..." />
            <EmptyState
                title="Empty State"
                description="표시할 데이터가 없습니다."
            />
            <ErrorState
                title="Error State"
                message="서버 요청에 실패했습니다."
                onRetry={() => alert("retry")}
            />
        </div>
    );
}

const stackStyle = {
    display: "flex",
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
};
