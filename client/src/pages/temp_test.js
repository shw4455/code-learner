import { React, useState } from "react";
import { Link } from "react-router-dom";
import header from "./styles/header.module.css";

function Header() {
  const menuItems = [
    { label: "홈", to: "/" },
    { label: "체크", to: "check" },
    { label: "NotFound", to: "/notFound" },
    { label: "메뉴2", to: "/" },
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
  const [searchTerm, setSearchTerm] = useState("");
  const [themaState, setThemaState] = useState(0);

  // 빈 함수를 할당하여 onClick 이벤트 핸들러를 만듭니다.
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
    // 원하는 테마의 상태값을 받아와서
    const currentThema = themaItems[themaState];

    // 객체 형태로 만들어주고
    const styles = {
      "--main-background-color": currentThema.mainBackgroundColor,
      "--main-line-color": currentThema.mainLineColor,
      "--element-color-gray": currentThema.elementColor1,
      "--element-color-gray-hover": currentThema.elementColorHover1,
      "--element-color-blue": currentThema.elementColor2,
      "--element-color-blue-hover": currentThema.elementColorHover2,
      "--font-color": currentThema.fontColor,
    };

    // 객체를 배열로 만들어준 뒤, 각각에 대해서, 연산을 수행
    Object.entries(styles).forEach(([property, value]) => {
      document.documentElement.style.setProperty(property, value);
    });
  };

  const themaBtnClicked = () => {
    // 상태값 수정
    setThemaState((prevThemaState) => (prevThemaState === 0 ? 1 : 0));

    // themaState가 0이면 1, 1이면 0을 반환 받음
    const updatedThemaState = themaState === 1 ? 0 : 1;
    // 수정된 상태값 적용
    applyThemaStyles(updatedThemaState);
  };

  return (
    <header id={header.header}>
      <div id={header["nav-container"]}>
        {/* nav가 있는 이유는 양 옆으로 나눠주기 위함 */}
        <nav>
          <div className={header.left}>
            <li className={header["list-element"]}>
              <a className={header.logo} href="#">
                Code Learner
              </a>
            </li>
            {menuItems.map((item, index) => (
              <li key={index} className={header["list-element"]}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </div>
        </nav>
        <nav>
          <div className={`${header.right} ${header["list-element"]}`}>
            <div id={header["search-bar"]}>
              <button
                className={header["search-button"]}
                onClick={handleButtonClick}
              >
                <i className="material-symbols-outlined gf-search-2">search</i>
              </button>
              <input
                id={header["search-input"]}
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleEnterPress}
              />{" "}
            </div>

            {/* onClick 이벤트 핸들러를 할당하지만 사용하지 않습니다. */}

            <Link
              id={header.signIn}
              className={`${header.button} ${header["list-element"]}`}
              to="/login"
            >
              <div>로그인</div>
            </Link>

            <Link
              id={header.signUp}
              className={`${header.button} ${header["list-element"]}`}
              to="/"
            >
              <div>회원가입</div>
            </Link>
            <span className={header["thema-btn"]}>
              <input
                id="switch"
                type="checkbox"
                onClick={() => themaBtnClicked()}
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
