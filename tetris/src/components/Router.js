import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Navigation from './Navigation';
import Main from "../pages/main";
import Single from "../pages/single";
import Report from "../pages/report";
import RoomList from "../pages/roomList";
import Room from "../pages/room"; 

function AppRouter() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/single" element={<Single/>} />
        <Route path="/report" element={<Report />} />
        <Route path="/roomlist" element={<RoomList />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </>
  ) 
}

export default AppRouter;