import React from "react";
import styles from "./styles/post.module.css";
import { Link } from "react-router-dom";

function Post() {
    return (
        <div id={styles.container}>
            <div id={styles.main}>
                <div id={styles.titleContainer}>
                    <div>
                        <h1>제목</h1>
                    </div>
                    <div id={styles.dataManagementContainer}>
                        <Link className={styles.dataManagementLink}>통계</Link>
                        <Link className={styles.dataManagementLink}>수정</Link>
                        <Link className={styles.dataManagementLink}>삭제</Link>
                    </div>
                    <div id={styles.postMetaContainer}>
                        <div>
                            <Link className={styles.dataManagementLink}>
                                작성자
                            </Link>
                            <Link> · 약 언제 전 ·</Link>
                            <Link className={styles.private}>비공개</Link>
                        </div>
                        <div>좋아요수</div>
                    </div>
                    <div id={styles.tagWrapper}>
                        <Link id={styles.tag}>태그</Link>
                        <Link id={styles.tag}>태태태그그그</Link>
                        <Link id={styles.tag}>태태태그그그</Link>
                    </div>
                </div>
                <div id={styles.postContentContainer}>
                    <div>글</div>
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
