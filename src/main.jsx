import React from "react";
import main from "./styles/main.module.css";
import Board from "./board";
import Tag from "./tag";
import Right from "./right";
import Top from "./top";

function Main() {
    return (
        <div className={main.container}>
            <div className={main.main}>
                <Top></Top>
                <div className={main.concentContainer}>
                    <Tag></Tag>
                    <Board></Board>
                    <Right></Right>
                </div>
            </div>
        </div>
    );
}

export default Main;
