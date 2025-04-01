import React, { useEffect, useState } from "react";
import styles from "./styles/testPage.module.css";
import axios from "axios";
import { useAuth } from "./context/AuthContext.js";
import NoticeBoard from "./commponent/NoticeBoard.jsx";

function MyPosts() {
    const { user } = useAuth();
    const userId = user?.id;
    const [myPosts, setMyPosts] = useState([]); // 전체 게시물

    const [filteredPosts, setfilteredPosts] = useState([]); // 태그로 필터링 된 게시글

    const [postsPerPage, setPostsPerPage] = useState(10); // 기본 게시글 수 ● 10에서 1로 바꿔둔 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

    const [tagInput, setTagInput] = useState(""); // 태그 입력 상태

    const [error, setError] = useState(false);
    const [tags, setTags] = useState([]);

    const currentData = filteredPosts.length > 0 ? filteredPosts : myPosts;

    // 현재 페이지에서 표시할 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = myPosts.slice(indexOfFirstPost, indexOfLastPost);

    // 다음 페이지로 이동할 수 있는지 확인
    const canGoNextPage = indexOfLastPost < myPosts.length;

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
                response = await axios.get(
                    `http://localhost:3001/api/my-posts`,
                    {
                        params: { userId: user?.id }, // React의 상태 업데이트(setState)는 비동기적으로 동작하기 때문에 로컬 변수에 값을 넣고, 그걸로 set과 요청을 해준다
                    }
                );
            } else {
                response = await axios.get(
                    `http://localhost:3001/api/my-posts`,
                    {
                        params: { userId: user?.id, tags: newTags },
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

    useEffect(() => {
        const fetchMyPosts = async () => {
            if (!user) return; // 로그인 확인

            try {
                const response = await axios.get(
                    "http://localhost:3001/api/my-posts",
                    {
                        params: { userId: user?.id },
                    }
                );
                setMyPosts(response.data);
                {
                    console.log(response.data);
                }
            } catch (error) {
                console.error("내 게시글 가져오기 실패", error);
            }
        };
        fetchMyPosts();
    }, [user]);
    return (
        <NoticeBoard
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            currentData={currentData}
        ></NoticeBoard>
    );
}

export default MyPosts;
