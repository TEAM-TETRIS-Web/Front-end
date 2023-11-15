/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { dbService } from "../fbase";
import { doc, updateDoc } from "firebase/firestore";
import { addDoc, collection, onSnapshot, query, getDocs, orderBy } from "firebase/firestore";
import "./single.css";
import Todo from "./todo.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import studyHand from "./../assets/studyHand.png";
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
	const [modalShow, setModalShow] = React.useState(false);

	// 렌더링 시 카메라 켜기 및 데이터 가져오기
	useEffect(() => {
		getData();
	}, []);

	//집중도 체크 모델
	let standTime = focusTime; //참인 경우 집중 시간 증가
	let tickTime = focusTime;
	// 공부시간 증가
	useEffect(() => {
		//집중하고 있는 경우 증가
		const intervalId = setInterval(() => {
			if (tickTime < standTime + 7 || tickTime > standTime + 12) {
				setModalShow(false);
				console.log("집중 시간 상승 중");
				console.log(tickTime + " " + standTime);
				setFocusTime((focusTime) => focusTime + 1);
			} else {
				setModalShow(true);
			}
			tickTime += 1;
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
		return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds}`;
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
				end: today.getHours() * 3600 + today.getMinutes() * 60 + today.getSeconds(),
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
						<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
						{/* 공부 화면 시작 */}
						<div className="wording-div">
							<img className="study-img" src={studyHand}></img>
							<p className="studyHand-text">당신이 하고 있는 일에 온 정신을 집중하라</p>
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

function MyVerticallyCenteredModal(props) {
	return (
		<Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Body>
				<p className="modal-phone">핸드폰이 감지되었습니다.</p>
				<p className="modal-text">공부에 집중하세요!</p>
			</Modal.Body>
		</Modal>
	);
}

export default Single;
