/* eslint-disable*/
import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
  useParams,
} from "react-router-dom";
import Todo from "./todo.js";
import "./room.css";

const Room = () => {
  let [focusTime, setFocusTime] = useState(0);
  let navigate = useNavigate();
  let { id } = useParams();

  const handleCopyClipBoard = () => {
    try {
      navigator.clipboard.writeText(`http://localhost:3000/room/${id}`);
      alert('클립보드에 복사되었습니다.');
    } catch (error) {
      alert('클립보드 복사에 실패하였습니다.');
    }
  };

  return (
    <div className="container room-pg">
      {/* 방 이름 및 설명 바 */}
      <div className="row room-title-bar">
        <span className="col-4 title none-margin">알파카의 초식 탐구하기</span>
        <span className="col detail">5/5</span>
        <div className="col-6">
          <p className="link-label none-margin">링크 공유하기</p>
          <div className="link-div row">
            <span className="link col">http://localhost:3000/room/{id}</span>
            <button onClick={() => handleCopyClipBoard()} className=" col-3 btn link-btn">링크 복사 </button>
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
            <p className="time-clock">{focusTime}</p> <br />
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
        </div>
        <div className="todo-size col">
          <Todo />
        </div>
      </div>
      {/* 집중 시간 및 todo 끝 */}
      <div>
      </div>
    </div>
  );
};

export default Room;
