import React, { useEffect, useState } from "react";
import styles from "./styles/testPage.module.css";
import axios from "axios";
import { useAuth } from "./context/AuthContext.js";

function MyComments() {
    const { user } = useAuth();
    const userId = user?.id;

    const [myComments, setMyComments] = useState([]);

    useEffect(() => {
        const fetchMyComments = async () => {
            if (!userId) return;

            try {
                const response = await axios.get(
                    "http://localhost:3001/api/my-comments",
                    {
                        params: { userId: userId },
                    }
                );
                setMyComments(response.data);
            } catch (error) {
                console.error("내 댓글 가져오기 실패", error);
            }
        };

        fetchMyComments();
    }, [userId]);

    return (
        <div className={styles.container}>
            <h2>내가 작성한 댓글</h2>
            <ul>
                {myComments.map((comment) => (
                    <li key={comment.id}>
                        <p>
                            <strong>작성자:</strong> {comment.username}
                        </p>
                        <p>
                            <strong>게시글:</strong> {comment.post_title}
                        </p>
                        <p>
                            <strong>내용:</strong> {comment.content}
                        </p>
                        <p>
                            <strong>작성일:</strong>{" "}
                            {new Date(comment.created_at).toLocaleString()}
                        </p>
                        <hr />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyComments;
