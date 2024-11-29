import { Route, Routes } from "react-router-dom";
import body from "./body.module.css";
import Main from "../main";
import Login from "../login";
import Check from "../check";
import NotFound from "./notFound";

function Body() {
    return (
        <div className={body.bodyContainer}>
            <Routes>
                <Route path="/" exact={true} element={<Main />} />
                <Route path="/check" exact={true} element={<Check />} />
                <Route path="/login" exact={true} element={<Login />} />
                <Route path="/notFound" exact={true} element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default Body;
