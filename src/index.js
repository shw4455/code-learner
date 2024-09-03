import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./styles/normalize.css";
import "./styles/global-styles.css";
import "./styles/google-fonts.css";
import Header from "./header";
import Footer from "./footer";
import Body from "./body";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
