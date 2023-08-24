/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./login.css";
import "./common/common.css";
import focustudy from "./../assets/focustudy.jpg";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { authService, dbService } from "../fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { doc, updateDoc } from "firebase/firestore";

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  const auth = getAuth();
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "name") {
      setName(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      //newAccount 를 통해 생성, 로그인 구분
      if (newAccount) {
        // 이메일과 비밀번호를 통해 새 계정 생성
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            //계정 정보 DB 생성
            const docRef = addDoc(collection(dbService, "user"), {
              email: email,
              name: name,
              time: {
                date: 0,
                end: 0,
                focus: 0,
                start: 0,
                total: 0,
              },
              todos: [],
            });
            // ...
            navigate("/");
          })
          .catch((error) => {
            const errorCode = error.code;
            setError(error.message);
            // ..
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            setError(error.message);
          });
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col focus-img">
          <img src={focustudy} width="100%" />
        </div>
        <div className="col main-div">
          <div className="title-div">
            <p className="login-detail none-margin">집중하면서</p>
            <p className="login-detail none-margin">공부하고 싶다면,</p>
            <p className="login-main none-margin">FocuStudy</p>
          </div>
          <div className="login-div">
            {newAccount ? (
              <input
                name="name"
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={onChange}
                //   placeholder="아이디를 입력해주세요"
              />
            ) : null}
            <input
              name="email"
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={onChange}
              //   placeholder="아이디를 입력해주세요"
            />
            <br />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={onChange}
              //   placeholder="비밀번호를 입력해주세요"
            />{" "}
            <br />
            <button className="login-button btn" onClick={onSubmit}>
              {newAccount ? "계정 생성" : "로그인"}
            </button>
            <br />
            <div className="detail-bar">
              <span
                onClick={() => {
                  setNewAccount((prev) => !prev);
                }}
              >
                {newAccount ? "로그인" : "새로운 계정 만들기"}
              </span>{"   "}
              | {"   "} 
              <span
                onClick={() => {
                  sendPasswordResetEmail(auth, email)
                    .then(() => {
                      // Password reset email sent!
                      // ..
                    })
                    .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      // ..
                    });
                }}
              >
                비밀번호 찾기
              </span>
            </div>
          </div>
          {/* <button className="find-id btn">아이디 찾기</button>
            <span className="find">|</span>
            <button className="find-pw btn">비밀번호 찾기</button> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
