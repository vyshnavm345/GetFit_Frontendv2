import React, { useState } from "react";
import Modal from "components/ModalLayout";
const ForwardMessageModal = ({ onClose, onForward, users }) => {
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleUserSelection = (userId) => {
        // Toggle user selection
        setSelectedUsers((prevSelectedUsers) => {
        if (prevSelectedUsers.includes(userId)) {
            return prevSelectedUsers.filter((id) => id !== userId);
        } else {
            return [...prevSelectedUsers, userId];
        }
        });
    };

    const handleForwardMessage = () => {
        // Forward the message to selected users
        console.log("Forwarding message to selected users:", selectedUsers);
        // Implement logic to send the message to selected users
        onForward(selectedUsers);
    };

    return (
      <Modal title="Select Users to Forward Message" onClose={onClose}>
        <div className="flex flex-col space-y-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUsers.includes(user.user_id)}
                onChange={() => handleUserSelection(user.user_id)}
                className="mr-2"
              />
              <label>
                {console.log("The user is : ", user)}
                {user.username || `${user.first_name} ${user.last_name}`}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleForwardMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
      </Modal>
    );
};

export default ForwardMessageModal;
