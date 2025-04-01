// App.js
import React, { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./styles/normalize.css";
import "./styles/global-styles.css";
import "./styles/google-fonts.css";

import Header from "./header";
import Footer from "./footer";
import Main from "./main";
import Login from "./login";
import Check from "./check";
import NotFound from "./notFound";
import Post from "./post";
import CreatePost from "./createPost";
import UpdatePost from "./updatePost";
import TestPage from "./testPage";
import myPosts from "./myPosts";
import myComments from "./myComments";

import { AuthProvider } from "./context/AuthContext";
import ProtectedPage from "./commponent/ProtectedPage";

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
                    <Route path="/testPage2" element={<myPosts></myPosts>} />
                    <Route path="/testPage3" element={<myComments></myComments>} />
                    <Route path="/protected" element={<ProtectedPage />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
