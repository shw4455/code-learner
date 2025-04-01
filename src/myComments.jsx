import React, { useEffect, useState } from "react";
import styles from "./styles/testPage.module.css";
import axios from "axios";
import { useAuth } from "./context/AuthContext.js";
function myComments() {
    const { user } = useAuth();

    const userId = user?.id;

    const [MyPosts, setMyPosts] = useState([]); // 전체 댓글
    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!user) return; // 로그인 확인

            try {
                const response = await axios.get(
                    "http://localhost:3001/api/my-comments",
                    {
                        params: { userId: user?.id },
                    }
                );
                setMyPosts(response.data);
                {
                    console.log(response.data);
                }
            } catch (error) {
                console.error("내 댓글 가져오기 실패", error);
            }
        };
        fetchMyPosts();
    }, [user]);
    return (
        <div className={styles.container}>
            {console.log("내 유저 아이디", userId)}
        </div>
    );
}

export default myComments;
