import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

const Report = () => {
  let [focusTime, setFocusTime] = useState("02:10:25");
  let navigate = useNavigate();
  return (
    <div className="main-bg">
      <div className="container">
        <p>
          Focus MATE 분석 리포트
        </p>
        {/* 총 공부 시간 */}
        <div>
          <p>
            총 공부 시간
          </p>
          <div>
            <p>
              {focusTime}
            </p>
          </div>
        </div>
        {/* 총 공부 시간 끝 */}
        {/* 실제 집중 시간 */}
        <div>
          <p>
            실제 집중 시간
          </p>
          <div>
            <p>
              {focusTime}
            </p>
          </div>
        </div>
        {/* 실제 집중 시간 */}
        <div>
          총 공부 시간의 {"89%"}를 집중했어요!
        </div>
        {/* 실제 집중 시간 끝 */}
        <input
          type="button"
          value="메인 화면으로"
          onClick={()=>{navigate('/')}}
          />

      </div>
    </div>
  )
}

export default Report;