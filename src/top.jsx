import React from "react";
import top from "./styles/top.module.css";

function Top() {
  const adImg = require("./img/advertisement_1.jpg");
  return (
    <div id={top.top}>
      <img id={top.advertisementImg} src={adImg} alt="이미지 "></img>
      <div id={top.advertisementShadow}></div>
    </div>
  );
}

export default Top;
