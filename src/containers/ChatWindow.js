import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import logo from "assets/Get-fit-Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, WS_link } from "config";
import ChatBubble from "components/layouts/ChatBubble";
import { getTrainerContacts, getUserContacts } from "features/trainer";
import Cookies from "js-cookie";
import { getMessages } from "features/chat";
import NotificationComponent from "components/layouts/NotificationComponent";
import { toast } from "react-toastify";

const ChatWindow = () => {
  const [room, setRoom] = useState("");
  const ws = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { userContacts, trainerContacts } = useSelector(
    (state) => state.trainer
  );
  const { conversation, loading } = useSelector((state) => state.chat);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contacts, setcontacts] = useState(trainerContacts || userContacts);
  const [messageList, setMessageList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  const messageListRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the message list whenever messages or loading state changes
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
    // console.log("The message list is : ",messageList)
  }, [messages, loading, messageList]);

  useEffect(() => {
    if (user?.is_trainer) {
      dispatch(getTrainerContacts());
      setCurrentChat(contacts[0]);
    } else {
      dispatch(getUserContacts());
      setCurrentChat(contacts[0]);
    }
  }, [user]);

  useEffect(() => {
    if (conversation) {
      setMessageList(conversation);
    }
  }, [conversation]);

  useEffect(() => {
    if (user?.is_trainer) {
      setcontacts(trainerContacts);
    } else {
      setcontacts(userContacts);
    }
  }, [trainerContacts, userContacts]);

  useEffect(() => {
    if (room) {
      dispatch(getMessages(room));
    }
  }, [room]);

  useEffect(() => {
    setCurrentChat(contacts[0]);
  }, [contacts]);

  useEffect(() => {
    if (user?.is_trainer && trainerContacts && currentChat) {
      const idList = [currentChat?.id, user?.id].sort();
      setRoom(`chat${idList[0]}${idList[1]}`);
    } else if (!user?.is_trainer && userContacts && currentChat) {
      const idList = [currentChat?.user, user?.id].sort();
      setRoom(`chat${idList[0]}${idList[1]}`);
    }
  }, [currentChat]);

  useEffect(() => {
    if(room){
      ws.current = new WebSocket(`${WS_link}/ws/chat/${room}/`);
      ws.current.onopen = handleOpen;
      ws.current.onclose = handleClose;
      ws.current.onmessage = handleMessage;
      return () => {
        ws.current.close();
      };
    }
  }, [room]);

  const handleClickConversation = (conver) => {
    setCurrentChat(conver);
    console.log("THe current one is", conver, currentChat);
    // setMessage(""); // Clear message input on chat change
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleOpen = () => {
    console.log("Connected to WebSocket server");
  };

  const handleClose = () => {
    console.error("Chat socket closed unexpectedly");
  };

  const handleMessage = (event) => {
    const data = JSON.parse(event.data);
    setMessageList((prevMessages) => [...prevMessages, data.message]);
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
          receiver: currentChat?.user_id,
        };
        ws.current.send(JSON.stringify(message));
        setMessageInput("");
      } else {
        console.error("WebSocket connection not yet established");
      }
    }
  };
  // console.log("This is the room", room)
  // console.log("The user is ", user)
  // console.log("The user contact ", userContacts);
  // console.log("The trainer contact ", trainerContacts);
  // console.log("The conversation ", conversation);
  // console.log("The contacts ", contacts);
  console.log("The currentchat ", currentChat);
  return (
    // <NotificationComponent></NotificationComponent>
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`
            fixed 
            top-0 
            left-0 
            h-full 
            w-[90%]
            sm:w-[34%]
            md:w-[30%]
            lg:w-[20%] 
            bg-gray-500 
            p-3 
            transition duration-300 ease-in-out 
            ${isSidebarOpen ? "z-10 -translate-x-0" : "z-50 -translate-x-full"}
            `}
      >
        <Link to="/">
          <div className="flex  justify-start">
            <img className="h-12 md:h-10 mr-2" src={logo} alt="logo" />
            <h1 className="text-white text-4xl cursor-pointer font-blackops-one md:block hidden">
              GET-FIT
            </h1>
          </div>
        </Link>

        <div className="w-full h-[88%] bg-gray-800 text-white overflow-y-auto px-1 mt-5">
          <Link to="/trainerDashboard">
            <div className="hidden lg:flex items-center m-2 p-2 cursor-pointer">
              {/* <ImageAndDetails user={user} /> */}
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={`${API_URL}${user?.profile_picture}`}
                alt="avatar"
              />
              <span className="capitalize ml-3">
                {user?.first_name} {user?.last_name}
              </span>
            </div>
          </Link>
          <h1 className="text-xl font-bold mb-4 uppercase underline text-blue-100">
            contacts
          </h1>
          {contacts.map((conver) => (
            <div
              key={conver.id}
              className={`conversation-item p-2 hover:opacity-60 cursor-pointer ${
                currentChat?.id === conver?.id ? "bg-green-700" : ""
              }`}
              onClick={() => handleClickConversation(conver)}
            >
              <h1 className="text-lg font-bold">
                {conver.username ||
                  `${conver.first_name}   ${conver.last_name}`}
              </h1>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div
        className={
          isSidebarOpen
            ? `flex flex-col flex-1 relative w-full sm:w-[34%] md:ml-[30%] lg:ml-[20%] transition duration-300 ease-in `
            : "flex flex-col flex-1 relative"
        }
      >
        {/* Chat header */}
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="flex items-center text-lg font-semibold align-middle">
            <img
              className="rounded-full h-10 w-10 mr-2 object-cover"
              src={`${API_URL}${currentChat?.profile_picture}`}
              alt="Avatar"
            />
            {currentChat?.username ||
              `${currentChat?.first_name}  ${currentChat?.last_name}`}
          </h2>
          <button
            className=" absolute right-4 top-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Hide" : "Show"} Sidebar
          </button>
        </div>

        {/* Chat messages */}
        <div
          ref={messageListRef}
          className="flex-1 overflow-y-auto p-4 no-scrollbar"
        >
          {loading ? (
            <p>Loading messages...</p>
          ) : (
            messageList?.map((message) => (
              <div
                key={message.id}
                className={` flex mb-4 ${
                  message.sender === user.id
                    ? " justify-start ml-2"
                    : "justify-end mr-2"
                }`}
              >
                <div>
                  <ChatBubble
                    user={user}
                    username={
                      message.sender === user.id
                        ? user.first_name
                        : currentChat.username || currentChat.first_name
                    }
                    key={message.id}
                    message={message}
                    trainer_id={user.id}
                    profile_picture={currentChat.profile_picture}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chat input */}
        <form
          className="p-4 border-t flex items-center"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 mr-4"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
            <IoSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
