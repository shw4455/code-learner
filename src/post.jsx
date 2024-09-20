import React, { useEffect, useState } from "react";
import styles from "./styles/post.module.css";
import { Link, useParams } from "react-router-dom";

function Post() {
    const { postId } = useParams();

    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log(error));
    }, [postId]); // URL이 변경되면 useParams가 다시 호출되어 postId 값이 변경 > useEffect 동작 > 리렌더링(가상 DOM Diffing)
    return (
        <div id={styles.container}>
            <div id={styles.main}>
                <div id={styles.titleContainer}>
                    <div>
                        {/* 옵셔널 체이닝, 단축 평가 */}
                        <h1>{data.post?.[0].title || "no data"}</h1>
                    </div>
                    <div id={styles.dataManagementContainer}>
                        <Link className={styles.dataManagementLink}>통계</Link>
                        <Link className={styles.dataManagementLink}>수정</Link>
                        <Link className={styles.dataManagementLink}>삭제</Link>
                    </div>
                    <div id={styles.postMetaContainer}>
                        <div>
                            <Link className={styles.dataManagementLink}>
                                {data.user?.[0]?.username || "no data"}
                            </Link>
                            </Link>
                            <Link> · {data.created_at} ·</Link>
                            <Link className={styles.private}>비공개</Link>
                        </div>
                        <div>
                            좋아요 수 : {data.post?.[0]?.likes || "no data"}
                        </div>
                    </div>
                    <div id={styles.tagWrapper}>
                        <Link id={styles.tag}>태그</Link>
                        <Link id={styles.tag}>태태태그그그</Link>
                        <Link id={styles.tag}>태태태그그그</Link>
                    </div>
                </div>
                <div id={styles.postContentContainer}>
                    <div>{data.content}</div>
                </div>
                <hr></hr>
                <div id={styles.writeCommentContainer}>
                    <h4>{data?.commentCount || "no data"}개의 댓글</h4>
                    <textarea
                        id={styles.commentTextArea}
                        name="comment"
                        placeholder="댓글을 입력하세요."
                    ></textarea>
                    <div id={styles.commentWriteWrapper}>
                        <button className={styles.commentWriteButton}>
                            댓글 작성 버튼
                        </button>
                    </div>
                    <div id={styles.commentsContainer}></div>
                    {data.comments?.map((comment) => (
                        <div className={styles.commentContainer}>
                            <div className={styles.commentAuthorWrapepr}>
                                <div className={styles.commentAuthor}>
                                    <Link>{comment.username}</Link>
                                    <div className={styles.createdAt}>
                                        {timeDifference(comment.created_at)}
                                    </div>
                                </div>
                                <div id={styles.commentManagement}>
                                    <Link className={styles.dataManagementLink}>
                                        수정
                                    </Link>
                                    <Link className={styles.dataManagementLink}>
                                        삭제
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <div className={styles.commentContentsWrapper}>
                                    {comment.content}
                                </div>
                            </div>
                            <Link className={styles.replyWrapper}>
                                <div className={styles.reply}>답글 달기</div>
                            </Link>
                            <hr></hr>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Post;
