import { React, useState } from "react";
import tag from "./tag.module.css";

function Tag(props) {
  const languages = [
    { id: "HTML", src: require("../img/HTML.png") },
    { id: "CSS", src: require("../img/CSS.png") },
    { id: "JavaScript", src: require("../img/JavaScript.png") },
    { id: "React", src: require("../img/react.png") },
    { id: "TEST1", src: require("../img/react.png") },
    { id: "TEST2", src: require("../img/react.png") },
    { id: "TEST3", src: require("../img/react.png") },

    // 리액트 대신 다른걸 넣어도 되겠죠?
  ];

  const majors = [
    { id: "웹" },
    { id: "앱" },
    { id: "프론트" },
    { id: "벡엔드" },
    { id: "테스트1" },
    { id: "테스트2" },
    { id: "테스트3" },
  ];

  const [lansStates, setLansStates] = useState([]);
  const [majsStates, setMajsStates] = useState([]);
  const [sideBtnState, setSideBtnState] = useState(0);

  const lanClicked = (keyValue) => {
    const updatedLansStates = [...lansStates];

    if (updatedLansStates.includes(keyValue)) {
      updatedLansStates.splice(updatedLansStates.indexOf(keyValue), 1);
    } else {
      updatedLansStates.push(keyValue);
    }
    setLansStates(updatedLansStates);
    console.log("lansStates : " + updatedLansStates);
  };

  const majClicked = (keyValue) => {
    const updatedMajsStates = [...majsStates];

    if (updatedMajsStates.includes(keyValue)) {
      updatedMajsStates.splice(updatedMajsStates.indexOf(keyValue), 1);
    } else {
      updatedMajsStates.push(keyValue);
    }
    setMajsStates(updatedMajsStates);
    console.log("majsStates : " + updatedMajsStates);
  };

  const sideBtnClicked = () => {
    // 이전 상태값을 받아서 초기화
    setSideBtnState((prevSideBtnState) => (prevSideBtnState === 0 ? 1 : 0));
  };

  return (
    <div id={tag.container}>
      <div id={tag.sidebarButtonContainer}>
        <button id={tag.sidebarButton} onClick={sideBtnClicked}>
          <i
            className={`${["material-icons"]} ${["gf-arrow-1"]} ${
              sideBtnState ? ["icon-rotated"] : ""
            }`}
          >
            chevron_left
          </i>
        </button>
      </div>
      <div
        className={`${tag.languagesContainer} ${
          sideBtnState ? tag.languagesContainerOpened : ""
        }`}
      >
        <div className={tag.text}>Languages</div>
        <div
          className={`${tag.languagesButton} ${
            sideBtnState ? tag.languagesButtonOpened : ""
          }`}
        >
          {languages.map((image) => (
            <li key={image.id}>
              <img
                className={`${tag.languageImage} ${
                  lansStates.includes(image.id) ? tag.outlined : ""
                } ${
                  lansStates.includes(image.id) || sideBtnState
                    ? tag.languageImageOpened
                    : ""
                }`} // 처음/다시 누르면 없다가, 클릭하면 lansStates 에 추가되어 스타일이 생긴다
                src={image.src}
                onClick={() => lanClicked(image.id)}
                alt={image.id}
              />
            </li>
          ))}
        </div>
        <div className={tag.text}>Majors</div>
        <div
          className={`${tag.tagButton} ${
            sideBtnState ? tag.tagButtonOpened : ""
          }`}
        >
          {majors.map((major) => (
            <button
              key={major.id}
              onClick={() => majClicked(major.id)}
              alt={major.id}
              className={`${tag.majorArea} ${
                majsStates.includes(major.id) ? tag.outlined : ""
              } ${
                majsStates.includes(major.id) || sideBtnState
                  ? tag.majorAreaOpened
                  : ""
              }`}
            >
              #{major.id}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tag;
