import { React, useState } from "react";
import { Link } from "react-router-dom";
import header from "./styles/header.module.css";

function Header() {
    // Data for menu items and themes
    const menuItems = [
        { label: "커뮤니티", to: "/" },
        { label: "체크", to: "check" },
        { label: "NotFound", to: "/notFound" },
    ];

    const themaItems = [
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
            themaName: "white",
            mainBackgroundColor: "white",
            mainLineColor: "rgb(212, 212, 212)",
            elementColor1: "rgb(246, 246, 248)", // 로그인 및 배경
            elementColorHover1: "rgb(236, 236, 238)",
            elementColor2: "rgb(238, 238, 238)", // 회원가입, 버튼 요소
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

                        {/* onClick 이벤트 핸들러를 할당하지만 사용하지 않습니다. */}

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
                            to="/"
                        >
                            <div>회원가입</div>
                        </Link>
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
