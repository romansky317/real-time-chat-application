import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Join.css";
import { motion } from "framer-motion";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className="join_outer_container">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="inner_container"
      >
        <h1 className="heading">Join</h1>
        <div>
          <input
            type="text"
            className="join_input"
            placeholder="Your Name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="join_input"
            placeholder="Enter room number..."
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          {room && name ? (
            <motion.button
              initial={{ x: -500 }}
              animate={{ x: 0 }}
              className="btn"
              type="submit"
            >
              Join Room
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="initial_join"
            >
              Please Enter your Name and Room
            </motion.div>
          )}
        </Link>
      </motion.div>
    </div>
  );
};

export default Join;
