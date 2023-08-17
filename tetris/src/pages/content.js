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
import "./content.css";

const Content = (props) => {
  const location = useLocation();
  const title = location.state.title;
  const detail = location.state.detail;
  const comments = location.state.comments;

  let [text, setText] = useState("");

  return (
    <div className="blue-bg">
      <div
        className="container"
        style={{ padding: "0.1px", paddingBottom: "5rem" }}
      >
        <div className="white-bg content-div">
          <p className="title">{title}</p>
          <p className="detail">{detail}</p>
          <div className="comment-div">
            {comments.map(function (comment, i) {
              return (
                <div key={i} className="row comment">
                  <span className="text">{comment}</span>
                </div>
              );
            })}
            <div className="addComment-div">
              <input
                type="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
              <button
                className="btn"
                onClick={() => {
                  setAddText(""); //
                }}
              >
               +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
