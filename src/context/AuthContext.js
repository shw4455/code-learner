// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
        localStorage.setItem("token", token); // 토큰을 Local Storage에 저장
    };

    const logout = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token"); // 토큰 삭제
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
            {console.log("user", user)}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
