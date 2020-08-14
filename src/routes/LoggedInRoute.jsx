import './loggedInStyle.scss'

import React, { useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory
} from "react-router-dom";

import Chat from '../pages/loggedIn/chat/chat'
import Main from '../pages/loggedIn/main'

export default function App({ userId, logout }) {

  const [main, setMain] = useState(true)
  const [chat, setChat] = useState(false)
  const history = useHistory()

  const goToMainRoute = () => {
    history.push('/')
    setMain(true)
    setChat(false)
  }

  const goToChatRoute = () => {
    history.push('/chat')
    setChat(true)
    setMain(false)
  }
  return (

    <div>
      <div className={'nav'}>
        <div onClick={goToMainRoute} className={main ? 'selected' : undefined} >
          project
          </div>
        <div onClick={goToChatRoute} className={chat ? 'selected' : undefined}>
          chatting
          </div>
      </div>
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