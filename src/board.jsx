import { React, useState } from "react";
import styles from "./styles/board.module.css";
import NoticeBoard from "./commponent/NoticeBoard.jsx";

function Board() {
    const [searchTerm, setSearchTerm] = useState("");

    const majors = [
        { id: "웹" },
        { id: "앱" },
        { id: "123프론트" },
        { id: "벡엔드" },
    ];

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

    return (
        <div id={styles.container}>
            <div id={styles.tagContainer}>
                {/* 내가 처음에 작성했던 것 */}
                {/* majors.map((majors) => (
          <button className={styles.tagButton}>{majors.id}</button>
        )) */}

                {/* 수정된 코드, 보고 이해하고, 오답노트 */}
                {majors.map((major) => (
                    <button key={major.id} className={styles.tagButton}>
                        #{major.id}
                    </button>
                ))}
            </div>
            <div id={styles.elementContainer}>
                <button className={styles.smallButton}>
                    <i className="material-icons">swap_vert</i>
                    <div>최신순</div>
                </button>

                <div className={styles.searchBar}>
                    <button
                        className={styles.searchButton}
                        onClick={handleButtonClick}
                    >
                        <i className="material-symbols-outlined gf-search-1">
                            search
                        </i>
                    </button>

                    <input
                        className={styles.searchInput}
                        type="text"
                        placeholder="태그 내 검색"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyDown={handleEnterPress}
                    />
                </div>
                <div id={styles.pageContainer}>
                    <i className="material-icons">chevron_left</i>
                    <div className={styles.pageNumber}>1/100 페이지</div>
                    <i className="material-icons">chevron_right</i>
                </div>
                <button className={styles.smallButton}>작성하기</button>
            </div>
            <NoticeBoard></NoticeBoard>
        </div>
    );
}

export default Board;
