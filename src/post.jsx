import React, { useEffect, useState } from "react";
import styles from "./styles/post.module.css";
import { Link, useParams } from "react-router-dom";
import DeletePost from "./commponent/DeletePost.jsx";

function timeDifference(isoString) {
    const moment = require("moment");

    // ISO 8601 형식의 문자열을 Moment 객체로 변환
    const targetTime = moment(isoString);
    const now = moment();

    // 두 시간 차이를 초 단위로 계산
    const duration = moment.duration(now.diff(targetTime));

    // 초, 분, 시간, 일, , 월, 년 단위로 변환하여 객체에 저장
    const units = {
        년: duration.years(),
        개월: duration.months(),
        주: duration.weeks(),
        일: duration.days(),
        시간: duration.hours(),
        분: duration.minutes(),
        초: duration.seconds(),
    };

    // 가장 큰 단위부터 순차적으로 확인하여 출력
    for (const unit in units) {
        if (units[unit] > 0) {
            return `${units[unit]} ${unit} 전`;
        }
    }

    return "방금 전";
}

function Post() {
    const { postId } = useParams();

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log(error));
    }, [postId]); // URL이 변경되면 useParams가 다시 호출되어 postId 값이 변경 > useEffect 동작 > 리렌더링(가상 DOM Diffing)

    const [showDeleted, setShowDeleted] = useState(false);
    const handleDelete = () => {
        setShowDeleted(true); // 삭제 버튼 클릭 시 showDeleted 상태를 true로 변경
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
                        {/* 옵셔널 체이닝, 단축 평가 */}
                        <h1>{data.post?.[0].title || "no data"}</h1>
                    </div>
                    <div id={styles.dataManagementContainer}>
                        <Link className={styles.dataManagementLink}>통계</Link>
                        <Link className={styles.dataManagementLink}>수정</Link>
                        <button onClick={handleDelete}>삭제</button>
                    </div>
                    <div id={styles.postMetaContainer}>
                        <div id={styles.metaDataContainer}>
                            <Link className={styles.dataManagementLink}>
                                {data.user?.[0]?.username || "no data"}
                            </Link>
                            <div className={styles.separator}>·</div>
                            <Link className={styles.metaDataLink}>
                                {timeDifference(data.post?.[0]?.created_at) ||
                                    "no data"}
                            </Link>
                            <div className={styles.separator}>·</div>
                            <Link className={styles.private}>비공개</Link>
                        </div>
                        <div>
                            좋아요 수:
                            {data.post?.[0]?.likes === 0
                                ? " 0"
                                : data.post?.[0]?.likes || " no data"}
                        </div>
                    </div>
                    <div id={styles.tagWrapper}>
                        {data.tags?.map((tags, index) => (
                            <Link
                                className={styles.tag}
                                key={index}
                                id={styles.tag}
                            >
                                {data?.tags?.[index]?.tag_name}
                                {console.log("index", index)}
                                {console.log("tag", tags)}
                            </Link>
                        ))}
                    </div>
                </div>
                <div id={styles.postContentContainer}>
                    <div>{data.post?.[0].content}</div>
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
