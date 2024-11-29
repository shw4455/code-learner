// src/components/Search.js
import React, { useState, useEffect } from "react";

const Search = () => {
    const [query, setQuery] = useState(""); // 검색어 상태
    const [results, setResults] = useState([]); // 검색 결과 상태
    const [error, setError] = useState(null); // 에러 상태

    useEffect(() => {
        if (!query) {
            setResults([]); // 검색어가 없을 경우 결과 초기화
            setError(null); // 에러 초기화
            return;
        }

        const timeoutId = setTimeout(() => {
            fetch(`http://localhost:3001/search?query=${query}`) // 백엔드 포트 맞춤
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No matching results or server error");
                    }
                    return response.json();
                })
                .then((data) => {
                    setResults(data);
                    setError(null); // 에러 초기화
                })
                .catch((err) => {
                    setError(err.message);
                    setResults([]);
                });
        }, 300); // Debounce: 300ms

        return () => clearTimeout(timeoutId); // 이전 요청 취소
    }, [query]);

    return (
        <div>
            <h1>Search Posts</h1>
            <input
                type="text"
                placeholder="Search by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)} // 검색어 입력
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {results.map((result) => (
                    <li key={result.id}>
                        <h3>{result.title}</h3>
                        <p>{result.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Search;
