import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { endpoint } from '../../consts/consts'

const SignUpPage = () => {

  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const handleId = (event) => {
    setId(event.target.value)
  }

  const handlePw = (event) => {
    setPw(event.target.value)
  }

  const signUp = async () => {
    console.log("sign up")
    try {
      const response = await axios.post(`${endpoint}/api/account/signup`, {
        id, pw
      })

      const data = response.data
      if (data) {
        alert('회원가입 성공')
      } else {
        alert('회원가입 실패')
      }

    } catch (err) {
      alert('회원가입 실패')
      console.error(err.message)
    }
  }



  return <div>
    <input onChange={handleId} value={id} placeholder={"id"} />
    <input onChange={handlePw} value={pw} placeholder={"pw"} />
    <button onClick={signUp}>sign up</button>
    <Link to={"/"}>go to sign in page</Link>
  </div>
}

export default SignUpPage