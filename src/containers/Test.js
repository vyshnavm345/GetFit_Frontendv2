import ChatRoom from "components/test/ChatRoom";
import React, { useState } from "react";
import { useParams, useHistory, useNavigate } from "react-router-dom";
// import ChatRoom from "./components/ChatRoom"; // Assuming ChatRoom is in components folder

const Test = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const { history } = useNavigate();

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    if (selectedRoom) {
      history(`/chat/${selectedRoom}`); // Redirect to chat room with room name
    }
  };

  return (
    <div className="chat-app">
      {!selectedRoom && (
        <div className="room-selection">
          <h2>Join a Chat Room</h2>
          <form onSubmit={handleRoomSubmit}>
            <label htmlFor="room-name">Room Name:</label>
            <input
              type="text"
              id="room-name"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              required
            />
            <button type="submit">Enter</button>
          </form>
        </div>
      )}
      {selectedRoom && <ChatRoom roomName={selectedRoom} />}{" "}
      {/* Render ChatRoom only if roomName exists */}
    </div>
  );
};

export default Test;
