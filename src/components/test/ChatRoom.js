import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const ChatRoom = () => {
  const { roomName } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const ws = useRef(null);

  const handleOpen = () => {
    console.log("Connected to WebSocket server");
  };

  const handleClose = () => {
    console.error("Chat socket closed unexpectedly");
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    setMessages((prevMessages) => [...prevMessages, data]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput) {
      // Ensure ws.current is not null and connection is open before sending
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify({ message: messageInput }));
        setMessageInput("");
      } else {
        console.error("WebSocket connection not yet established");
      }
    }
  };

  useEffect(() => {
    ws.current = new WebSocket(
      `ws://${window.location.host}/ws/chat/${roomName}/`
    );
    ws.current.onopen = handleOpen;
    ws.current.onclose = handleClose;
    ws.current.onmessage = handleMessage;

    return () => {
      ws.current.close();
    };
  }, [roomName]);

  return (
    <div className="chat-room">
      <h2>Chat Room: {roomName}</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
