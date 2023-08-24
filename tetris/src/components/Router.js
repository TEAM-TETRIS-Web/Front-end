import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import Main from "../pages/main";
import Login from "../pages/login";
import Signin from "../pages/signin";
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
  // let isLoggedIn = props.isLoggedIn;
  let isLoggedIn = true;
  
  return (
    <>
      {isLoggedIn ? <Navigation isLoggedIn={props.isLoggedIn} /> : <></>}
      <Routes>
        {isLoggedIn ? <Route path="/" element={<Main />} /> : <></>}
        {isLoggedIn ? <Route path="/single" element={<Single />} /> : <></>}
        {isLoggedIn ? <Route path="/report" element={<Report />} /> : <></>}
        {isLoggedIn ? <Route path="/roomlist" element={<RoomList />} /> : <></>}
        {isLoggedIn ? <Route path="/room/:id" element={<Room />} /> : <></>}
        {isLoggedIn ? (
          <Route path="/community" element={<Community />} />
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <Route path="/community/:id" element={<Content />} />
        ) : (
          <></>
        )}
        {isLoggedIn ? (
          <Route path="/community/new" element={<AddContent />} />
        ) : (
          <></>
        )}
        {isLoggedIn ? <Route path="/mypage" element={<Mypage />} /> : <></>}
      </Routes>
    </>
  );
}

export default AppRouter;
