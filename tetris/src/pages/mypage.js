/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

const Mypage = () => {
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let [focusTime, setFocusTime] = useState(10412);
  let [totalTime, setTotalTime] = useState(12412);
  let [startTime, setStartTime] = useState(40231);
  let [endTime, setEndTime] = useState(73341);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds}`;
  };


  return (
    <div className="container row">
      {/* 이름 및 내가 쓴 글 */}
      <div className="col">
        {/* 날짜 */}
        <p className="title-date">
          {today.getMonth() + 1}월 {today.getDate()}일 ({week[today.getDay()]})
        </p>
        {/* 프로필 사진 */}
        <div>사진</div>
        {/* 이름 */}
        <div>
          <p>최강양파</p>
        </div>
        {/* 내가 쓴 글 */}
        <div>
          <p>내가 쓴 글</p>
        </div>
      </div>
      {/* 공부 시간 및 순위 */}
      <div className="col">
        {/* 공부 시간 */}
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
        {/* 공부 순위  */}
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
    </div>
  );
};

export default Mypage;
