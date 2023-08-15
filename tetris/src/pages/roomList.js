/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./roomList.css";

const RoomList = () => {
  let [room, setRoom] = useState([
    {
      name: "아기 돼지의 집 짓는 방법",
      detail: "1)벽돌로 집을 짓는다\n2)콘크리트로 집을 짓는다",
      person: 3,
    },
    {
      name: "감자 기중의 민둥맨둥 특강",
      detail: "얘 봄감자가 맛있단다",
      person: 2,
    },
  ]);
  let [modal, setModal] = useState(Array(room.length).fill(false));
  let navigate = useNavigate();


  return (
    <div className="container">
      <div className="roomList-pg row">
        {/* 방 목록 */}
        <div className="col room-list-div blue-bg">
          <p className="make-room-title">공개 방</p>
          {room.map(function (room, i) {
            return (
              <div key={i}>
                <div className="room-div row white-bg">
                  <span
                    className="room-name col-8"
                    onClick={() => {
                      let copy_modal = [...modal];
                      copy_modal[i] = !copy_modal[i];
                      setModal(copy_modal);
                    }}
                  >
                    {room.name}
                  </span>
                  <span className=" col room-person">{room.person} / 5</span>
                  <button  onClick={()=> {navigate(`/room/${i}`)}}className="btn room-btn white-font">참여하기</button>
                </div>
                {modal[i] ? <RoomMoadal detail={room.detail} /> : null}
              </div>
            );
          })}
        </div>
        {/* 방 만들기 화면 */}
        <div className="make-room-div col">
          <p className="make-room-title">방 만들기</p>
          <p className="make-room-detail">방 이름</p>
          <input type="text" />
          <p className="make-room-detail">방 설명</p>
          <textarea />
          <p className="make-room-detail">공개 여부</p>
          <div
            className="btn-group open-btn-div"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autocomplete="off"
              checked
            />
            <label className="open-btn btn btn-outline-primary" for="btnradio1">
              비공개
            </label>
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autocomplete="off"
            />
            <label
              className=" open-btn btn btn-outline-primary"
              for="btnradio2"
            >
              공개
            </label>
          </div>
          <br />
          <button onClick={()=>{navigate(`/room/sample`)}}className="btn make-room-btn white-font">방 만들기</button>
        </div>
      </div>
    </div>
  );
};

const RoomMoadal = (props) => {
  return (
    <div className="room-detail-div white-bg">
      <pre className="none-margin">{props.detail}</pre>
    </div>
  );
};

export default RoomList;
