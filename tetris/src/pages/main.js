import React, { useState, useEffect } from "react";
import "./main.css";

const Main = () => {
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let [focusTime, setFocusTime] = useState("02:10:25");

  return (
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
            <input className="time-btn" type="button" value="공부 시작하기" />
          </div>
          {/* Focus Time 끝 */}
          {/* 총 공부 시간, 최대 집중 시간, 시작 시간, 종료 시간 */}
          <div className="row timeText-div">
            <div className="col-6">
              <p className="title">총공부시간</p>
              <p className="time">08:08:08</p>
            </div>
            <div className="col-6">
              <p className="title">최대 집중 시간</p>
              <p className="time">08:08:08</p>
            </div>
            <div className="col-6">
              <p className="title">시작시간</p>
              <p className="time">07시 48분</p>
            </div>
            <div className="col-6">
              <p className="title">종료시간</p>
              <p className="time">21시 26분</p>
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
            <input type="button" value="+"/>
          </div>
          {/* 할일 추가 창 끝 */}
        </div>
      </div>
    </div>
  );
};

export default Main;
