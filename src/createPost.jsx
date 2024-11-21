import React, { useEffect, useState } from "react";
import styles from "./styles/createPost.module.css";
import { useNavigate, useParams } from "react-router-dom";
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
        tags: [], // 태그 데이터 추가
        user_id: user ? user.id : "", // user_id 초기값을 로그인된 사용자 ID로 설정
    });
    const [tagInput, setTagInput] = useState(""); // 태그 입력 상태
    const [error, setError] = useState(false);

    useEffect(() => {
        if (error) {
            alert(error);
            setError(""); // 에러 메시지 초기화
        }

        return; // 실행 종료
    });

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

    // 입력 필드 상태 업데이트
    const handleChange = (e) => {
        setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // 태그 추가
    const handleTagAdd = () => {
        if (!tagInput.trim()) return; // 빈 입력 방지
        if (post.tags.length >= 10) {
            setError("태그는 최대 10개까지 입력 가능합니다."); // 태그 개수 제한
            return;
        }
        if (post.tags.includes(tagInput.trim())) {
            setError("이미 추가된 태그입니다."); // 중복 태그 방지
            return;
        }
        if (tagInput.trim()) {
            setPost((prev) => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()],
            }));
            setTagInput(""); // 입력 필드 초기화
            setError(""); // 에러 메시지 초기화
            console.log("tagInput", tagInput);
            console.log("typeof tagInput", typeof tagInput);
        }
    };

    // 엔터 키로 태그 추가
    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 기본 동작(폼 제출 등) 방지
            handleTagAdd(); // 태그 추가 함수 호출
        }
    };

    // 태그 삭제
    const handleTagRemove = (tag) => {
        setPost((prev) => ({
            ...prev,
            tags: prev.tags.filter((t) => t !== tag),
        }));
    };

    const handleClick = async () => {
        try {
            // 게시글 작성 요청
            const response = await axios.post(
                "http://localhost:3001/api/post",
                {
                    title: post.title,
                    content: post.content,
                    user_id: post.user_id,
                }
            );

            const createdPostId = response.data.postId; // 서버에서 반환된 게시글 ID
            console.log("createdPostId", createdPostId);
            
            // 태그 전송 요청
            if (post.tags.length > 0) {
                await axios.post(
                    `http://localhost:3001/api/posts/${createdPostId}/tags`,
                    { tags: post.tags }
                );
            }

            alert("게시글이 성공적으로 작성되었습니다!");
            navigate("/"); // 게시글 작성 후 이동
        } catch (err) {
            console.error("게시글 작성 중 오류 발생:", err);
            setError("게시글 작성에 실패했습니다.");
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

                {/* 태그 입력 영역 */}
                <div id={styles.tagContainer}>
                    <div className={styles.tagInputWrapper}>
                        <input
                            className={styles.tagInput}
                            type="text"
                            placeholder="태그를 입력하고 Enter를 누르세요"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown} // Enter 키로 태그 추가
                            disabled={!user}
                        />
                    </div>
                    <div className={styles.tagsWrapper}>
                        {post.tags.map((tag, index) => (
                            <span
                                key={index}
                                className={styles.tag}
                                onClick={() => handleTagRemove(tag)}
                            >
                                {tag} ❌
                            </span>
                        ))}
                    </div>
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
