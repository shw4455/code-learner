import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
    const [data, setData] = useState([
        {
            id: 1,
            title: "첫 번째 게시글",
            author: "홍길동",
            content: "간단한 소개글입니다.",
        },
    ]);

    useEffect(() => {
        fetch("http://localhost:3001/api/data")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            {/* <div id={styles.tableContainer}> */}
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
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <Link to={`/board/post/${item.id}`}>
                                    <td>{item.title}</td>
                                </Link>
                                <td>{item.author}</td>
                                <td>{item.created_at}</td>
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
