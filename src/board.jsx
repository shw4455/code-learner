import React, { useEffect, useState } from "react";
import styles from "./styles/board.module.css";
import NoticeBoard from "./commponent/NoticeBoard.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

function Board() {
    const [posts, setPosts] = useState([]); // 전체 게시물
    const [filteredPosts, setfilteredPosts] = useState([]); // 태그로 필터링 된 게시글

    const [postsPerPage, setPostsPerPage] = useState(1); // 기본 게시글 수 ● 10에서 1로 바꿔둔 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

    const [tagInput, setTagInput] = useState(""); // 태그 입력 상태

    const [error, setError] = useState(false);
    const [tags, setTags] = useState(["테그", "테그2"]);

    const majors = [
        { id: "웹" },
        { id: "앱" },
        { id: "123프론트" },
        { id: "벡엔드" },
    ];

    useEffect(() => {
        fetch(`http://localhost:3001/api/posts`)
            .then((response) => response.json())
            .then((data) => setPosts(data))
            .catch((error) => console.log(error));
    }, []);

    const currentData = filteredPosts.length > 0 ? filteredPosts : posts;

    // 현재 페이지에서 표시할 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // 다음 페이지로 이동할 수 있는지 확인
    const canGoNextPage = indexOfLastPost < posts.length;

    // 페이지 넘김 핸들러
    const handleNextPage = () => {
        if (canGoNextPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePostsPerPageChange = (event) => {
        setPostsPerPage(parseInt(event.target.value));
        setCurrentPage(1); // 게시글 수 변경 시 페이지를 첫 번째로 리셋
    };

    // 태그 수정
    const handleTagUpdate = async (newTags) => {
        setTags(newTags);
        setTagInput("");
        setError("");
        setCurrentPage(1); // 페이지 초기화

        try {
            let response;

            if (newTags.length < 1) {
                response = await axios.get(`http://localhost:3001/api/posts`, {
                    params: { tags: newTags }, // React의 상태 업데이트(setState)는 비동기적으로 동작하기 때문에 로컬 변수에 값을 넣고, 그걸로 set과 요청을 해준다
                });
            }
            else {
                response = await axios.get(
                    `http://localhost:3001/api/posts/tags`,
                    {
                        params: { tags: newTags },
                    }
                );
            }
            setfilteredPosts(response.data); // 검색 결과를 posts 상태에 업데이트
        } catch (error) {
            console.error("검색 요청 실패:", error);
            setError("검색 중 오류가 발생했습니다.");
        }
    };

    // 엔터 키로 태그 추가
    const handleTagKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault(); // 기본 동작 방지

            const trimmed = tagInput.trim();
            if (!trimmed || tags.includes(trimmed) || tags.length >= 10) return;

            const newTags = [...tags, trimmed];
            handleTagUpdate(newTags);
        }
    };

    // 태그 삭제
    const handleTagRemove = async (tag) => {
        const newTags = tags.filter((t) => t !== tag);
        handleTagUpdate(newTags);
    };
    return (
        <div id={styles.container}>
            <div id={styles.tagWrapper}>
                {/* 내가 처음에 작성했던 것 */}
                {/* majors.map((majors) => (
          <button className={styles.tagButton}>{majors.id}</button>
        )) */}

                {/* 수정된 코드, 보고 이해하고, 오답노트 */}
                <div id={styles.tagContainer}>
                    <div id={styles.tagInputWrapper}>
                        <div id={styles.tagInputContainer}>
                            <input
                                id={styles.tagInput}
                                type="text"
                                placeholder="태그를 입력하고 Enter를 누르세요"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagKeyDown} // Enter 키로 태그 추가
                            />
                        </div>
                    </div>
                    <div id={styles.tagsWrapper}>
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className={styles.tagButton}
                                onClick={() => handleTagRemove(tag)}
                            >
                                {tag} ❌
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div id={styles.elementContainer}>
                <select
                    className={styles.postsPerPageSelect}
                    value={postsPerPage}
                    onChange={handlePostsPerPageChange}
                >
                    <option value={10}>10개</option>
                    <option value={20}>20개</option>
                    <option value={30}>30개</option>
                </select>
                <button className={styles.smallButton}>
                    <i className="material-icons">swap_vert</i>
                    <div>최신순</div>
                </button>

                <div id={styles.pageContainer}>
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <i className="material-icons">chevron_left</i>
                    </button>
                    <div className={styles.pageNumber}>
                        {currentPage} 페이지 /{" "}
                        {Math.ceil(currentData.length / postsPerPage)} 페이지
                    </div>
                    <button onClick={handleNextPage} disabled={!canGoNextPage}>
                        <i className="material-icons">chevron_right</i>
                    </button>
                </div>
                <Link to="/board/create" className={styles.smallButton}>
                    작성하기
                </Link>
            </div>
            <NoticeBoard
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                currentData={currentData}
            />
        </div>
    );
}

export default Board;
