import Loading from "./components/common/Loading";
import EmptyState from "./components/common/EmptyState";
import ErrorState from "./components/common/ErrorState";
import SkeletonList from "./components/common/SkeletonList";

export default function MyPosts() {
    return (
        <div style={pageStyle}>
            <div style={rowStyle}>
                <Loading label="로딩 중..." />

                <EmptyState title="Empty" description="게시글이 없습니다." />

                <ErrorState
                    title="Error"
                    message="요청에 실패했습니다."
                    onRetry={() => alert("retry")}
                />

                <SkeletonList rows={4} />
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "60vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const rowStyle = {
    display: "flex",
    flexDirection: "row", // 수평 일자
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap", // 화면 작아지면 줄바꿈
};
