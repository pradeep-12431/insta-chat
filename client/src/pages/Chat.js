import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./Chat.css";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5001");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  // ✅ Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!user) {
      alert("Please log in to continue.");
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    if (!user || !user.username) {
      alert("User not logged in.");
      return;
    }

    const newMessage = {
      text: message,
      username: user.username,
      avatar: user.profileImage || "https://i.pravatar.cc/150?u=" + user.username,
      timestamp: new Date().toLocaleTimeString(),
    };

    socket.emit("sendMessage", newMessage);
    
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <h2>InstaChat 💬</h2>

      <div className="messages-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.username === user?.username ? "self" : ""}`}
          >
            <img className="avatar" src={msg.avatar} alt="avatar" />
            <div className="msg-content">
              <div className="msg-text">{msg.text}</div>
              <div className="msg-meta">
                {msg.username} • {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
