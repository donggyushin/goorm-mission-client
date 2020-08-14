import './style.scss'

import React, { useEffect, useState } from 'react'

import io from 'socket.io-client';
import { socket_endpoint } from '../../../consts/consts'

const ChatPage = ({ userId }) => {
  const socket = io(socket_endpoint);

  const [currentUsers, setCurrentUsers] = useState([])
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])


  const postMessage = () => {

    const words = message.split(' ')
    if (words[0] === '/귓') {
      if (words[1] && words[2]) {
        const messageOb = {
          from: userId,
          type: 'private',
          message: words[2],
          to: words[1]
        }
        socket.emit('chat', messageOb)
      }
    } else {
      const messageOb = {
        from: userId,
        type: 'public',
        message,
        to: ''
      }
      socket.emit('chat', messageOb)
    }

    setMessage('')
  }

  const handleMessage = (e) => {
    setMessage(e.target.value)
  }

  useEffect(() => {

    const scrollDiv = document.getElementById('chatlist')

    socket.emit('login', { id: userId })
    socket.on('messages', data => {
      setMessages(data)
    })
    socket.on('login', (data) => {


      setCurrentUsers(data)

    })
    socket.on('disconnect', (data) => {
      setCurrentUsers(data)
    })
    socket.on('chat', (data) => {
      console.log('received message: ', data)

      setMessages((snapshot) => {
        const newMessages = snapshot.concat(data)
        return newMessages
      })

      scrollDiv.scrollTop = scrollDiv.scrollHeight;

    })
    return function cleanup() {
      socket.disconnect()
    }
  }, [])



  return <div className={'chat'}>
    <div className={'userlist'}>{
      currentUsers.map((user, index) => <div key={index}>{user}</div>)
    }</div>
    <div className={'chatlist__container'}>
      <div id={'chatlist'} className={'chatlist'}>{
        messages.map((message, index) => {

          if (message.type === 'public') {
            return <div key={index} className={'row'}>
              <span>{message.from} : </span><p>{message.message}</p>
            </div>
          } else {
            if (message.to === userId) {
              return <div key={index} className={'row'}>
                <span>{message.from}님의로부터의 귓속말 : </span><p>{message.message}</p>
              </div>
            } else if (message.from === userId) {
              return <div key={index} className={'row'}>
                <span>{message.to}님께 귓속말 : </span><p>{message.message}</p>
              </div>
            }
          }
        })
      }</div>
      <div className={'row2'}>
        <div className={'column'}>
          <input onChange={handleMessage} value={message} placeholder={'message...'} />
          <button onClick={postMessage}>send</button>
        </div>
        <p>귓속말하는 방법: /귓 [유저이름] 내용</p>
      </div>
    </div>
  </div>
}

export default ChatPage