import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useHistory } from 'react-router-dom'

import LoggedInRoute from './routes/LoggedInRoute'
import LoggedOutRoute from './routes/LoggedOutRoute'
import axios from 'axios'
import { endpoint } from './consts/consts'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState('')
  const history = useHistory()
  useEffect(() => {
    checkLoggedIn()
  }, [])

  const login = () => {
    setIsLoggedIn(true)
    history.push('/')
  }

  const logout = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/account/signout`, { withCredentials: true })
      const data = response.data
      if (data) {
        setIsLoggedIn(false)
        history.push('/')

      } else {
        alert('fail to logout')
      }
    } catch (err) {
      alert('fail to logout')
    }

  }

  const checkLoggedIn = async () => {
    try {
      const response = await axios.get(`${endpoint}/api/account/status`, { withCredentials: true })
      const data = response.data
      console.log(data)
      if (data) {
        setUserId(data)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (err) {
      console.log(err.message)
      setIsLoggedIn(false)
    }

  }

  if (isLoggedIn) {
    return <LoggedInRoute logout={logout} userId={userId} />
  } else {
    return <LoggedOutRoute setUserId={setUserId} login={login} />
  }

}

export default App;
