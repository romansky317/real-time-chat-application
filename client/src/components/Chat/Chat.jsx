import React, { useState, useEffect } from "react";
import "./Chat.css";

// Retrieve data from URL
import queryString from "query-string";
import io from "socket.io-client";
import ChatHeader from "./ChatHeader";
import TextInputField from "../TextInput/TextInputField";
import Messages from "../Messages/Messages";

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const SERVER_ENDPOINT = "https://real-time-chat-app-backend.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(SERVER_ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [SERVER_ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  // Sending Messages
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };
  return (
    <div className="outer_container">
      <div className="nav">
        <div></div>
      </div>
      <div className="container">
        <ChatHeader room={room} />
        <Messages messages={messages} name={name} />
        <TextInputField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
