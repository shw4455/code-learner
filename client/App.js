// App.js
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
// import "./styles/normalize.css";
// import "./styles/global-styles.css";
// import "./styles/google-fonts.css";

import Header from "../src/header";
import Footer from "../src/footer";
import Main from "../src/main";
import Login from "../src/login";
import Check from "../src/check";
import NotFound from "../src/notFound";
import Post from "../src/post";
import CreatePost from "../src/createPost";
import UpdatePost from "../src/updatePost";
import TestPage from "../src/testPage";

import { AuthProvider } from "../src/context/AuthContext";
import ProtectedPage from "../src/commponent/ProtectedPage";

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
