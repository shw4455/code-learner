// src/components/Profile.js
import React from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>프로필</h1>
            {user ? (
                <>
                    <p>안녕하세요, {user.username}님!</p>
                    <button onClick={logout}>로그아웃</button>
                </>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
        </div>
    );
}

export default Profile;
