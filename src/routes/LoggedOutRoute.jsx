import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import React from "react";
import SignIn from '../pages/loggedOut/signin'
import SignUp from '../pages/loggedOut/signup'

export default function App({ login, setUserId }) {
  return (

    <div>
      <Switch>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/">
          <SignIn setUserId={setUserId} login={login} />
        </Route>
        <Route>
          <SignIn setUserId={setUserId} login={login} />
        </Route>
      </Switch>
    </div>

  );
}