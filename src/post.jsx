import React, { useEffect, useState } from "react";
import styles from "./styles/post.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeletePost from "./commponent/DeletePost.jsx";

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
    const [commentContent, setCommentContent] = useState(""); // 댓글 입력 상태

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
    }, [postId]);

    const handleCommentSubmit = async () => {
        if (!commentContent.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }
        try {
            const writer_id = 1; // 실제 앱에서는 인증된 사용자 ID로 설정
            await fetch(`http://localhost:3001/api/posts/${postId}/comments`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ writer_id, content: commentContent }),
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
                            좋아요 수:
                            {data?.likes === 0
                                ? " 0"
                                : data?.likes || " no data"}
                        </div>
                    </div>
                </div>
                <div id={styles.postContentContainer}>
                    <div>{data?.content || "no content available"}</div>
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
                        {comments.map((comment) => (
                            <div
                                key={comment.id}
                                className={styles.commentContainer}
                            >
                                <div className={styles.commentAuthorWrapepr}>
                                    <div className={styles.commentAuthor}>
                                        <Link>{comment.username}</Link>
                                        <div className={styles.createdAt}>
                                            {timeDifference(comment.created_at)}
                                        </div>
                                    </div>
                                    <div id={styles.commentManagement}>
                                        <button
                                            className={
                                                styles.dataManagementLink
                                            }
                                            onClick={() =>
                                                handleCommentDelete(comment.id)
                                            }
                                        >
                                            삭제
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className={
                                            styles.commentContentsWrapper
                                        }
                                    >
                                        {comment.content}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
