import React, { useEffect, useState } from "react";
import styles from "./styles/createPost.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeletePost from "./commponent/DeletePost.jsx";
import axios from "axios";
import Button from "./commponent/Button.jsx";

function CreatePost() {
    const { postId } = useParams();

    const [post, setPost] = useState({
        title: "",
        content: "",
        user_id: "1",
    });
    const [error, setError] = useState(false); // ?
    const navigate = useNavigate(); // ?
    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .catch((error) => console.log(error));
    }, [postId]); // URL이 변경되면 useParams가 다시 호출되어 postId 값이 변경 > useEffect 동작 > 리렌더링(가상 DOM Diffing)

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
                .then(navigate("/"));
        } catch (err) {
            console.log(err);
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
                    />
                </div>
                <hr></hr>
                <div className={styles.buttonWrapper}>
                    <Button
                        onClick={handleClick}
                        buttonText={"작성하기"}
                    ></Button>
                    {error && "Something went wrong!"}
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
