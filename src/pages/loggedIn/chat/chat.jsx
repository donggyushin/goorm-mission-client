import "./style.scss";

import { Button, Form } from "react-bootstrap";
import React, { useEffect, useState } from "react";

import MessageComponent from "../../../components/message/MessageComponent";
import MyMessageComponent from "../../../components/message/MyMessageComponent";
import io from "socket.io-client";
import { socket_endpoint } from "../../../consts/consts";

const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
  timeout: 10000, //before connect_error and connect_timeout are emitted.
  transports: ["websocket"],
};

const socket = io(socket_endpoint);

const ChatPage = ({ userId }) => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  const selectUser = (userId) => {
    setSelectedUser((snapshot) => {
      if (snapshot === userId) return "";
      return userId;
    });
  };

  const postMessage = () => {
    if (message.length === 0) return;
    if (selectedUser) {
      const messageOb = {
        from: userId,
        type: "private",
        message,
        to: selectedUser,
      };
      socket.emit("chat", messageOb);
      setMessage("");
      return;
    }
    const words = message.split(" ");
    if (words[0] === "/귓") {
      if (words[1] && words[2]) {
        const messageOb = {
          from: userId,
          type: "private",
          message: words[2],
          to: words[1],
        };
        socket.emit("chat", messageOb);
      }
    } else {
      const messageOb = {
        from: userId,
        type: "public",
        message,
        to: "",
      };
      socket.emit("chat", messageOb);
    }

    setMessage("");
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const enterKeyPressed = (e) => {
    e.Handled = true;
    if (e.key === "Enter") {
      console.log("here!");
      e.preventDefault();
      postMessage();
    }
  };

  useEffect(() => {
    const scrollDiv = document.getElementById("chatlist");

    socket.emit("login", { id: userId });
    socket.on("messages", (data) => {
      setMessages(data);
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    });
    socket.on("login", (data) => {
      setCurrentUsers(data);
    });
    socket.on("disconnect", (data) => {
      setCurrentUsers(data);
    });
    socket.on("chat", (data) => {
      console.log("received message: ", data);

      setMessages((snapshot) => {
        const newMessages = snapshot.concat(data);
        return newMessages;
      });

      scrollDiv.scrollTop = scrollDiv.scrollHeight;
    });
    return function cleanup() {
      socket.disconnect();
    };
  }, []);

  return (
    <div className={"chat__container"}>
      <div className="column">
        <div className="user__list">
          <div className="title">User list.</div>
          <div className="list">
            <div className="my__name">{userId}</div>
            {currentUsers.map((user, index) => {
              if (user !== userId) {
                return (
                  <div
                    style={
                      selectedUser === user ? { color: "#ffbe0b" } : undefined
                    }
                    onClick={() => selectUser(user)}
                    key={index}
                  >
                    {user}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div id={"chatlist"} className="chatting__container">
          {messages.map((message, index) => {
            if (message.from === userId) {
              return <MyMessageComponent key={index} message={message} />;
            } else {
              if (message.type === "public") {
                return <MessageComponent key={index} message={message} />;
              } else {
                if (message.to === userId) {
                  return <MessageComponent key={index} message={message} />;
                }
              }
            }
          })}
        </div>
      </div>
      <div className="input__container">
        <Form.Group
          style={{ width: "90%", marginRight: "7px" }}
          controlId="exampleForm.ControlTextarea1"
        >
          <Form.Label>
            귓속말 하는 법: 유저리스트에서 원하는 유저를 클릭한 후 메시지를
            입력하세요.
          </Form.Label>
          <Form.Control
            onChange={handleMessage}
            value={message}
            onKeyUp={enterKeyPressed}
          />
        </Form.Group>

        <Button
          style={{
            width: "104px",
            height: "38px",
            position: "relative",
            top: "7px",
          }}
          variant="warning"
          onClick={postMessage}
        >
          전송
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
