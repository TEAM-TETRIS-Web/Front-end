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
import Todo from "./todo.js";
import "./room.css";

const Room = (props) => {
  let [focusTime, setFocusTime] = useState(0);
  let [totalTime, setTotalTime] = useState(0);
  let navigate = useNavigate();
  let { id } = useParams();

  const location = useLocation();

  const name = location.state.name;
  const person = location.state.person;

  const handleCopyClipBoard = () => {
    try {
      navigator.clipboard.writeText(`http://localhost:3000/room/${id}`);
      alert("클립보드에 복사되었습니다.");
    } catch (error) {
      alert("클립보드 복사에 실패하였습니다.");
    }
  };

  // 공부시간 증가
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFocusTime((focusTime) => focusTime + 1);
      setTotalTime((totalTime) => totalTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time / 60) % 60);
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds}`;
  };

  return (
    <div className="container room-pg">
      {/* 방 이름 및 설명 바 */}
      <div className="row room-title-bar">
        <span className="col-4 title none-margin">{name}</span>
        <span className="col detail">{person} / 5</span>
        <div className="col-6">
          <p className="link-label none-margin">링크 공유하기</p>
          <div className="link-div row">
            <span className="link col">http://localhost:3000/room/{id}</span>
            <button
              onClick={() => handleCopyClipBoard()}
              className=" col-3 btn link-btn"
            >
              링크 복사{" "}
            </button>
          </div>
        </div>
      </div>
      {/* 방 이름 및 셜명 바 끝 */}
      {/* 집중 시간 및 todo 시작 */}
      <div className="row">
        <div className="col">
          {/* Focus Time  */}
          <div className="time-div white-bg">
            <p className="time-title">Focus TIME</p>
            <p className="time-clock">{formatTime(focusTime)}</p> <br />
            <input
                className="time-btn"
                onClick={() => {
                  navigate("/report/", {
                    state: {
                      focusTime: focusTime,
                      totalTime: totalTime,
                    }
                  });
                }}
                type="button"
                value="공부 그만하기"
              />
          </div>
          {/* Focus Time 끝 */}
        </div>
        <div className="todo-size col">
          <Todo />
        </div>
      </div>
      {/* 집중 시간 및 todo 끝 */}
      <div></div>
    </div>
  );
};

export default Room;
