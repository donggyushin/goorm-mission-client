import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../../consts/consts'

const SignInPage = ({ login, setUserId }) => {

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const handleId = (event) => {
    setId(event.target.value)
  }

  const handlePw = (event) => {
    setPw(event.target.value)
  }

  const signIn = async () => {
    console.log("sign in")
    try {
      const response = await axios.post(`${endpoint}/api/account/signin`, {
        id, pw
      }, { withCredentials: true })
      const data = response.data
      if (data) {

        login()
        setUserId(data)

      } else {
        alert('로그인 실패')
      }
    } catch (err) {
      alert('로그인 실패')
      console.log(err.message)
    }
  }

  return <div>
    <input onChange={handleId} value={id} placeholder={"id"} />
    <input onChange={handlePw} value={pw} placeholder={"pw"} />
    <button onClick={signIn}>submit</button>
    <Link to={"signup"}>go to sign up page</Link>
  </div>
}

export default SignInPage