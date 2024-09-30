import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles/deletePost.module.css";
const DeletePost = () => {
    const [data, setData] = useState({
        title: "",
        content: "",
    });

    const [error, setError] = useState(false); // ?

    // const navigate = useNavigate(); // ?

    // 데이터 불러오기
    const { postId } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) => setData(data.post[0]))
            .catch((error) => console.log(error));
    }, [postId]);

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log("Create input change");
        console.log("data : ", data);
    };

    const handleClick = async (e) => {
        try {
            await axios.put(`http://localhost:3001/api/post/${postId}`, data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalBackground}></div>
            <div className={styles.modal}>
                <h3>포스트 삭제</h3>
                <p className={styles.message}>정말로 삭제하시겠습니까?</p>
                <div className={styles.buttonGroup}>
                    <button className={styles.cancelButton}>취소</button>
                    <button className={styles.confirmButton}>확인</button>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;
