import React from "react";
import styles from "./testPage.module.css";
import Login from "./login";
import Register from "./register";
import Search from "./search";

function TestPage() {
    return (
        <div className={styles.container}>
            <Search></Search>
        </div>
    );
}

export default TestPage;
