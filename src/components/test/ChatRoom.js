import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { WS_link } from "config";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribers, getUserTrainers } from "features/trainer";
import Cookies from "js-cookie";
import { getMessages } from "features/chat";

const ChatRoom = () => {
  const { roomName } = useParams();
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const ws = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { programSubscribers, userTrainers } = useSelector((state) => state.trainer);
  const { conversation, loading } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user.is_trainer) {
      dispatch(getSubscribers());
    } else {
      dispatch(getUserTrainers());
    }
  }, []);

  useEffect(() => {
    if (user.is_trainer && programSubscribers[2] && user.id) {
      const idList = [programSubscribers[2]?.user, user.id].sort();
      setRoom(`chat${idList[0]}${idList[1]}`);
    } else if (!user.is_trainer && userTrainers[0] && user.id) {
      const idList = [userTrainers[0]?.user, user.id].sort();
      setRoom(`chat${idList[0]}${idList[1]}`);
    }
    
  }, [programSubscribers, userTrainers]);

  useEffect(()=>{
    if(room){
      dispatch(getMessages(room));
    }
  }, [room])

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
      const accessToken = Cookies.get("accessToken") || null; // Retrieve access token

      // Ensure ws.current is not null and connection is open before sending
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        const message = {
          message: messageInput,
          access_token: accessToken, // Include access token in message object
        };
        ws.current.send(JSON.stringify(message));
        setMessageInput("");
      } else {
        console.error("WebSocket connection not yet established");
      }
    }
  };

  useEffect(() => {
    if (room) {
      // ws.current = new WebSocket(`${WS_link}/ws/chat/${room}/`);
      ws.current.onopen = handleOpen;
      ws.current.onclose = handleClose;
      ws.current.onmessage = handleMessage;
      return () => {
        ws.current.close();
      };
    }
    ;
  }, [room]);
  return (
    <div className="chat-room">
      <h2>Chat Room: {room}</h2>
      <ul>
        {conversation?.map((item) => (
          <li key={item.id}>
            {item.message} - {item.sender} - {item.timestamp}
          </li>
        ))}
        {loading ? (
          <p>Loading messages...</p>
        ) : (
          messages?.map((item) => (
              <li key={item.message.id}>
                  {item.message.message} - {item.message.sender} - {item.message.timestamp}
              </li>
          ))
        )}
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
