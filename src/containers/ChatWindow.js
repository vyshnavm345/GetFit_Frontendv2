import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import ImageAndDetails from "components/cards/ImageAndDetails";
import logo from "assets/Get-fit-Logo.png";
import { useSelector } from "react-redux";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to control sidebar visibility (renamed for clarity)

  const user = useSelector((state) => state.user);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: newMessage, sender: "You" },
    ]);
    setNewMessage("");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`
          fixed 
          top-0 
          left-0 
          h-full 
          w-full 
          bg-gray-500 
          p-4 
          transition duration-300 ease-in-out 
          ${isSidebarOpen ? "z-50 translate-x-0" : "z-10 translate-x-full"}
        `}
      >
        <Link to="/">
          <div className="flex items-center">
            <img className="h-12 md:h-10 mr-2" src={logo} alt="logo" />
            <h1 className="text-white text-4xl cursor-pointer font-blackops-one md:block hidden">
              GET-FIT
            </h1>
          </div>
        </Link>
        <div className="hidden lg:flex items-center mb-4">
          <ImageAndDetails user={user} />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1 relative">
        {/* Chat header */}
        <div className="bg-gray-100 p-4 border-b">
          <h2 className="text-lg font-semibold">Chat with John Doe</h2>
          <button
            className="lg:hidden absolute right-4 top-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Hide" : "Show"} Sidebar
          </button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message, index) => (
            <div key={index} className="flex items-end mb-4">
              <div className="bg-blue-200 rounded-lg p-2 ml-2">
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="p-4 border-t flex items-center">
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 mr-4"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            onClick={handleSendMessage}
          >
            <IoSend />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
