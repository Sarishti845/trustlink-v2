import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminMessages.css";
import { API_BASE_URL } from '../config';

function AdminMessages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/chat`);
        setMessages(res.data.data);
      } catch (err) {
        console.error("Error fetching chat messages:", err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="admin-messages-container">
      <h1>💬 Customer Support Messages</h1>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <div className="messages-list">
          {messages.map((msg) => (
            <div key={msg._id} className="message-card">
              <p className="msg-text">"{msg.message}"</p>
              <p className="msg-time">
                {new Date(msg.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminMessages;
