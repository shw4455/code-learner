import { useState } from "react";
import styles from "./Tags.module.css";

const Tag = () => {
    const initialTags = ["CodeStates", "kimcoding"];

    const [tags, setTags] = useState(initialTags);
    const removeTags = (indexToRemove) => {
        // 태그를 삭제하는 메소드
        const filter = tags.filter((el, index) => index !== indexToRemove);
        setTags(filter);
    };

    const addTags = (event) => {
        // tags 배열에 새로운 태그를 추가하는 메소드
        const inputVal = event.target.value;
        // 이미 입력되어 있는 태그인지 검사하여 이미 있는 태그라면 추가하지 말기
        // 아무것도 입력하지 않은 채 Enter 키 입력시 메소드 실행하지 말기
        // 태그가 추가되면 input 창 비우기
        if (
            event.key === "Enter" &&
            inputVal !== "" &&
            !tags.includes(inputVal)
        ) {
            setTags([...tags, inputVal]);
            event.target.value = "";
        }
    };

    return (
        <>
            <div id={styles.tagContainer}>
                <ul id={styles.tags}>
                    {tags.map((tag, index) => (
                        <li key={index} className={styles.tag}>
                            <span className={styles.tagTitle}>{tag}</span>
                            <span
                                className={styles.tagCloseIcon}
                                onClick={() => removeTags(index)}
                            >
                                {/* // tag-close-icon이 tag-title 오른쪽에 x로 표시,
                                삭제 아이콘을 click 했을 때 removeTags 메소드가
                                실행 x */}
                            </span>
                        </li>
                    ))}
                </ul>
                <input
                    className={styles.tagInput}
                    type="text"
                    //키보드의 Enter 키에 의해 addTags 메소드가 실행
                    onKeyUp={(e) => {
                        {
                            addTags(e);
                        }
                    }}
                    placeholder="Press enter to add tags_FEJIGU"
                />
            </div>
        </>
    );
};

export default Tag;
