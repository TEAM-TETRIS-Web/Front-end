import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Navigation from './Navigation';
import Main from "../pages/main";

function AppRouter() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  ) 
}

export default AppRouter;