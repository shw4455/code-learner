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
    }, []);

    return (
        <div id={styles.container}>
            <div id={styles.main}>
                <div id={styles.titleContainer}>
                    <div>
                        {/* 단축 평가 */}
                        <h1>{data.comments?.[0]?.id || "No comments"}</h1>
                    </div>
                    <div id={styles.dataManagementContainer}>
                        <Link className={styles.dataManagementLink}>통계</Link>
                        <Link className={styles.dataManagementLink}>수정</Link>
                        <Link className={styles.dataManagementLink}>삭제</Link>
                    </div>
                    <div id={styles.postMetaContainer}>
                        <div>
                            <Link className={styles.dataManagementLink}>
                                {data.title}
                            </Link>
                            <Link> · {data.created_at} ·</Link>
                            <Link className={styles.private}>비공개</Link>
                        </div>
                        <div>좋아요 수 : {data.likes}</div>
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
                    <h4>N개의 댓글</h4>
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
                </div>
                <div id={styles.commentContainer}>
                    <div id={styles.commentAuthorWrapepr}>
                        <div id={styles.commentAuthor}>
                            <Link>작성자</Link>
                            <div className={styles.createdAt}>약 n시간 전</div>
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
                        <div id={styles.commentContentsWrapper}>댓글 내용</div>
                    </div>
                    <Link id={styles.replyWrapper}>답글 달기</Link>
                </div>
            </div>
        </div>
    );
}

export default Post;
