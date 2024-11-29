// App.js
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

import "./src/styles/normalize.css";
import "./src/styles/global-styles.css";
import "./src/styles/google-fonts.css";

import Header from "./src/commponent/header";
import Footer from "./src/commponent/footer";
import Main from "./src/pages/main";
import Login from "./src/pages/login";
import Check from "./src/pages/check";
import NotFound from "./src/pages/notFound";
import Post from "./src/pages/post";
import CreatePost from "./src/pages/createPost";
import UpdatePost from "./src/pages/updatePost";
import TestPage from "./src/pages/testPage";

import { AuthProvider } from "./src/context/AuthContext";
import ProtectedPage from "./src/commponent/ProtectedPage";

function App() {
    return (
        <AuthProvider>
            <HashRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/check" element={<Check />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/notFound" element={<NotFound />} />
                    <Route path="/board" element={<Main />} />
                    <Route path="/board/post/:postId" element={<Post />} />
                    <Route path="/board/create" element={<CreatePost />} />
                    <Route
                        path="/board/update/:postId"
                        element={<UpdatePost />}
                    />
                    <Route path="/testPage" element={<TestPage></TestPage>} />
                    <Route path="/protected" element={<ProtectedPage />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
