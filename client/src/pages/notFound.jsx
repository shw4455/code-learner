import React from "react";
import notFound from "./notFound.module.css";

function NotFound() {
  return (
    <div id={notFound.container}>
      <div className={notFound.textContainer}>
        <div className={notFound.text}>404</div>
        <div className={notFound.text}>Page is not found!</div>
      </div>
    </div>
  );
}

export default NotFound;
