import React, { useState } from "react";
import { useAuth } from "./context/AuthContext.js"; // AuthContext에서 useAuth 훅 가져오기
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 useNavigate 가져오기

function Login() {
    const { login } = useAuth(); // 로그인 함수 가져오기
    const navigate = useNavigate(); // 페이지 이동 훅
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.token) {
                login(data.user, data.token); // 로그인 상태 업데이트
                navigate("/protected"); // 인증된 페이지로 이동
                alert("Login successful");
                console.log(data.user);
            } else {
                alert("Login failed: " + (data.error || "Unknown error"));
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login.");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
            />
            <button type="submit">로그인</button>
        </form>
    );
}

export default Login;
