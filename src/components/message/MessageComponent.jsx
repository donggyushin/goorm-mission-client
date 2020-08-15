import "./message.scss";

import React from "react";

const MessageComponent = ({ message }) => {
  return (
    <div className={"message"}>
      <span className={"name"}>{message.from}</span>
      <p
        style={
          message.type === "private" ? { background: "#ffbe0b" } : undefined
        }
        className={"message__bubble"}
      >
        {message.message}
      </p>
    </div>
  );
};

export default MessageComponent;
