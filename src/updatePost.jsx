import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles/updatePost.module.css";
import Button from "./commponent/Button";

const UpdatePost = () => {
    const [data, setData] = useState({
        title: "",
        content: "",
    });

    const [error, setError] = useState(false); // ?

    const navigate = useNavigate(); // ?
    // navigate(/board/post/1);

    // 데이터 불러오기
    const { postId } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3001/api/posts/${postId}`)
            .then((response) => response.json())
            .then((data) =>  setData(data.post || { title: "", content: "" }))
            .catch((error) => console.log(error));
    }, [postId]);

    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log("Create input change");
        console.log("data : ", data);
    };

    const handleUpdate = async (e) => {
        try {
            await axios
                .put(`http://localhost:3001/api/post/${postId}`, data)
                .then(navigate(`/board/post/${postId}`));
        } catch (err) {
            console.log(err);
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
                        ></Button>
                        {error && "Something went wrong!"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePost;
