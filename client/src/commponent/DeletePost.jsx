import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./deletePost.module.css";
import { useAuth } from "../context/AuthContext"; // AuthContext에서 로그인된 사용자 가져오기

const DeletePost = (props) => {
    const navigate = useNavigate();
    const { user } = useAuth(); // 현재 로그인한 사용자 정보 가져오기

    const onConfirm = async () => {
        if (!user) {
            alert("You must be logged in to delete this post.");
            return;
        }

        try {
            await axios.delete(
                `http://localhost:3001/api/post/${props.postId}`,
                {
                    data: { userId: user.id }, // userId를 함께 전송
                }
            );
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data.message) {
                alert(err.response.data.message);
            }
        }
    };

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalBackground}></div>
            <div className={styles.modal}>
                <h3>포스트 삭제</h3>
                <p className={styles.message}>정말로 삭제하시겠습니까?</p>
                <div className={styles.buttonGroup}>
                    <button
                        className={styles.cancelButton}
                        onClick={props.onCancel}
                    >
                        취소
                    </button>
                    <button
                        className={styles.confirmButton}
                        onClick={onConfirm}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePost;
