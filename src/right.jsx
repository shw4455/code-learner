import React from "react";
import right from "./styles/right.module.css";

function Right() {
  const adImg = require("./img/advertisement_2.jpg");

  return (
    <div id={right.right}>
      <img id={right.advertisementImg} src={adImg} alt="이미지"></img>
      <div id={right.advertisementShadow}></div>
    </div>
  );
}

export default Right;
