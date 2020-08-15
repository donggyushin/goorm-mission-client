import { Button, Form, Nav, Navbar } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";

import Chat from "../pages/loggedIn/chat/chat";
import Main from "../pages/loggedIn/main";

export default function App({ userId, logout }) {
  const [main, setMain] = useState(true);
  const [chat, setChat] = useState(false);
  const history = useHistory();

  useEffect(() => {
    updateCurrentPath();
  });

  const goToMainRoute = () => {
    history.push("/");
    setMain(true);
    setChat(false);
  };

  const updateCurrentPath = () => {
    const pathName = window.location.pathname;
    if (pathName === "/chat") {
      setChat(true);
      setMain(false);
    } else {
      setChat(false);
      setMain(true);
    }
  };

  const goToChatRoute = () => {
    history.push("/chat");
    setChat(true);
    setMain(false);
  };
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Goorm</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              style={main ? { fontWeight: "bold", color: "black" } : undefined}
              href="/"
            >
              Project
            </Nav.Link>
            <Nav.Link
              style={chat ? { fontWeight: "bold", color: "black" } : undefined}
              href="/chat"
            >
              Chat
            </Nav.Link>
          </Nav>
          <Form inline>
            <Button onClick={logout} variant="outline-success">
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/chat">
          <Chat userId={userId} />
        </Route>
        <Route exact path="/">
          <Main logout={logout} />
        </Route>
        <Route>
          <Main logout={logout} />
        </Route>
      </Switch>
    </div>
  );
}
