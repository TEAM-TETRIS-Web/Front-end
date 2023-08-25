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
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  getDocs,
  orderBy,
} from "firebase/firestore";
import { authService } from "./../fbase";
import { dbService } from "../fbase";
import { doc, updateDoc } from "firebase/firestore";

import Todo from "./todo.js";
import "./room.css";
import "./common/common.css";
import sStudy from "./../assets/s-study.jpg";
import mStudy from "./../assets/m-study.jpg";
import lStudy from "./../assets/l-study.jpg";
import plus from "./../assets/plus.png";

const Room = (props) => {
  let [focusTime, setFocusTime] = useState(0);
  let [totalTime, setTotalTime] = useState(0);
  let [endTime, setEndTime] = useState(0);
  let navigate = useNavigate();
  let { url } = useParams();
  const [userObj, setUserObj] = useState(props.userObj);
  let [id, setId] = useState();
  const location = useLocation();
  let today = new Date();
  let [roomName, setName] = useState("");
  let [users, setUsers] = useState([]);
  let [roomObj, setRoomObj] = useState();
  let [userName, setUserName] = useState();
  let [startTime, setStartTime] = useState();
  let isFocus = true;

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
    (prediction[0].probability > 0.4 && prediction2[0].probability < 0.7 ) ? isFocus = true : isFocus = false;
  }


  useEffect(() => {
    const intervalId = setInterval(() => {
      window.requestAnimationFrame(loop);
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  //집중도 체크 모델 끝 ///////
  
  useEffect(() => {
    getTimeData();
  }, [])

  useEffect(() => {
    getRoomData();
  })
  
  // useEffect(() => {
  //   addUser();
  // }, [])

  
  //방 인원 추가
  async function addUser() {
    const roomRDF = doc(dbService, "room", `${url}`);
    let isFound = users.some(data => data.name == userName);
    if (!isFound) {
      setUsers([{ name: userName, time: totalTime }, ...users]);
      await updateDoc(roomRDF, {
        user: [{ name: userName, time: totalTime }, ...users],
      });
    }
    else {
      console.log("이미 추가된 사용자입니다.");
    }
  }

  //방 정보 가져오기
  async function getRoomData() {
    const dbinfo = await getDocs(query(collection(dbService, "room")));
    dbinfo.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
      };
      if (dataObj.id == url) {
        setName(dataObj.name);
        setUsers(dataObj.user);
      }
    });
  }
  
  //방에서 나갈 때 사용자 제거
  async function delUser(event) {
    
    const roomRDF = doc(dbService, "room", `${url}`);
    let isFound = users.some(data => data.name == userName);
    if (isFound) {
      let i = users.findIndex((e) => e.name == userName);
      let newUsers = [...users];
      newUsers.splice(i, 1);
      setUsers(newUsers);

      await updateDoc(roomRDF, {
        user: newUsers,
      });

      if (users.length == 0) {

      }
    }
    else {
      console.log("없는 사용자입니다.");
    }
  }

  
  //사용자 시간 가져오기
  async function getTimeData() {
    const dbinfo = await getDocs(query(collection(dbService, "user")));
    dbinfo.forEach((doc) => {
      const dataObj = {
        ...doc.data(),
        id: doc.id,
      };
      if (dataObj.email === userObj.email) {
        setUserName(dataObj.name);
        setId(dataObj.id);
        setEndTime(dataObj.time.end);
        setStartTime(dataObj.time.start);
        setFocusTime(dataObj.time.focus);
        setTotalTime(dataObj.time.total);
      }
    });
  }

  //사용자의 시작 시간이 오늘인 경우 공부 시작 시간 설정
  async function setTime() {
    const todoRdf = doc(dbService, "user", `${id}`);

    if (startTime === 0) {
      setStartTime(
        today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()
      );
      await updateDoc(todoRdf, {
        time: {
          focus: 0,
          total: 0,
          start:
            today.getHours() * 3600 +
            today.getMinutes() * 60 +
            today.getSeconds(),
          end: 0,
          date: today.getDate(),
        },
      });
      setStartTime(
        today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds()
      );
    }
  }

  //사용자 시간 저장하기
  async function onSubmit(event) {
    const todoRdf = doc(dbService, "user", `${id}`);

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
  //클립보드 복사 함수
  const handleCopyClipBoard = () => {
    try {
      navigator.clipboard.writeText(`http://localhost:3000/room/${url}`);
      alert("클립보드에 복사되었습니다.");
    } catch (error) {
      alert("클립보드 복사에 실패하였습니다.");
    }
  };

  // 공부시간 증가
  useEffect(() => {
    const intervalId = setInterval(() => {
      const intervalId = setInterval(() => {
      isFocus ? setFocusTime((focusTime) => focusTime + 1) : 0;
      setTotalTime((totalTime) => totalTime + 1);
    }, 1000);
      setTotalTime((totalTime) => totalTime + 1);
      setUsers((users) =>
        users.map((user) => ({ ...user, time: user.time + 1 }))
      );
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
        <span className="col-5 title none-margin">{roomName}</span>
        <div className="col-7">
          <p className="link-label none-margin">링크 공유하기</p>
          <div className="link-div row">
            <span className="link col">http://localhost:3000/room/{url}</span>
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
            <p className="time-clock">{formatTime(totalTime)}</p> <br />
            <input
              className="time-btn"
              onClick={() => {
                delUser();
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
        </div>
        <div className="todo-size col">
          <Todo userObj={userObj} />
        </div>
      </div>
      {/* 집중 시간 및 todo 끝 */}
      {/* 참가자 목록  */}
      <div className="row">
        {users &&
          users.map(function (person, i) {
            return (
              <div className="col-2 card user-card" key={i}>
                <img
                  className="card-img-top user-img"
                  src={
                    person.time > 15
                      ? person.time > 40
                        ? lStudy
                        : mStudy
                      : sStudy
                  }
                />
                <div className="card-body">
                  <h5 className="card-title">{person.name}</h5>
                  <p className="card-text none-margine">
                    {formatTime(person.time)}
                  </p>
                </div>
              </div>
            );
          })}
        <div className="col-2 card user-card">
          <img src={plus} onClick={addUser} className="cord-img plus-img" />
          <div className="card-body">
            <h5 className="card-title"> 참가하기</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;
