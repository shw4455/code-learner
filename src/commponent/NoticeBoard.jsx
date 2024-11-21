import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function timeDifference(isoString) {
    const targetTime = moment(isoString);
    const now = moment();
    const duration = moment.duration(now.diff(targetTime));

    const units = {
        년: duration.years(),
        개월: duration.months(),
        주: duration.weeks(),
        일: duration.days(),
        시간: duration.hours(),
        분: duration.minutes(),
        초: duration.seconds(),
    };

    for (const unit in units) {
        if (units[unit] > 0) {
            return `${units[unit]} ${unit} 전`;
        }
    }

    return "방금 전";
}

function App({ postsPerPage = 10, currentPage = 1 }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/posts")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log(error));
    }, []);

    // 현재 페이지에 맞는 게시글 슬라이스
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    // 조회수 증가 핸들러 함수
    const handleViewIncrement = (postId) => {
        axios
            .put(`http://localhost:3001/api/posts/${postId}/view`)
            .then(() =>
                console.log(`View count incremented for post ${postId}`)
            )
            .catch((error) =>
                console.error("Error incrementing view count:", error)
            );
    };

    return (
        <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>제목</th>
                            <th>작성자</th>
                            <th>날짜</th>
                            <th>조회수</th>
                            <th>추천수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPosts.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <Link
                                        to={`/board/post/${item.id}`}
                                        onClick={() =>
                                            handleViewIncrement(item.id)
                                        }
                                    >
                                        {item.title}
                                    </Link>
                                </td>
                                <td>{item.username}</td>
                                {console.log(item.username)}
                                <td>{timeDifference(item.created_at)}</td>
                                <td>{item.views}</td>
                                <td>{item.likes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default App;
