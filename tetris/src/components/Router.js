import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Navigation from './Navigation';
import Main from "../pages/main";
import Single from "../pages/single";
import Report from "../pages/report";
function AppRouter() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/single" element={<Single/>} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </>
  ) 
}

export default AppRouter;