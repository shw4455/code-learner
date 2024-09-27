import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles/createPost.module.css";

const CreatePost = () => {
    // const [post, setPost] = useState({
    //     title: "",
    //     content: "",
    // });

    const [post, setPost] = useState({
        title: "222",
        content: "222",
    });

    const [error, setError] = useState(false); // ?

    const navigate = useNavigate(); // ?

    const handleChange = (e) => {
        setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        console.log("Create input change");
        console.log("post : ", post);
    };

    const handleClick = async (e) => {
        try {
            await axios.post("http://localhost:3001/api/post", post);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.createContainer}>
            <div className={styles.form}>
                <h1>CreatePost New Book</h1>
                <input
                    type="text"
                    placeholder="Book title"
                    name="title"
                    onChange={handleChange}
                />
                <textarea
                    rows={5}
                    type="text"
                    placeholder="Book desc"
                    name="content"
                    onChange={handleChange}
                />
                <button onClick={handleClick}>CreatePost</button>
                {error && "Something went wrong!"}
                <Link to="/board">See all books</Link>
            </div>
        </div>
    );
};

export default CreatePost;
