/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./main.css";
import "./common/common.css";

import { authService } from "./../fbase";
import { dbService } from "../fbase";
import { doc, updateDoc } from "firebase/firestore";
import Todo from "./todo.js";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const Main = () => {
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let [focusTime, setFocusTime] = useState(0);
  let [totalTime, setTotalTime] = useState(0);
  let [startTime, setStartTime] = useState(0);
  let [endTime, setEndTime] = useState(0);

  let [date, setDate] = useState();
  let navigate = useNavigate();
  let [todo, setTodo] = useState([]);
  let [todoData, setTodoData] = useState([]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds}`;
  };

  useEffect(() => {
    //로그인 상태 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
    });
  }, []);

  useEffect(() => {
    getData();
    resetTime();
  }, []);

  //사용자 시간 가져오기
  async function getData() {
    const dbProblems = await getDocs(query(collection(dbService, "user")));
    dbProblems.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
      };
      if (dataObj.email === "sample@gmail.com") {
        setTodo(dataObj.todo);
        setEndTime(dataObj.time.end);
        setStartTime(dataObj.time.start);
        setFocusTime(dataObj.time.focus);
        setTotalTime(dataObj.time.total);
        setDate(dataObj.time.date);
        resetTime();
      }
    });
  }

  //사용자의 시간이 과거일 경우 리셋
  const todoRdf = doc(dbService, "user", "userNameSample");

  async function resetTime() {
    if ((date != today.getDate()) && date) {
      console.log ("time reset");
      console.log (date);
      console.log (today.getDate());
      await updateDoc(todoRdf, {
        time: {
          focus: 0 ,
          total: 0 ,
          start: 0,
          end: 0,
          date : today.getDate()
        },
      });
    }
  }

  //사용자의 시작 시간이 오늘인 경우 공부 시작 시간 설정
  
  async function setTime() {
    if (date != today.getDate()) {
      await updateDoc(todoRdf, {
        time: {
          focus: 0 ,
          total: 0 ,
          start: today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds(),
          end: 0,
          date : today.getDate()
        },
      });
      setStartTime(today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds());
    }
  }
  return (
    <div className="container main-page">
      <p className="title-date">
        {today.getMonth() + 1}월 {today.getDate()}일 ({week[today.getDay()]})
      </p>
      {/* 메인창 */}
      <div className="row">
        <div className="col">
          {/* Focus Time  */}
          <div className="time-div blue-bg">
            <p className="time-title">Focus TIME</p>
            <p className="time-clock">{formatTime(focusTime)}</p> <br />
            <input
              className="time-btn"
              onClick={() => {
                setTime();
                navigate("/single/", {
                  state: {
                    focusTime: focusTime,
                    totalTime: totalTime,
                    startTime: startTime,
                  },
                });
              }}
              type="button"
              value="공부 시작하기"
            />
          </div>
          {/* Focus Time 끝 */}
          {/* 총 공부 시간, 최대 집중 시간, 시작 시간, 종료 시간 */}
          <div className="row timeText-div">
            <div className="col-6">
              <p className="title">총공부시간</p>
              <p className="time">{formatTime(totalTime)}</p>
            </div>
            <div className="col-6">
              <p className="title">최대 집중 시간</p>
              <p className="time">{formatTime(focusTime)}</p>
            </div>
            <div className="col-6">
              <p className="title">시작시간</p>
              <p className="time">{formatTime(startTime)}</p>
            </div>
            <div className="col-6">
              <p className="title">종료시간</p>
              <p className="time">{formatTime(endTime)}</p>
            </div>
          </div>
          {/* 총 공부 시간, 최대 집중 시간, 시작 시간, 종료 시간 끝 */}
          <div className="row ranking">
            <div className="col">그림</div>
            <div className="col">
              <p className="title-rank">전체 랭킹</p>
              <p className="rank">상위 3%</p>
              <p className="rank-text">달성했어요!</p>
              <p className="rank-grade">(전체 543등)</p>
            </div>
          </div>
        </div>
        <div className="col height-100">
          <Todo />
        </div>
      </div>
    </div>
  );
};

export default Main;
