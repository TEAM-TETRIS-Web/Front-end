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
    <div className="container">
      {/* 방 이름 및 설명 바 */}
      <div className="row">
        <span className="col">알파카의 초식 탐구하기</span>
        <span className="col">5/5</span>
        <div className="col">
          <label>링크 공유하기</label>
          <div>
            <span>http://localhost:3000/room/{id}</span>
            <button onClick={() => handleCopyClipBoard()}className="btn">링크 복사 </button>
          </div>
        </div>
      </div>
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
        <Todo />
      </div>
    </div>
  );
};

export default Room;
