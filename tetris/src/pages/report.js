/* eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import "./report.css";

const Report = () => {
  const location = useLocation();

  const focusTime = location.state.focusTime;
  const totalTime = location.state.totalTime;
  
  let navigate = useNavigate();
  let [percentage, setPercentage] = useState(Math.floor((focusTime / totalTime) * 100));


  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds}`;
  };


  return (
    <div className="blue-bg report-pg">
      <div className="container">
        <p className="report-title blue-font">Focus MATE 분석 리포트</p>
        {/* 총 공부 시간 */}
        <div className="row report-detail">
          <div className="col">
            <p className="time-title blue-font">총 공부 시간</p>
            <div className="focus-time-div">
              <p className="time blue-font">{formatTime(totalTime)}</p>
            </div>
          </div>
          {/* 총 공부 시간 끝 */}
          {/* 실제 집중 시간 */}
          <div className="col">
            <p className="time-title blue-font">실제 집중 시간</p>
            <div className="focus-time-div">
              <p className="time blue-font">{formatTime(focusTime)}</p>
            </div>
          </div>
          {/* 실제 집중 시간 */}
        </div>
        <div className="focus-percent-title">
          총 공부 시간의{" "}
          <span className="focus-percent blue-font">{percentage}%</span>
          를 집중했어요!
        </div>
        {/* 실제 집중 시간 끝 */}
        <input
          className="back-main-btn"
          type="button"
          value="메인 화면으로"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>
    </div>
  );
};

export default Report;
