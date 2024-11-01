import React from "react";
import styles from "./styles/testPage.module.css";
import Login from "./login";
import Register from "./register";

function TestPage() {
    return (
        <div className={styles.container}>
            <Login></Login>
            <Register></Register>
        </div>
    );
}

export default TestPage;
