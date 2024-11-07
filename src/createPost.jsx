import React, { useEffect, useState } from "react";
import styles from "./styles/createPost.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeletePost from "./commponent/DeletePost.jsx";
import axios from "axios";
import Button from "./commponent/Button.jsx";
import { useAuth } from "./context/AuthContext"; // AuthContext에서 useAuth 훅 가져오기

function CreatePost() {
    const { postId } = useParams();
    const { user } = useAuth(); // 로그인된 사용자 정보 가져오기

    const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 가져오기
    const [post, setPost] = useState({
        title: "",
        content: "",
        user_id: user ? user.id : "", // user_id 초기값을 로그인된 사용자 ID로 설정
    });
    const [error, setError] = useState(false);

    // 로그인되지 않았을 경우 경고 메시지를 띄우고 이전 페이지로 이동
    useEffect(() => {
        if (!user) {
            alert(
                "로그인이 필요합니다. 로그인 후에 게시글을 작성할 수 있습니다."
            );
            navigate(-1); // 이전 페이지로 이동
            return; // 실행 종료
        }

        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    }, [user, navigate, postId]); // 종속성 배열에 user, navigate, postId 추가

    const [showDeleted, setShowDeleted] = useState(false);
    const handleDelete = () => {
        setShowDeleted(true); // 삭제 버튼 클릭 시 showDeleted 상태를 true로 변경
    };
    const handleCancel = () => {
        setShowDeleted(false);
    };
    const handleChange = (e) => {
        setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log("Create input change");
        console.log("post : ", post);
    };

    const handleClick = async (e) => {
        try {
            await axios
                .post("http://localhost:3001/api/post", post)
                .then(() => navigate("/"));
        } catch (err) {
            console.log(err);
            setError(true); // 에러 상태 업데이트
        }
    };

    return (
        <div id={styles.container}>
            <div id={styles.main}>
                <div id={styles.titleContainer}>
                    <input
                        id={styles.titleInput}
                        type="text"
                        placeholder="제목을 입력하세요"
                        name="title"
                        onChange={handleChange}
                        disabled={!user} // 로그인되지 않은 경우 입력 비활성화
                    />
                </div>
                <hr className={styles.divider}></hr>
                <div id={styles.postContentContainer}>
                    <textarea
                        rows={10}
                        type="text"
                        placeholder="본문을 입력하세요."
                        name="content"
                        onChange={handleChange}
                        disabled={!user} // 로그인되지 않은 경우 입력 비활성화
                    />
                </div>
                <hr></hr>
                <div className={styles.buttonWrapper}>
                    {user ? (
                        <Button onClick={handleClick} buttonText={"작성하기"} />
                    ) : (
                        <p>로그인 후에 게시글을 작성할 수 있습니다.</p>
                    )}
                    {error && "Something went wrong!"}
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
