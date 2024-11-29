import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./src/reportWebVitals";
import App from "./App";
import "./src/styles/normalize.css";
import "./src/styles/global-styles.css";
import "./src/styles/google-fonts.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
        {/* <div>123123123123123</div> */}
    </React.StrictMode>
);

reportWebVitals();
