import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Navigation from './Navigation';
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

function AppRouter() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/single" element={<Single/>} />
        <Route path="/report" element={<Report/>} />
        <Route path="/roomlist" element={<RoomList />} />
        <Route path="/room/:id" element={<Room />} />

        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<Content />} />
        <Route path="/community/new" element={<AddContent />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </>
  ) 
}

export default AppRouter;