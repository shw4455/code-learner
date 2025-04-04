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
import TestPage1 from "./testPage1";
import MyPosts from "./myPosts";
import MyComments from "./myComments";

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
                    <Route path="/testPage1" element={<TestPage1></TestPage1>} />
                    <Route path="/testPage2" element={<MyPosts></MyPosts>} />
                    <Route path="/testPage3" element={<MyComments></MyComments>} />
                    <Route path="/protected" element={<ProtectedPage />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
                <Footer />
            </HashRouter>
        </AuthProvider>
    );
}

export default App;
