import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import "./signin.css";
import "./common/common.css";


const Signin = () => {

    return(
        <div>
            <div>
                <p className = "main-title none-margin">FocusStudy</p><br/>
                <p className = "main-subtitle none-margin">집중하면서 공부하고 싶다면,</p>
            </div>
        </div>
    );
};

export default Signin;
