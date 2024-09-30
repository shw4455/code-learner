import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles/deletePost.module.css";

const DeletePost = (props) => {
    const navigate = useNavigate();
    const postId = props.postId;

    const onConfirm = async (e) => {
        try {
            await axios
                .delete(`http://localhost:3001/api/post/${postId}`)
                .then(navigate("/"));
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
