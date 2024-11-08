import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // AuthContext에서 사용자 정보 가져오기
import styles from "./styles/updatePost.module.css";
import Button from "./commponent/Button";

const UpdatePost = () => {
    const { postId } = useParams();
    const { user } = useAuth(); // 로그인된 사용자 정보 가져오기
    const [data, setData] = useState({
        title: "",
        content: "",
    });
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    // 데이터 불러오기 및 권한 확인
    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.post) {
                    setData(data.post);
                    if (data.post.user_id !== user.id) {
                        alert("You are not authorized to edit this post.");
                        navigate("/"); // 권한이 없으면 홈으로 리다이렉트
                    }
                } else {
                    setData({ title: "", content: "" });
                }
            })
            .catch((error) => console.log(error));
    }, [postId, user, navigate]);

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log("Create input change");
        console.log("data : ", data);
    };

    const handleUpdate = async (e) => {
        try {
            await axios.put(`http://localhost:3001/api/post/${postId}`, data);
            navigate(`/board/post/${postId}`); // 수정 후 게시글 페이지로 이동
        } catch (err) {
            console.log(err);
            setError(true); // 에러 상태 업데이트
        }
    };

    return (
        <div className={styles.createContainer}>
            <div id={styles.container}>
                <div id={styles.main}>
                    <div id={styles.titleContainer}>
                        <input
                            id={styles.titleInput}
                            type="text"
                            placeholder="Book title"
                            name="title"
                            onChange={handleChange}
                            value={data.title || "no data"}
                        />
                    </div>
                    <hr className={styles.divider}></hr>
                    <div id={styles.postContentContainer}>
                        <textarea
                            rows={5}
                            type="text"
                            placeholder="Book desc"
                            name="content"
                            onChange={handleChange}
                            value={data.content || "no data"}
                        />
                    </div>
                    <hr></hr>
                    <div className={styles.buttonWrapper}>
                        <Button
                            onClick={handleUpdate}
                            buttonText={"수정하기"}
                        />
                        {error && "Something went wrong!"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;
