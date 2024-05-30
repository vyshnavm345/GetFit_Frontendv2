import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoSend } from "react-icons/io5";
import logo from "assets/Get-fit-Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { API_URL, WS_link } from "config";
import ChatBubble from "components/layouts/ChatBubble";
import { getTrainerContacts, getUserContacts } from "features/trainer";
import Cookies from "js-cookie";
import { getMessages } from "features/chat";
import { MdOnlinePrediction } from "react-icons/md";
import ForwardMessageModal from "components/chat/ForwardMessageModal";
import { RiImageAddFill } from "react-icons/ri";
import ImageChatBubble from "components/chat/ImageChatBubble";
import ImagePreview from "components/chat/ImagePreview";
import img1 from "assets/heroImage.jpg"

const ChatWindow = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const [room, setRoom] = useState("");
  const ws = useRef(null);
  const { user } = useSelector((state) => state.user);
  const { userContacts, trainerContacts } = useSelector(
    (state) => state.trainer
  );
  const { pendingNotifications } = useSelector((state) => state.chat);
  // const [notification, setNotification] = useState([])
  const { conversation, loading } = useSelector((state) => state.chat);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contacts, setcontacts] = useState(trainerContacts || userContacts);
  const [messageList, setMessageList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const dispatch = useDispatch();
  const [groupedNotifications, setGroupedNotifications] = useState(null);
  const { onlineusers } = useSelector((state) => state.websocket);
  const [isForwardModalOpen, setIsForwardModalOpen] = useState(false);
  const [ forwardingMessage, setForwardingMessage] = useState(null)
  const [messageType, setMessageType] = useState('text')

  const messageListRef = useRef(null);
  const [imageData, setImageData] = useState(null);
  const imageInputRef = useRef(null);
  const [choosenImage, setChoosenImage] = useState(null)

  useEffect(() => {
  }, [onlineusers]);
  useEffect(() => {
    if (pendingNotifications) {
      const grouped = pendingNotifications.reduce((acc, notification) => {
        if (!acc[notification.sender_id]) {
          acc[notification.sender_id] = {
            sender_id: notification.sender_id,
            count: 1,
          };
        } else {
          acc[notification.sender_id].count++;
        }
        return acc;
      }, {});
      setGroupedNotifications(grouped); // <-- Setting the state variable
    }
  }, [pendingNotifications]);

  useEffect(() => {
    // Scroll to the bottom of the message list whenever messages or loading state changes
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [loading, messageList]);

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

  const createNewRoom = ()=>{
    console.log("the current chat changed and new room is being created");
    if (user?.is_trainer && trainerContacts && currentChat) {
      const idList = [currentChat?.id, user?.id].sort();
      setRoom(`chat${idList[0]}${idList[1]}`);
    } else if (!user?.is_trainer && userContacts && currentChat) {
      const idList = [currentChat?.user, user?.id].sort();
      setRoom(`chat${idList[0]}${idList[1]}`);
    }
    console.log("the new room is ", room);
  }



  const makeNewNewRoom = (id1, id2)=>{
      const idList = [id1, id2].sort();
      return `chat${idList[0]}${idList[1]}`;
    }
   

  useEffect(() => {
    createNewRoom();
  }, [currentChat]);

  

  useEffect(() => {
    if (room) {
      console.log("the newly connected room is ", room)
      ws.current = new WebSocket(`${WS_link}/ws/chat/${room}/`);
      ws.current.onopen = handleOpen;
      ws.current.onclose = handleClose;
      ws.current.onmessage = handleMessage;
      return () => {
        ws.current.close();
      };
    }
  }, [room]);



  const handleImageInputChange = (event) => {
    const file = event.target.files[0];
    setChoosenImage(event.target.files[0])
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64StringWithPrefix = e.target.result;
        const base64String = base64StringWithPrefix.split(",")[1];
        setImageData(base64String); // e.target.result contains the base64 representation of the selected image
      };
      reader.readAsDataURL(file);
    }
    setMessageType('image');
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    imageInputRef.current.click();
  };


  // Function to open the forward message modal
  const openForwardModal = () => {
    setIsForwardModalOpen(true);
  };

  // Function to close the forward message modal
  const closeForwardModal = () => {
    setIsForwardModalOpen(false);
  };

  const updateCurrentChat = (contact) => {
    setCurrentChat(contact);
    console.log("The current chat is now:", currentChat);
  };


  const handleForwardMessage = async (selectedUsers) => {
    console.log(
      "the forwardingMessage : ",
      forwardingMessage
    );
    console.log("the selected users", selectedUsers)
    // Retrieve access token
    const accessToken = Cookies.get("accessToken") || null;
    let logoBase64 = null;
    // Load image and convert to base64
    if (forwardingMessage.image !== undefined){

      logoBase64 = await loadImageAndConvertToBase64(
        forwardingMessage.image
      );
      console.log("image converted to base64 : ", logoBase64 )
    }

    // Reusable function to send the message
    const sendMessage = (userId) => {
      console.log("message is being forwarded")
      const newRoom = makeNewNewRoom(user?.id, userId);
      const ws = new WebSocket(`${WS_link}/ws/chat/${newRoom}/`);
      console.log("websocket : ", ws);
      ws.onopen = () => {
        console.log("websocket opened");

        const message = {
          message: forwardingMessage.message,
          access_token: accessToken, // Include access token
          receiver: userId,
          type: forwardingMessage.type,
          data: logoBase64,
        };
        console.log("constructed message is :", message);

        ws.send(JSON.stringify(message));
        console.log("message sent")
        ws.close(); // The WebSocket closes after sending the message
        console.log("websocket closed")
      };

      ws.onerror = (error) => {
        console.error("WebSocket encountered an error:", error);
      };
    };

    // Iterate through selected users and send the message
    selectedUsers.forEach(sendMessage);

    // The modal closes after forwarding the message
    closeForwardModal();
  };

  const handleOnForward = (data) => {
    setForwardingMessage(data);
    openForwardModal();

  }

  // const onDelete = ()=>{

  // }

  const handleClickConversation = (conver) => {
    setCurrentChat(conver);
    setMessageList([]);
    const { [conver?.id]: _, ...rest } = groupedNotifications;
    setGroupedNotifications(rest);
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


  const loadImageAndConvertToBase64 = async (url) => {
    const fullUrl = `${API_URL}${url}`
    const response = await fetch(fullUrl);
    const blob = await response.blob();

    const reader = new FileReader();
    reader.readAsDataURL(blob);

    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        const base64StringWithPrefix = reader.result; // Complete base64 string with MIME type prefix
        const base64String = base64StringWithPrefix.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = reject;
    });
  };


  

  const handleSendMessage = async (e) => {
    setChoosenImage(null);
    if (e) {
      e.preventDefault();
    }
    try {

      const sendingMessage =
      messageInput.length < 1 &&
      messageType !== "text" ?
      `Message from ${user?.first_name}` : messageInput;
      if (messageInput || sendingMessage) {
        const accessToken = Cookies.get("accessToken") || null; // Retrieve access token
        // Ensure ws.current is not null and connection is open before sending
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          const message = {
            message: sendingMessage,
            access_token: accessToken, // Include access token in message object
            receiver: currentChat?.user_id,
            type: messageType,
            data: imageData ? imageData : null,
            // data: formData,
          };
          ws.current.send(JSON.stringify(message));
          setMessageInput("");
        } else {
          console.error("WebSocket connection not yet established");
        }
        setMessageType('text')
      }
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  // console.log("The image data is ", imageData)
  // console.log("This is the room", room)
  // console.log("The user is ", user)
  // console.log("The user contact ", userContacts);
  // console.log("The trainer contact ", trainerContacts);
  // console.log("The conversation ", conversation);
  // console.log("The contacts ", contacts);
  // console.log("The currentchat ", currentChat);
  return (
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
                src={
                  user?.profile_picture
                    ? `${API_URL}${user?.profile_picture}`
                    : logo
                }
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
              key={conver?.id}
              className={`flex-col  conversation-item p-2 hover:opacity-60 cursor-pointer ${
                currentChat?.id === conver?.id ? "bg-green-500" : ""
              }`}
              onClick={() => handleClickConversation(conver)}
            >
              <div className="flex justify-between">
                <h1 className="text-lg font-bold">
                  {conver.username ||
                    `${conver.first_name}   ${conver.last_name}`}
                </h1>

                {groupedNotifications &&
                  groupedNotifications[`${conver?.id}`] && (
                    <span className="flex font-bold text-xs items-center justify-center h-6 w-6 rounded-full bg-green-500 text-white transition-opacity transform hover:scale-105">
                      {groupedNotifications[`${conver?.id}`]?.count}
                    </span>
                  )}
              </div>
              <div className="flex  justify-end  ">
                <span>
                  {onlineusers.includes(conver?.id) ||
                  onlineusers.includes(conver?.user_id) ? (
                    <div className="flex">
                      <MdOnlinePrediction className="mr-1 text-green-700" />
                      <span className="text-green-400 text-xs font-bold">
                        Online
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <MdOnlinePrediction className="mr-1 text-red-700 " />
                      <span className="text-red-600 text-xs font-bold">
                        Offline
                      </span>
                    </div>
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area  */}
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
              // src={`${API_URL}${currentChat?.profile_picture}`}
              src={
                user?.profile_picture
                  ? `${API_URL}${user?.profile_picture}`
                  : logo
              }
              alt="Avatar"
            />
            <div>
              <p>
                {currentChat?.username ||
                  `${currentChat?.first_name}  ${currentChat?.last_name}`}
              </p>
              <div className="flex items-center">
                {onlineusers.includes(currentChat?.id) ||
                onlineusers.includes(currentChat?.user_id) ? (
                  <>
                    <MdOnlinePrediction className="ml-2 text-green-600" />
                    <p className="text-xs text-green-600 font-bold ml-1 ">
                      Online
                    </p>
                  </>
                ) : (
                  <>
                    <MdOnlinePrediction className="ml-2 text-red-600" />
                    <p className="text-xs text-red-600 font-bold ml-1 ">
                      Offline
                    </p>
                  </>
                )}
              </div>
            </div>
          </h2>
          <button
            className=" absolute right-4 top-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Hide" : "Show"} Sidebar
          </button>
        </div>

        {/* Chat messages */}
        {contacts.length <= 0 ? (
          <div className="text-white flex justify-center items-center font-bold text-5xl">
            {user?.is_trainer
              ? "You have no followers for your programs"
              : "You have no conacts Join a Program and connect with Trainers"}
          </div>
        ) : (
          <>
            <div
              ref={messageListRef}
              className="flex-1 overflow-y-auto p-4 no-scrollbar"
            >
              {loading ? (
                <p className="flex mt-72 justify-center object-center text-white">
                  Loading messages...
                </p>
              ) : (
                <>
                  {messageList.map((message) => (
                    <div
                      key={message?.id}
                      className={` flex mb-4 ${
                        message?.sender === user?.id
                          ? "justify-end mr-2"
                          : " justify-start ml-2"
                      }`}
                    >
                      <div>
                        {message?.type === "image" ? (
                          <ImageChatBubble
                            user={user}
                            username={
                              message.sender === user?.id
                                ? user.first_name
                                : currentChat?.username ||
                                  currentChat?.first_name
                            }
                            key={message?.id}
                            message={message}
                            trainer_id={user?.id}
                            profile_picture={currentChat?.profile_picture}
                            onForward={handleOnForward}
                          />
                        ) : (
                          <ChatBubble
                            user={user}
                            username={
                              message.sender === user?.id
                                ? user.first_name
                                : currentChat?.username ||
                                  currentChat?.first_name
                            }
                            key={message?.id}
                            message={message}
                            trainer_id={user?.id}
                            profile_picture={currentChat?.profile_picture}
                            onForward={handleOnForward}
                            // onDelete={onDelete}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div>
              <ImagePreview image={choosenImage} />
            </div>
            <div className="flex-row">
              <form
                className="p-4 border-t flex items-center"
                onSubmit={handleSendMessage}
              >
                <div>
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageInputChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={handleImageUpload}
                    type="button"
                    className="bg-green-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full flex items-center justify-center mr-2"
                  >
                    <RiImageAddFill />
                  </button>
                </div>
                <input
                  type="text"
                  className="flex-1 border rounded-full px-4 py-2 mr-4"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
                >
                  <IoSend />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
      {isForwardModalOpen && (
        <ForwardMessageModal
          onClose={closeForwardModal}
          onForward={handleForwardMessage}
          users={contacts} // Pass the users to select from
        />
      )}
    </div>
  );
};

export default ChatWindow;
