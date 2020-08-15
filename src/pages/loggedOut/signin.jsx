import "./signinStyles.scss"

import { Button, Form } from 'react-bootstrap'
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

  return <div className="signin__container">
    <div className="input__container">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control onChange={handleId} value={id} type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your id with anyone else.
    </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control onChange={handlePw} value={pw} type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group>

          <Link to={"signup"}>Don't you have an account yet?</Link>
        </Form.Group>

        <Button onClick={signIn} variant="primary" type="submit">
          Sign In
  </Button>
      </Form>
    </div>


  </div>
}

export default SignInPage