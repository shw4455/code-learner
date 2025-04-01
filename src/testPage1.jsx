import React from "react";
import styles from "./styles/testPage.module.css";
import Login from "./login";
import Register from "./register";
import Search from "./search";

function TestPage1() {
    return (
        <div className={styles.container}>
            <Search></Search>
            <Register></Register>
        </div>
    );
}

export default TestPage1;
