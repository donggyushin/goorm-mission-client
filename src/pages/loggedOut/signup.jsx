import "./signupStyles.scss"

import { Button, Form } from 'react-bootstrap'
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



  return <div className={'signup__container'}>
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

          <Link to={"/"}>go to sign in page</Link>
        </Form.Group>

        <Button onClick={signUp} variant="primary" type="submit">
          Sign Up
  </Button>
      </Form>
    </div>
  </div>
}

export default SignUpPage