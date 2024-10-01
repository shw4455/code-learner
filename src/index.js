import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./styles/normalize.css";
import "./styles/global-styles.css";
import "./styles/google-fonts.css";
import Main from "./main";
import Login from "./login";
import Check from "./check";
import NotFound from "./notFound";

import Header from "./header";
import Footer from "./footer";
import Post from "./post";
import CreatePost from "./createPost";
import UpdatePost from "./updatePost";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <HashRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/check" element={<Check />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notFound" element={<NotFound />} />
                <Route path="/board" element={<Main />} />
                <Route path="/board/post/:postId" element={<Post />} />
                <Route path="/board/create" element={<CreatePost />} />
                <Route path="/board/update/:postId" element={<UpdatePost />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <Footer></Footer>
        </HashRouter>
    </React.StrictMode>
);

reportWebVitals();
