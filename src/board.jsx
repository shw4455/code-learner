import React, { useEffect, useState } from "react";
import styles from "./styles/board.module.css";
import NoticeBoard from "./commponent/NoticeBoard.jsx";
import { Link } from "react-router-dom";

function Board() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [postsPerPage, setPostsPerPage] = useState(10); // 기본 게시글 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

    const [tagInput, setTagInput] = useState(""); // 태그 입력 상태

    const [error, setError] = useState(false);
    const [post, setPost] = useState({
        tags: [
            "테스트",
            "한국어입니다",
            "한국어입니다한국어입니다",
            "한국어입니다",
            "한국어입니다한국어입니다",
            "한국어입니다",
            "한국어입니다한국어입니다",
            "한국어입니다",
            "한국어입니다한국어입니다",
        ], // 태그 데이터 추가
    });

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

    const handleButtonClick = () => {
        console.log("search-button clicked");
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        console.log("search-input : " + event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            console.log("search-input : Enter pressed");
        }
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
                        {post.tags.map((tag, index) => (
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

                <div className={styles.searchBar}>
                    <button
                        className={styles.searchButton}
                        onClick={handleButtonClick}
                    >
                        <i className="material-symbols-outlined gf-search-1">
                            search
                        </i>
                    </button>

                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="태그 내 검색"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterPress}
                    />
                </div>
                <div id={styles.pageContainer}>
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        <i className="material-icons">chevron_left</i>
                    </button>
                    <div className={styles.pageNumber}>
                        {currentPage} 페이지 /{" "}
                        {Math.ceil(posts.length / postsPerPage)} 페이지
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
            />
        </div>
    );
}

export default Board;
