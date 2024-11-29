import React, { useEffect, useState } from "react";
import styles from "./post.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeletePost from "../commponent/DeletePost.jsx";
import { useAuth } from "../context/AuthContext.js"; // AuthContext에서 useAuth 훅 가져오기

function timeDifference(isoString) {
    const moment = require("moment");

    const targetTime = moment(isoString);
    const now = moment();
    const duration = moment.duration(now.diff(targetTime));

    const units = {
        년: duration.years(),
        개월: duration.months(),
        주: duration.weeks(),
        일: duration.days(),
        시간: duration.hours(),
        분: duration.minutes(),
        초: duration.seconds(),
    };

    for (const unit in units) {
        if (units[unit] > 0) {
            return `${units[unit]} ${unit} 전`;
        }
    }

    return "방금 전";
}

function Post() {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null); // 게시글 데이터 상태
    const [comments, setComments] = useState([]); // 댓글 목록 상태
    const [tags, setTags] = useState([]); // 댓글 목록 상태
    const [commentContent, setCommentContent] = useState(""); // 댓글 입력 상태
    const [replyContent, setReplyContent] = useState(""); // 대댓글 입력 상태
    const [replyParentId, setReplyParentId] = useState(null); // 대댓글의 상위 댓글 ID
    const { user } = useAuth(); // 로그인된 사용자 정보 가져오기
    // 게시글, 댓글 데이터 가져오기
    useEffect(() => {
        // 게시글 데이터 가져오기
        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setData(data.post)) // 게시글 데이터만 설정
            .catch((error) => console.log(error));

        // 댓글 데이터 가져오기
        fetch(`http://localhost:3001/api/posts/${postId}/comments`)
            .then((response) => response.json())
            .then((data) => setComments(data)) // 댓글 목록 설정
            .catch((error) => console.log(error));

        // 태그 데이터 가져오기
        fetch(`http://localhost:3001/api/posts/${postId}/tags`)
            .then((response) => response.json())
            .then((data) => setTags(data)) // 댓글 목록 설정
            .catch((error) => console.log(error));
    }, [postId]);

    // 좋아요 증가 함수
    const handleLikeIncrement = async () => {
        try {
            const userId = user.id; // 로그인된 사용자 ID를 가져와야 함 (AuthContext 등에서 가져오기)
            const response = await fetch(
                `http://localhost:3001/api/posts/${postId}/like`,
                {
                    method: "PUT",
                    // JSON 타입임을 명시, 타입을 변환해주진 않음, 변환해서 보내줘야함, 받는 서버도 마찬가지
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                }
            );

            if (response.ok) {
                setData((prevData) => ({
                    ...prevData,
                    likes: prevData.likes + 1,
                }));
            } else {
                const errorData = await response.json();
                alert(errorData.message);
            }
        } catch (error) {
            console.error("Error incrementing like count:", error);
        }
    };

    // 댓글, 대댓글 작성
    const handleCommentSubmit = async () => {
        // trim() -> 공백제거
        if (!commentContent.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }
        try {
            const writer_id = 1; // ● 실제 앱에서는 인증된 사용자 ID로 설정
            await fetch(`http://localhost:3001/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    writer_id,
                    content: commentContent,
                    parent_id: null,
                }), // 최상위 댓글은 parent_id가 null
            });
            setCommentContent("");

            // 댓글 목록 업데이트
            const response = await fetch(
                `http://localhost:3001/api/posts/${postId}/comments`
            );
            const updatedComments = await response.json();
            setComments(updatedComments);
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleReplySubmit = async (parentId) => {
        if (!replyContent.trim()) {
            alert("대댓글 내용을 입력하세요.");
            return;
        }
        try {
            const writer_id = 1; // 실제 앱에서는 인증된 사용자 ID로 설정
            await fetch(`http://localhost:3001/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    writer_id,
                    content: replyContent,
                    parent_id: parentId,
                }), // 대댓글에는 parent_id 설정
            });
            setReplyContent("");
            setReplyParentId(null); // 대댓글 작성 후 초기화

            // 댓글 목록 업데이트
            const response = await fetch(
                `http://localhost:3001/api/posts/${postId}/comments`
            );
            const updatedComments = await response.json();
            setComments(updatedComments);
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    const handleCommentDelete = async (commentId) => {
        try {
            await fetch(`http://localhost:3001/api/comments/${commentId}`, {
                method: "DELETE",
            });
            setComments(comments.filter((comment) => comment.id !== commentId));
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const [showDeleted, setShowDeleted] = useState(false);
    const handleDelete = () => {
        setShowDeleted(true);
    };
    const handleUpdate = () => {
        navigate(`/board/update/${postId}`);
    };
    const handleCancel = () => {
        setShowDeleted(false);
    };

    // 댓글과 대댓글을 계층적으로 렌더링하는 함수
    const renderComments = (parentId = null) => {
        return comments
            .filter((comment) => comment.parent_id === parentId) // parent_id 기준으로 필터링
            .map((comment) => (
                <div
                    key={comment.id}
                    style={{ marginLeft: parentId ? "20px" : "0px" }}
                >
                    <div className={styles.commentContainer}>
                        <div className={styles.commentAuthorWrapepr}>
                            <div className={styles.commentAuthor}>
                                <Link>{comment.username}</Link>
                                <div className={styles.createdAt}>
                                    {timeDifference(comment.created_at)}
                                </div>
                            </div>
                            <div id={styles.commentManagement}>
                                <button
                                    className={styles.dataManagementLink}
                                    onClick={() =>
                                        handleCommentDelete(comment.id)
                                    }
                                >
                                    삭제
                                </button>
                                {/* 무한 대댓글 기능, 조건 삭제시 대댓글에도 대댓글 가능 */}
                                {parentId === null && (
                                    <button
                                        className={styles.dataManagementLink}
                                        onClick={() =>
                                            setReplyParentId(comment.id)
                                        }
                                    >
                                        답글
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={styles.commentContentsWrapper}>
                            {comment.content}
                        </div>
                        {replyParentId === comment.id && (
                            <div className={styles.replyContainer}>
                                <textarea
                                    id={styles.commentTextArea}
                                    value={replyContent}
                                    onChange={(e) =>
                                        setReplyContent(e.target.value)
                                    }
                                    placeholder="대댓글을 입력하세요."
                                ></textarea>
                                <button
                                    className={styles.commentWriteButton}
                                    onClick={() =>
                                        handleReplySubmit(comment.id)
                                    }
                                >
                                    답글 작성
                                </button>
                            </div>
                        )}
                        <div>{renderComments(comment.id)}</div>
                    </div>
                </div>
            ));
    };

    return (
        <div id={styles.container}>
            <div id={styles.main}>
                <div id={styles.titleContainer}>
                    {showDeleted && (
                        <DeletePost
                            postId={postId}
                            onCancel={handleCancel}
                        ></DeletePost>
                    )}
                    <div>
                        <h1>{data?.title || "no data"}</h1>
                    </div>
                    <div id={styles.dataManagementContainer}>
                        <Link className={styles.dataManagementLink}>통계</Link>
                        <button
                            className={styles.dataManagementLink}
                            onClick={handleUpdate}
                        >
                            수정
                        </button>
                        <button
                            className={styles.dataManagementLink}
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </div>
                    <div id={styles.postMetaContainer}>
                        <div id={styles.metaDataContainer}>
                            <Link className={styles.dataManagementLink}>
                                {data?.username || "no data"}
                            </Link>
                            <div className={styles.separator}>·</div>
                            <Link className={styles.metaDataLink}>
                                {timeDifference(data?.created_at) || "no data"}
                            </Link>
                            <div className={styles.separator}>·</div>
                            <Link className={styles.private}>비공개</Link>
                        </div>
                        <div>
                            <button
                                className={styles.likeButton}
                                onClick={handleLikeIncrement}
                            >
                                👍 좋아요
                            </button>
                            <span>
                                좋아요 수:{" "}
                                {data?.likes === 0
                                    ? " 0"
                                    : data?.likes || " no data"}
                            </span>{" "}
                        </div>
                    </div>
                </div>
                <div id={styles.tagWrapper}>
                    {tags.map((tag, index) => (
                        <li key={index} className={styles.tag}>
                            {tag.tag_name}
                        </li>
                    ))}
                </div>
                <div id={styles.postContentContainer}>
                    <pre>{data?.content || "no content available"}</pre>
                </div>
                <hr />
                <div id={styles.writeCommentContainer}>
                    <h4>{comments.length}개의 댓글</h4>
                    <textarea
                        id={styles.commentTextArea}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="댓글을 입력하세요."
                    ></textarea>
                    <div id={styles.commentWriteWrapper}>
                        <button
                            className={styles.commentWriteButton}
                            onClick={handleCommentSubmit}
                        >
                            댓글 작성 버튼
                        </button>
                    </div>
                    <div id={styles.commentsContainer}>
                        {renderComments()} {/* 댓글과 대댓글 렌더링 */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
