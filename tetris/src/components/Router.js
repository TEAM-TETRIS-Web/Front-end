import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Navigation from './Navigation';
import Main from "../pages/main";
import Single from "../pages/single";
import Report from "../pages/report";
import RoomList from "../pages/roomList";

function AppRouter() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/single" element={<Single/>} />
        <Route path="/report" element={<Report />} />
        <Route path="/room" element={<RoomList />} />
      </Routes>
    </>
  ) 
}

export default AppRouter;