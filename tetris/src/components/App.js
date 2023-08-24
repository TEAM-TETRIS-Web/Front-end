import './App.css';
import Router from './Router';
import { authService } from "./../fbase";
import React, { useState, useEffect } from "react";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    //로그인 상태 감지
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
        console.log("is logged in");
      } else {
        setIsLoggedIn(false);
        console.log("no logged");
      }
      setInit(true);
    });
  }, []);


  return (
    <div className="App">
      <Router isLoggedIn={isLoggedIn} userObj={userObj} />
    </div>
  );
}

export default App;
