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

import { authService } from "./../fbase";
import { dbService } from "../fbase";
import { doc, updateDoc } from "firebase/firestore";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";

const Single = (props) => {
  const location = useLocation();
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let [focusTime, setFocusTime] = useState(location.state.focusTime);
  let [totalTime, setTotalTime] = useState(location.state.totalTime);
  let [startTime, setStartTime] = useState(location.state.startTime);
  let id = location.state.id;
  const [userObj, setUserObj] = useState(props.userObj);
  let navigate = useNavigate();
  let isFocus = true;

  const videoRef = React.useRef(null);

  //카메라 켜기
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
  useEffect(() => {
    getData();
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  //집중도 체크 모델
  const URL = "https://teachablemachine.withgoogle.com/models/H3D75BKiP/";
  let model, webcam, ctx, labelContainer, maxPredictions;

  //폰 체크
  const URL2 = "https://teachablemachine.withgoogle.com/models/L7ABWu3p4/";
  let model2, maxPredictions2;

  async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    //폰 체크
    const modelURL2 = URL2 + "model.json";
    const metadataURL2 = URL2 + "metadata.json";

    model2 = await tmImage.load(modelURL2, metadataURL2);
    maxPredictions2 = model2.getTotalClasses();

    // Convenience function to setup a webcam
    const size = 200;
    const flip = true;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();
  }

  async function loop(timestamp) {
    await webcam.update(); // update the webcam frame
    await predict();
  }

  async function predict() {
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      console.log(classPrediction);
    }
    // predict can take in an image, video or canvas html element
    const prediction2 = await model2.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions2; i++) {
      const classPrediction =
      prediction2[i].className + ": " + prediction2[i].probability.toFixed(2);
      console.log(classPrediction);
    }  
    (prediction[0].probability > 0.4 && prediction2[0].probability < 0.7 ) ? isFocus = true : iIsFocus = false;
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
      window.requestAnimationFrame(loop);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  //집중도 체크 모델 끝 ///////

  // 공부시간 증가
  useEffect(() => {
    const intervalId = setInterval(() => {
      isFocus ? setFocusTime((focusTime) => focusTime + 1) : 0;
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

  //사용자 시간 가져오기
  async function getData() {
    const dbProblems = await getDocs(query(collection(dbService, "user")));
    dbProblems.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
      };
      if (dataObj.email === userObj.email) {
        setStartTime(dataObj.time.start);
      }
    });
  }

  //사용자 시간 저장
  const todoRdf = doc(dbService, "user", `${id}`);
  async function onSubmit(event) {
    await updateDoc(todoRdf, {
      time: {
        focus: focusTime,
        total: totalTime,
        start: startTime,
        end:
          today.getHours() * 3600 +
          today.getMinutes() * 60 +
          today.getSeconds(),
        date: today.getDate(),
      },
    });
  }

  init();

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
                  onSubmit();
                  navigate("/report/", {
                    state: {
                      focusTime: focusTime,
                      totalTime: totalTime,
                    },
                  });
                }}
                type="button"
                value="공부 그만하기"
              />
            </div>
            {/* Focus Time 끝 */}
            {/* 공부 화면 시작 */}
            <div className="icon-div">
              <div className="video-div">
                <video ref={videoRef} width="80%" autoPlay />
              </div>
            </div>
            {/* 공부 화면  끝 */}
          </div>
          <div className="col height-100">
            <Todo userObj={userObj} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
