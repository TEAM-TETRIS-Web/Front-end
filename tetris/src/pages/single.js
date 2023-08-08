/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./single.css";

const Main = () => {
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let [focusTime, setFocusTime] = useState("02:10:25");
  let navigate = useNavigate();
  const toggleStudy = () => setStudy((prev) => !prev);

  return (
    <div className="main-bg">
      <div className="container">
        <p className="title-date">
          {today.getMonth() + 1}월 {today.getDate()}일 ({week[today.getDay()]})
        </p>
        {/* 메인창 */}
        <div className="row">
          <div className="col time-detail-div">
            {/* Focus Time  */}
            <div className="time-div">
              <p className="time-title">Focus TIME</p>
              <p className="time-clock">{focusTime}</p>
              <input
                className="time-btn"
                onClick={() => {
                  navigate("/report/");
                }}
                type="button"
                value="공부 그만하기"
              />
            </div>
            {/* Focus Time 끝 */}
            {/* 공부 화면 시작 */}
            <div className="icon-div">
              <div>아이콘 들어가는 곳</div>
              <div>화면 왜봄 공부나 하셈</div>
            </div>
            {/* 공부 화면  끝 */}
          </div>
          {/* Focus To Do */}
          <div className="toDo-div col">
            <p className="title">Focus TO DO</p>
            {/* TodoList 목록 */}
            <div className="toDoList-div">
              <div className="toDoList row">
                <input type="checkbox" className="col-1" />
                <p className="text col">백준</p>
              </div>
            </div>
            <div className="toDoList-div">
              <div className="toDoList row">
                <input type="checkbox" className="col-1" />
                <p className="text col">토익</p>
              </div>
            </div>
            {/* TodoList 목록 끝 */}
            {/* 할일 추가 창 */}
            <div className="AddToDo-div">
              <input type="text" placeholder="할 일 추가하기" />
              <input type="button" value="+" />
            </div>
            {/* 할일 추가 창 끝 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
