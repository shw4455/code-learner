import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles/createPost.module.css";

const UpdatePost = () => {
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
        <div className={styles.createContainer}>
            <div className={styles.form}>
                <h1>UpdatePost New Book</h1>
                <input
                    type="text"
                    placeholder="Book title"
                    name="title"
                    onChange={handleChange}
                    value={data.title || "no data"}
                />
                <textarea
                    rows={5}
                    type="text"
                    placeholder="Book desc"
                    name="content"
                    onChange={handleChange}
                    value={data.content || "no data"}
                />
                <button onClick={handleClick}>UpdatePost</button>
                {error && "Something went wrong!"}
                <Link to={`/board/post/${postId}`}>enter</Link>
            </div>
        </div>
    );
};

export default UpdatePost;
