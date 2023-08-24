/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import "./mypage.css";
import person from "./../assets/person.png";
import pen from "./../assets/ppyojogi.png";
import { dbService } from "../fbase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const Mypage = (props) => {
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let [focusTime, setFocusTime] = useState(0);
  let [totalTime, setTotalTime] = useState(0);
  let [startTime, setStartTime] = useState(0);
  let [endTime, setEndTime] = useState(0);
  const [userObj, setUserObj] = useState(props.userObj);
  let [date, setDate] = useState(null);
  let [name, setName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds}`;
  };

  //사용자 시간 가져오기
  async function getData() {
    const dbinfo = await getDocs(query(collection(dbService, "user")));
    dbinfo.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
      };
      if (dataObj.email === userObj.email) {
        setEndTime(dataObj.time.end);
        setStartTime(dataObj.time.start);
        setFocusTime(dataObj.time.focus);
        setTotalTime(dataObj.time.total);
        setDate(dataObj.time.date);
        setName(dataObj.name);
        if (dataObj.time.date != today.getDate()) {
          console.log("시간 초기화 됨");
          setEndTime(0);
          setStartTime(0);
          setFocusTime(0);
          setTotalTime(0);
          resetTime(dataObj.id);
        }
      }
    });
  }

  return (
    <div className="container row">
      {/* 이름 및 내가 쓴 글 */}
      <div className="col">
        {/* 날짜 */}
        <p className="title-date">
          {today.getMonth() + 1}월 {today.getDate()}일 ({week[today.getDay()]})
        </p>
        {/* 프로필 사진 */}
        <div className="profile">
          <img src={person} width="100%" />
        </div>
        {/* 이름 */}
        <div className="profile-name-div row">
          <p className="profile-name col none-margin">{name}</p>
          <div className="col-2">
            <img src={pen} width="100%"/>
          </div>
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
      </div>
    </div>
  );
};

export default Mypage;
