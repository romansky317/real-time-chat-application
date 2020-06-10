import React from "react";
import "./TextInputField.css";

const TextInputField = ({ setMessage, sendMessage, message }) => {
  return (
    <form className="form">
      <input
        className="input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={({ target: { value } }) => setMessage(value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage(e)}
      />
      <button className="send_btn" onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
};

export default TextInputField;
