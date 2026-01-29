import React from "react";
import main from "./styles/main.module.css";
import Board from "./board";
import Tag from "./tag";
import Right from "./right";
import Top from "./top";
import Left from "./commponent/Left";
import Login from "./login";
import Register from "./register";

function Main() {
    return (
        <div className={main.container}>
            <div className={main.main}>
                <Top></Top>
                <div className={main.concentContainer}>
                    {/* <Left></Left> */}
                    <Board></Board>
                    <Right></Right>
                </div>
            </div>

        </div>
    );
}

export default Main;
