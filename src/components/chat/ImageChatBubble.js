import React, { useState } from 'react'
import img1 from 'assets/heroImage.jpg'
import { API_URL } from 'config';

const ImageChatBubble = ({
  user,
  username,
  message,
  trainer_id,
  profile_picture,
  onForward,
}) => {
    const dateObject = new Date(message.timestamp);
    const formattedTime = dateObject.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const [showMenu, setShowMenu] = useState(false);

    const handleForward = () => {
      // Pass the necessary information to the parent component
      const forwardData = {
        message: message.message,
        image : message.image || message.data,
        type: message.type
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

      // Close the dropdown menu
      // setShowMenu(false);
    };
    // console.log("the message data : ", message)
      const handleDownload = () => {
        const link = document.createElement("a");
        link.href = `${API_URL}${message.image || message.data}`;
        link.download = "image.jpg"; // Set the default file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
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
        alt="Bonnie Green image"
      />
      <div
        className={`flex flex-col gap-1${
          message.sender === user.id || message.user_id === user.id
            ? " bg-green-200 rounded-s-xl rounded-br-xl "
            : " bg-blue-200 rounded-e-xl rounded-es-xl"
        }`}
      >
        <div className="flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
            <span className="text-m font-bold text-gray-900 dark:text-white">
              {message.sender === user.id || message.user_id === user.id
                ? "You"
                : username}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {formattedTime}
            </span>
          </div>
          <p className="text-sm font-normal text-gray-900 dark:text-white">
            {message.message}
          </p>
          <div className="group relative my-2.5">
            <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
              <button
                onClick={handleDownload}
                data-tooltip-target="download-image"
                className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
              >
                <svg
                  className="w-5 h-5 text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 18"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                  />
                </svg>
              </button>
              <div
                id="download-image"
                role="tooltip"
                className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
              >
                Download image
                <div className="tooltip-arrow" data-popper-arrow></div>
              </div>
            </div>
            <img
              src={`${API_URL}${message.image || message.data}`}
              className="rounded-lg"
            />
          </div>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Delivered
          </span>
        </div>
      </div>
      <button
        id="dropdownMenuIconButton"
        onClick={handleClick}
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
          {/* <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Reply
            </a>
          </li> */}
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
          {/* <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Report
            </a>
          </li> */}
          {/* <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default ImageChatBubble