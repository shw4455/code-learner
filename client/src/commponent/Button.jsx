import { React, useState } from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

function Button(props) {
    return (
        <button className={styles.buttonContainer} onClick={props.onClick}>
            <div className={styles.buttonWrapper}>
                <i className="material-icons"></i>
                <div>{props.buttonText}</div>
            </div>
        </button>
    );
}

export default Button;
