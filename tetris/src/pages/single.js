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
import "./single.css";
import Todo from "./todo.js";

const Single = () => {  
  const location = useLocation();
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let [focusTime, setFocusTime] = useState(location.state.focusTime);
  let [totalTime, setTotalTime] = useState(location.state.totalTime);

  let navigate = useNavigate();

  const videoRef = React.useRef(null);

  const getWebcam = (callback) => {
    try {
      const constraints = {
        video: true,
        audio: false,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  // show video
  // React.useEffect(() => {
  //   getWebcam((stream) => {
  //     videoRef.current.srcObject = stream;
  //   });
  // }, []);

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
    <div className="blue-bg single-pg">
      <div className="container">
        <p className="title-date">
          {today.getMonth() + 1}월 {today.getDate()}일 ({week[today.getDay()]})
        </p>
        {/* 메인창 */}
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
            {/* 공부 화면 시작 */}
            <div className="icon-div">
              <div>{/* <video ref={videoRef} autoPlay /> */}</div>
              <div>화면 왜봄 공부나 하셈</div>
            </div>
            {/* 공부 화면  끝 */}
          </div>
          <div className="col height-100">
            <Todo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
