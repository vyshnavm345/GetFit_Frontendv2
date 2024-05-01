import React, { useState } from "react";
import { useHistory, useNavigate } from "react-router-dom"; // for redirection

const RoomSelection = () => {
  const [roomName, setRoomName] = useState("lobby");
  const history = useNavigate();

  const handleRoomSubmit = (e) => {
    e.preventDefault();
    if (roomName) {
      history(`/chat/${roomName}`); // Redirect to chat room
    }
  };

  return (
    <div className="room-selection">
      <h2>Join a Chat Room</h2>
      <form onSubmit={handleRoomSubmit}>
        <label htmlFor="room-name">Room Name:</label>
        <input
          type="text"
          id="room-name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          required
        />
        <button type="submit">Enter</button>
      </form>
    </div>
  );
};

export default RoomSelection;
