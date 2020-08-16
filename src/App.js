import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import LoggedInRoute from "./routes/LoggedInRoute";
import LoggedOutRoute from "./routes/LoggedOutRoute";
import axios from "axios";
import { endpoint } from "./consts/consts";

let whatchingLoggedInInterval;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const history = useHistory();

  useEffect(() => {
    checkLoggedIn();

    return function cleanup() {
      clearInterval(whatchingLoggedInInterval);
    };
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    whatchingLoggedInInterval = setInterval(watchingLoggedIn, 10000);
    history.push("/");
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/account/signout`, {
        withCredentials: true,
      });
      const data = response.data;
      if (data) {
        setIsLoggedIn(false);
        clearInterval(whatchingLoggedInInterval);
        history.push("/");
      } else {
        alert("fail to logout");
      }
    } catch (err) {
      alert("fail to logout");
    }
  };

  const watchingLoggedIn = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/account/status`, {
        withCredentials: true,
      });
      const data = response.data;
      if (!data) {
        alert("서버측에서 세션이 만료되어져서 로그아웃 되어집니다. ");
        clearInterval(whatchingLoggedInInterval);
        setIsLoggedIn(false);
      }
    } catch (err) {
      alert("서버측에서 세션이 만료되어져서 로그아웃 되어집니다. ");
      clearInterval(whatchingLoggedInInterval);
      setIsLoggedIn(false);
    }
  };

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/account/status`, {
        withCredentials: true,
      });
      const data = response.data;

      if (data) {
        setUserId(data);
        setIsLoggedIn(true);
        whatchingLoggedInInterval = setInterval(watchingLoggedIn, 10000);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.log(err.message);
      setIsLoggedIn(false);
    }
  };

  if (isLoggedIn) {
    return <LoggedInRoute logout={logout} userId={userId} />;
  } else {
    return <LoggedOutRoute setUserId={setUserId} login={login} />;
  }
}

export default App;
