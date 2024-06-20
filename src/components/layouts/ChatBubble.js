import React, { useState } from 'react'
import { API_URL } from 'config';

const ChatBubble = ({
  user,
  username,
  message,
  trainer_id,
  profile_picture,
  onForward,
  // onDelete,
}) => {
  const dateObject = new Date(message.timestamp);
  // const formattedDate = dateObject.toISOString().slice(0, 10); // YYYY-MM-DD
  const formattedTime = dateObject.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const [showMenu, setShowMenu] = useState(false);
  // const handleClick = () => {
  //   setShowMenu((prevShowMenu) => !prevShowMenu);
  // };

  const handleForward = () => {
    // Pass the necessary information to the parent component
    const forwardData = {
      message: message.message,
      type: 'text',
    };
    // Call a function passed from the parent component to handle the forward action
    onForward(forwardData);
  };


  const handleClick = (action) => {
    setShowMenu((prevShowMenu) => !prevShowMenu);
    if (action === "copy") {
      // Copy message to clipboard
      navigator.clipboard
        .writeText(message.message)
        .then(() => {
          console.log("Text copied to clipboard: " + message.message);
          // alert("Text copied to clipboard: " + message.message);
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
          // alert("Failed to copy text. Please try again.");
        });
    } else if (action === "forward") {
      handleForward();
    } else if (action === "delete") {
      // handleDelete();
    } else {
      // Handle other actions (e.g., reply, delete)
      // Add your logic here
    }
  };

  return (
    <div
      className={`flex items-start gap-2.5 mb-4${
        message.sender === user.id || message.user_id === user.id
          ? " flex-row-reverse "
          : " "
      }`}
    >
      <img
        className="w-8 h-8 rounded-full object-cover"
        src={`${API_URL}${
          message.sender === user.id || message.user_id === user.id
            ? user.profile_picture
            : profile_picture
        }`}
        alt="Jese image"
      />
      <div
        className={`flex w-full max-w-[320px] leading-1.5 p-4 border-gray-200  dark:bg-gray-700${
          message.sender === user.id || message.user_id === user.id
            ? " bg-green-200 rounded-s-xl rounded-br-xl "
            : " bg-blue-200 rounded-e-xl rounded-es-xl"
        }`}
      >
        {message.deleted ? (
          "message deleted"
        ) : (
          <div className="flex-col">
            <div className="flex-col items-center space-x-2 rtl:space-x-reverse">
              <p className="text-md font-semibold text-gray-900 dark:text-white">
                {message.sender === user.id || message.user_id === user.id
                  ? "You"
                  : username}
              </p>
              <p
                style={{ "margin-right": "100px" }}
                className="text-xs font-normal text-gray-500 dark:text-gray-400"
              >
              </p>
            </div>
            <div class="flex-wrap">
              <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white whitespace-normal overflow-auto break-all">
                {message.message}
              </p>
              <p class="text-sm font-normal items-end text-gray-500 dark:text-gray-400">
                <span class="bottom-0 right-0 mb-2 text-xs p-2">
                  {formattedTime}
                </span>
              </p>
            </div>
          </div>
        )}
        <button
          onClick={handleClick}
          id="dropdownMenuIconButton"
          data-dropdown-toggle="dropdownDots"
          data-dropdown-placement="bottom-start"
          className=" self-start items-end p-1 mr-2 ml-[-14] text-sm font-medium text-right text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600 position: absolute; top: 0; right: 2;"
          type="button"
        >
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
      </div>
      <div
        id="dropdownDots"
        className={`z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600 ${
          showMenu ? "inline-block" : "hidden"
        }`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <a
              href="#"
              onClick={() => handleClick("forward")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Forward
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleClick("copy")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Copy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatBubble

