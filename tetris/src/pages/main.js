import React, { useState, useEffect } from "react";

const Main = () => {
  let today = new Date();
  let week = ["일", "월", "화", "수", "목", "금", "토" ];
  let [focusTime, setFocusTime] = useState("02:10:25");

  return (
    <div className="container">
      <p>
        {today.getMonth() + 1}월{today.getDate()}({week[today.getDay()]})
      </p>
      {/* 메인창 */}
      <div className="row">
        <div className="col">
          {/* Focus Time  */}
          <div className="time-div">
            <p>Focus Time</p>
            <p>{focusTime}</p>
            <input
              type="button"
              value="공부 시작하기"
              />
          </div>
          {/* Focus Time 끝 */}
          {/* 총 공부 시간, 최대 집중 시간, 시작 시간, 종료 시간 */}
          <div className="row">
            <div className="col-6">
              <p>총 공부 시간</p>
              <p>08:08:08</p>
            </div>
            <div className="col-6">
              <p>최대 집중 시간</p>
              <p>08:08:08</p>
            </div>
            <div className="col-6">
              <p>시작 시간</p>
              <p>08:08:08</p>
            </div>
            <div className="col-6">
              <p>종료 시간</p>
              <p>08:08:08</p>
            </div>
          </div>
          {/* 총 공부 시간, 최대 집중 시간, 시작 시간, 종료 시간 끝 */}
          <div className="row">
            <div className="col">
              그림
            </div>
            <div className="col">
              <p>전체 랭킹</p>
              <p>상위 3%</p>
              <p>달성했어요!</p>
              <p>전체 543등</p>
            </div>
          </div>
        </div>
        
        {/* Focus To Do */}
        <div className="toDo-div col">
          <p>Focus TO DO</p>
          {/* TodoList 목록 */}
          <div className="toDoList-div">
            <div className="toDoList row">
              <input
                className="toDolist-checkbox col-1"
                type="checkbox"
              />
              <p className="col">백준</p>
            </div>
          </div>
          {/* TodoList 목록 끝 */}
          {/* 할일 추가 창 */}
          <div className="AddToDo-div">
            <input
              type="text"
              placeholder="할 일 추가하기"
            />
            <input
              type="button"
            />
          </div>
          {/* 할일 추가 창 끝 */}
        </div>
      </div>
    </div>
  )
}

export default Main;