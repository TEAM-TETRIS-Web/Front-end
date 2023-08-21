import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./login.css";
import "./common/common.css";
import focustudy from "./../assets/focustudy.jpg";

const Login = () => {
    let [id, setId] = useState("");
    let [pw, setPW] = useState("");

    return(
        <div  className = "row">
            <div className = "col">
                <img src= {focustudy} width = "100%"/>
            </div>
            <div className = "col ">
                <p className = "login-detail none-margin">집중하면서<br/>공부하고 싶다면,</p>
                <p className = "login-main none-margin">FocuStudy</p>
            <input className = "login-box"
                type = "text"
                value = {id}
                onChange={(e) => {
                    setId(e.target.value);
                }}
                place
                placeholder = "아이디를 입력해주세요"
                /> <br/>
            <input className = "login-box"
                type = "password"
                value = {pw}
                onChange={(e) => {
                    setPW(e.target.value);
                }}
                placeholder = "비밀번호를 입력해주세요"
                /> <br/>
            <button className = "login-button btn">
                로그인
            </button>
            <button className = "sign-in-button white-bg btn">
                회원가입
            </button>
            <br/>
            <button className = "find-id btn">
                아이디 찾기
            </button>
            <span className = "find">|</span>
            <button className = "find-pw btn">
                비밀번호 찾기
            </button>
            </div>
        </div>
    );
};

export default Login;