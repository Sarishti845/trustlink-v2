import React, { useState } from "react";
import "./SupportChatWidget.css";
import { FaComments, FaPaperPlane, FaTimes } from "react-icons/fa";
import axios from "axios";
import { API_BASE_URL } from '../config';

function SupportChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add message locally
    const newMessage = { sender: "user", text: message };
    setChatHistory((prev) => [...prev, newMessage]);

    try {
      // Send to backend (store in MongoDB)
      await axios.post(`${API_BASE_URL}/api/chat`, { message });

      // Optional auto-reply simulation
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { sender: "bot", text: "Thanks for reaching TrustLink Support! Our team will reply shortly." },
        ]);
      }, 700);
    } catch (err) {
      console.error(err);
    }

    setMessage("");
  };

  return (
    <div className="chat-widget-container">
      {!isOpen ? (
        <button className="chat-button" onClick={() => setIsOpen(true)}>
          <FaComments />
        </button>
      ) : (
        <div className="chat-box">
          <div className="chat-header">
            <span>💬 TrustLink Support</span>
            <FaTimes className="close-icon" onClick={() => setIsOpen(false)} />
          </div>

          <div className="chat-body">
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === "user" ? "user-msg" : "bot-msg"}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupportChatWidget;
