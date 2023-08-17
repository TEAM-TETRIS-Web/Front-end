/* eslint-disable*/
import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

import "./community.css";

const Community = () => {
  let [content, setContent] = useState([{
    title : "양파는 맛있나요?",
    user : "고구마",
    date : "13 : 54",
    detail : "양파 속 퀘르세틴은 혈관 벽의 손상을 막고 건강에 나쁜 콜레스테롤(LDL) 농도를 낮추며, 혈압 수치도 낮춰준다. 양파에서 톡 쏘는 맛을 느끼게 해주는 유화아릴은 혈관을 확장시키는 데 도움을 준다. 알리신은 유해균의 증식을 억제하고 혈당수치를 감소시킨다. 또 혈소판이 엉기는 것을 방지하고 혈관 내의 섬유소 용해 작용을 도와주기 때문에 혈전이나, 뇌졸중 위험을 감소시키는 데 도움을 준다.",
    comments : ["감사합니다","그렇구요"]
  },
  {
    title : "바이너리 신청방법",
    user : "스마클",
    date : "13 : 54",
    detail : "바이너리 파이팅",
    comments : ["감사합니다","그렇구요"],
  }]);

  let navigate = useNavigate();

  return (
    <div className="blue-bg">
      <div className="container" style={{padding: "0.1px"}}>
        <div className="content-list-div white-bg">
          <p className="content-list-title">
            커뮤니티
          </p>
          {content.map(function (content, i) {
            return (
              <div key={i} className="col content-list">
                <span
                  className="col-8 title"
                  onClick={()=> {navigate(`/community/${i}`, {
                    state: {
                      title : content.title,
                      detail : content.detail,
                      comments : content.comments,
                    }
                  })}}
                >
                  {content.title}
                </span>
                <span className="col detail">
                  {content.user} | {content.date}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Community