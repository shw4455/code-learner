import React from "react";
import login from "./styles/login.module.css";
import LoginElement from "./commponent/LoginElement";

function Login() {
    return (
        <div id={login.container}>
            <div id={login.elementContainer}>
                <div className={login.text}>로그인</div>
                <input
                    className={`${login.loginElement} ${login.input}`}
                    type="email"
                    placeholder="이메일"
                />
                <input
                    className={`${login.loginElement} ${login.input}`}
                    type="password"
                    placeholder="비밀번호"
                />

                <LoginElement
                    element={login.element}
                    style={login.login}
                    content="로그인"
                />

                <div className={login.divider}>
                    <div className={login.dividerLine}>
                        <div className={login.dividerText}>또는</div>
                    </div>
                </div>

                <LoginElement
                    element={login.element}
                    style={login.naver}
                    content="네이버"
                />
                <LoginElement
                    element={login.element}
                    style={login.facebook}
                    content="페이스북"
                />
                <LoginElement
                    element={login.element}
                    style={login.github}
                    content="깃허브"
                />
                <LoginElement
                    element={login.element}
                    style={login.google}
                    content="구글"
                />

                <input id={login.checkbox} type="checkbox" />
                <div id={login.checkbox}>로그인 유지</div>
                <div id={login.checkingTextContainer}>
                    <div className={login.checkingText}>
                        계정이 없나요?
                        <a href="#"> 가입</a>
                    </div>
                    <div className={login.checkingText}>
                        비밀번호를 잊으셨나요?
                        <a href="#"> 찾기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
