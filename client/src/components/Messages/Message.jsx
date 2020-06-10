import React from "react";
import "./Message.css";
import ReactEmoji from "react-emoji";
import { motion } from "framer-motion";

const Message = ({ name, message }) => {
  let isSentByCurUser = false;

  const trimmedName = name.trim();

  if (message.user === trimmedName) {
    isSentByCurUser = true;
  }

  return isSentByCurUser ? (
    <div className="message_container justify_end">
      <p className="sent_text padding_right">{trimmedName} </p>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="message_box bg_blue"
      >
        <motion.p
          className="msg_txt color_white"
          transition={{ duration: 0.5 }}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          {" "}
          {ReactEmoji.emojify(message.text)}{" "}
        </motion.p>
      </motion.div>
    </div>
  ) : (
    <div className="message_container justify_start">
      <motion.div
        className="message_box  bg_light"
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
      >
        <motion.p
          className="msg_txt color_dark"
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          {ReactEmoji.emojify(message.text)}{" "}
        </motion.p>
      </motion.div>
      <p className="sent_text padding_left">{message.user} </p>
    </div>
  );
};

export default Message;
