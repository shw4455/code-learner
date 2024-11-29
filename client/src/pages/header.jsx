import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // AuthContext에서 useAuth 훅 가져오기
import header from "./header.module.css";

function Header() {
    // Data for menu items and themes
    const { user, logout } = useAuth(); // user 값과 logout 함수 가져오기
    const menuItems = [
        { label: "게시판", to: "/board" },
        { label: "체크", to: "check" },
        { label: "NotFound", to: "/notFound" },
        { label: "testPage", to: "/testPage" },
    ];

    const themaItems = [
        // themaName: 테마명
        // mainBackgroundColor: 기본 배경색상
        // mainLineColor: 기본 라인색상
        // elementColor1: 요소색상 ex) Header 로그인 버튼
        // elementColorHover1: 요소색상 Hover
        // elementColor2: 요소색상 ex) Header 회원가입 버튼
        // elementColorHover2: 요소색상 Hover
        // fontColor: 기본 글자색상
        {
            themaName: "darkblue",
            mainBackgroundColor: "rgb(31, 41,55)",
            mainLineColor: "rgba(107, 114, 128, 0.3)",
            elementColor1: "rgb(55, 65, 81)",
            elementColorHover1: "rgb(75, 85, 99)",
            elementColor2: "rgb(0, 144, 249)",
            elementColorHover2: "rgb(11, 127, 211)",
            fontColor: "white",
        },
        {
            themaName: "dark",
            mainBackgroundColor: "rgb(18, 18, 18)",
            mainLineColor: "rgb(52, 58, 64)",
            elementColor1: "rgb(30, 30, 30)",
            elementColorHover1: "rgb(50, 50, 50)",
            elementColor2: "rgb(50, 50, 50)",
            elementColorHover2: "rgb(70, 70, 70)",
            fontColor: "white",
        },
        {
            themaName: "white",
            mainBackgroundColor: "white",
            mainLineColor: "rgb(212, 212, 212)",
            elementColor1: "rgb(246, 246, 248)",
            elementColorHover1: "rgb(236, 236, 238)",
            elementColor2: "rgb(238, 238, 238)",
            elementColorHover2: "rgb(233, 233, 233)",
            fontColor: "black",
        },
    ];

    // State variables for search term and theme
    const [searchTerm, setSearchTerm] = useState("");
    const [themaState, setThemaState] = useState(0);

    // Event handler functions
    const handleButtonClick = () => {
        console.log("search-button clicked");
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        console.log("search-input : " + event.target.value);
    };

    const handleEnterPress = (event) => {
        if (event.key === "Enter") {
            console.log("search-input : Enter pressed");
        }
    };

    const applyThemaStyles = (themaState) => {
        // Access the desired theme data based on the state
        const currentThema = themaItems[themaState];

        // Update CSS variables directly on document elements
        document.documentElement.style.setProperty(
            "--main-background-color",
            currentThema.mainBackgroundColor
        );
        document.documentElement.style.setProperty(
            "--main-line-color",
            currentThema.mainLineColor
        );
        document.documentElement.style.setProperty(
            "--element-color-gray",
            currentThema.elementColor1
        );
        document.documentElement.style.setProperty(
            "--element-color-gray-hover",
            currentThema.elementColorHover1
        );
        document.documentElement.style.setProperty(
            "--element-color-blue",
            currentThema.elementColor2
        );
        document.documentElement.style.setProperty(
            "--element-color-blue-hover",
            currentThema.elementColorHover2
        );
        document.documentElement.style.setProperty(
            "--font-color",
            currentThema.fontColor
        );
    };

    const themaBtnClicked = () => {
        // Toggle theme state and apply styles
        const updatedThemaState = themaState === 1 ? 0 : 1;
        setThemaState(updatedThemaState);
        applyThemaStyles(updatedThemaState);
    };
    return (
        <header id={header.header}>
            <div id={header.navContainer}>
                {/* nav가 있는 이유는 양 옆으로 나눠주기 위함 */}
                <nav>
                    <div className={header.left}>
                        <li className={header.listElement}>
                            <a className={header.logo} href="#">
                                Code Learner
                            </a>
                        </li>
                        {menuItems.map((item, index) => (
                            <li key={index} className={header.listElement}>
                                <Link to={item.to}>{item.label}</Link>
                            </li>
                        ))}
                    </div>
                </nav>
                <nav>
                    <div className={`${header.right} ${header.listElement}`}>
                        <div id={header.searchBar}>
                            <button
                                className={header.searchButton}
                                onClick={handleButtonClick}
                            >
                                <i className="material-symbols-outlined gf-search-2">
                                    search
                                </i>
                            </button>
                            <input
                                id={header.searchInput}
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={searchTerm}
                                onChange={handleInputChange}
                                onKeyDown={handleEnterPress}
                            />
                        </div>

                        {/* user 값에 따라 동적으로 렌더링 */}
                        <div id={header.login}>
                            {user ? (
                                <>
                                    <span>{user.username}님 안녕하세요</span>
                                    <button onClick={logout}>로그아웃</button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        id={header.signIn}
                                        className={`${header.button} ${header.listElement}`}
                                        to="/login"
                                    >
                                        <div>로그인</div>
                                    </Link>
                                    <Link
                                        id={header.signUp}
                                        className={`${header.button} ${header.listElement}`}
                                        to="/register"
                                    >
                                        <div>회원가입</div>
                                    </Link>
                                </>
                            )}
                        </div>

                        <span className={header.themaBtn}>
                            <input
                                id="switch"
                                type="checkbox"
                                onClick={themaBtnClicked}
                            />
                            <label htmlFor="switch"></label>
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
}
export default Header;
