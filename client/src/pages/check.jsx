import React from "react";
import styles from "./check.module.css";
import hatImage from "../img/hat.png";

import sunglassImage from "../img/sunglass.png";
import Checkcard from "../commponent/Checkcard";

function Home() {
    return (
        <div id={styles.homeContainer}>
            <div id={styles.background}></div>
            <div id={styles.backgroundShadow}></div>
            <div id={styles.abilityContainer}>
                <div id={styles.abilityText}>나의 프로그래밍 역량은?</div>
            </div>
            <div id={styles.chooseContainer}>
                <Checkcard image={hatImage} text="처음이에요!" />
                <div className={styles.homeDivider}></div>
                <Checkcard
                    image={sunglassImage}
                    text="현직 개발자 혹은 학생이에요!"
                />
            </div>
        </div>
    );
}

export default Home;
