import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function ProtectedPage() {
    const { token, user } = useAuth();
    const [protectedData, setProtectedData] = useState(null);

    useEffect(() => {
        if (token) {
            fetch("http://localhost:3001/api/protected", {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((response) => response.json())
                .then((data) => setProtectedData(data))
                .catch((error) =>
                    console.error("Error fetching protected data:", error)
                );
        }
    }, [token]);

    return (
        <div>
            <h1>보호된 페이지</h1>
            <h1>보호된 페이지</h1>
            {user ? (
                <p>안녕하세요, {user.username}님!</p>
            ) : (
                <p>로그인이 필요합니다.</p>
            )}
            {protectedData && (
                <pre>{JSON.stringify(protectedData, null, 2)}</pre>
            )}

            
        </div>
    );
}

export default ProtectedPage;
