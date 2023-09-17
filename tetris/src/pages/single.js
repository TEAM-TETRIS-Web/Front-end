/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import "./single.css";
import Todo from "./todo.js";

const Single = (props) => {
  const location = useLocation();
  let navigate = useNavigate();
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토"];
  let id = location.state.id;
  let [focusTime, setFocusTime] = useState(location.state.focusTime);
  let [totalTime, setTotalTime] = useState(location.state.totalTime);
  let [startTime, setStartTime] = useState(location.state.startTime);
  const [userObj, setUserObj] = useState(props.userObj);

  //영상 관련 변수
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

  // 렌더링 시 카메라 켜기 및 데이터 가져오기
  useEffect(() => {
    init();
    getData();
    getWebcam((stream) => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  //집중도 체크 모델
  let isFocus = true; //참인 경우 집중 시간 증가

  //포즈 체크
  const URL = "https://teachablemachine.withgoogle.com/models/yFueU7xhE/";
  let model, webcam, ctx, labelContainer, maxPredictions;

  //폰 체크
  const URL2 = "https://teachablemachine.withgoogle.com/models/qbFWdCkyd/";
  let model2, maxPredictions2;

  //모델 초기 함수
  async function init() {
    //포즈 체크
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    //폰 체크
    const modelURL2 = URL2 + "model.json";
    const metadataURL2 = URL2 + "metadata.json";

    model2 = await tmImage.load(modelURL2, metadataURL2);
    maxPredictions2 = model2.getTotalClasses();

    //웹캠 가져오기
    const size = 200;
    const flip = true;
    webcam = new tmPose.Webcam(size, size, flip);
    await webcam.setup();
    await webcam.play();
  }

  async function loop(timestamp) {
    // await webcam.update(); // update the webcam frame
    await predict();
  }

  //예측 모델
  async function predict() {
    //포즈 예측
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    const prediction = await model.predict(posenetOutput);

    //폰 예측
    const prediction2 = await model2.predict(webcam.canvas);
    console.log(prediction);
    console.log(prediction2);
    // 정상 공부 자세 확률이 0.4 초과 / 폰을 들고 있을 확률이 0.7 미만인 경우 집중도 체크
    prediction[0].probability > 0.4 && prediction2[1].probability < 0.7
      ? (isFocus = true)
      : (isFocus = false);
  }

  //7초마다 한번씩 포즈 및 폰 유무 체크
  useEffect(() => {
    const intervalId = setInterval(() => {
      window.requestAnimationFrame(loop);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  //집중도 체크 모델 끝 ///////

  // 공부시간 증가
  useEffect(() => {
    //집중하고 있는 경우 증가
    const intervalId = setInterval(() => {
      if (isFocus) {
        setFocusTime((focusTime) => focusTime + 1);
      }
      //전체 공부시간 증가
      setTotalTime((totalTime) => totalTime + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  //시간 형식 출력 함수 
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
      //사용자의 정보인 경우 가져오기
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
              <p className="time-clock">{formatTime(totalTime)}</p> <br />
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
