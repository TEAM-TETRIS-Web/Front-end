import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Main from "../pages/main";
import Login from "../pages/login";
import Single from "../pages/single";
import Report from "../pages/report";
import RoomList from "../pages/roomList";
import Room from "../pages/room";

import Community from "../pages/community";
import Content from "../pages/content";
import AddContent from "../pages/addContent";
import Mypage from "../pages/mypage";

import React, { useState, useEffect } from "react";

function AppRouter(props) {
  let isLoggedIn = props.isLoggedIn;
  
  return (
    <>
      {isLoggedIn ? <Navigation isLoggedIn={props.isLoggedIn} /> : <></>}
      <Routes>
        {isLoggedIn ? <></> : <Route path="/" element={<Login/>} />}
        {isLoggedIn ? <Route path="/" element={<Main userObj={props.userObj}/>} /> : <></>}
        {isLoggedIn ? <Route path="/single" element={<Single userObj={props.userObj} />} /> : <></>}
        {isLoggedIn ? <Route path="/report" element={<Report />} /> : <></>}
        {isLoggedIn ? <Route path="/roomlist" element={<RoomList userObj={props.userObj} />} /> : <></>}
        {isLoggedIn ? <Route path="/room/:url" element={<Room userObj={props.userObj}/>} /> : <></>}
        {isLoggedIn ? (
          <Route path="/community" element={<Community />} />
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <Route path="/community/:url" element={<Content />} />
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <Route path="/community/new" element={<AddContent />} />
        ) : (
          <></>
        )}
        {isLoggedIn ? <Route path="/mypage" element={<Mypage userObj={props.userObj}/>} /> : <></>}
      </Routes>
    </>
  );
}

export default AppRouter;
