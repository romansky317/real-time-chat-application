import React from "react";
import "./Chat.css";

import onlineIcon from "../../icons/onlineIcon.png";
import closeIcon from "../../icons/closeIcon.png";

const ChatHeader = ({ room }) => {
  return (
    <div className="chat_header">
      <div className="left_container">
        <img className="online_icon" src={onlineIcon} alt="icon_online" />
        <h3>{room}</h3>
      </div>
      <div className="right_container">
        <a href="/">
          {" "}
          <img src={closeIcon} alt="icon_close" />{" "}
        </a>
      </div>
    </div>
  );
};

export default ChatHeader;
