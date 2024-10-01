import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function timeDifference(isoString) {
    const moment = require("moment");

    // ISO 8601 형식의 문자열을 Moment 객체로 변환
    const targetTime = moment(isoString);
    const now = moment();

    // 두 시간 차이를 초 단위로 계산
    const duration = moment.duration(now.diff(targetTime));

    // 초, 분, 시간, 일, , 월, 년 단위로 변환하여 객체에 저장
    const units = {
        년: duration.years(),
        개월: duration.months(),
        주: duration.weeks(),
        일: duration.days(),
        시간: duration.hours(),
        분: duration.minutes(),
        초: duration.seconds(),
    };

    // 가장 큰 단위부터 순차적으로 확인하여 출력
    for (const unit in units) {
        if (units[unit] > 0) {
            return `${units[unit]} ${unit} 전`;
        }
    }

    return "방금 전";
}

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
        fetch("http://localhost:3001/api/posts")
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
