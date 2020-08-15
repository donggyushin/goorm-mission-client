import "./myMessage.scss";

import React from "react";

const MyMessageComponent = ({ message }) => {
  return (
    <div className="my__message">
      <span
        style={message.type === "public" ? { display: "none" } : undefined}
        className="to"
      >
        {message.to} 에게
      </span>
      <p
        style={
          message.type === "private"
            ? { backgroundColor: "#ffbe0b", color: "black" }
            : undefined
        }
        className={"message__bubble"}
      >
        {message.message}
      </p>
    </div>
  );
};

export default MyMessageComponent;
