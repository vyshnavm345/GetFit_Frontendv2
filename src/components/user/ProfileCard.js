import React, { useEffect } from "react";
import { API_URL } from "config";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, resetSelectedUser } from "features/user";
import { useNavigate } from "react-router-dom";

const ProfileCard = ({ user_id }) => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    useEffect(() => {
      dispatch(getUserById(user_id));
      return (()=>{
        dispatch(resetSelectedUser())
      })
    }, []);
    
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="px-4 py-6">
        <div className="flex items-center justify-center">
          <img
            className="h-60 w-60 rounded object-cover"
            src={`${API_URL}${selectedUser?.profile_picture}`}
            alt={selectedUser?.first_name}
          />
        </div>
        <div className="text-center mt-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {selectedUser?.first_name} {selectedUser?.last_name}
          </h2>
          <p className="text-sm text-gray-600 mt-1">{selectedUser?.email}</p>
          {/* <p className="text-sm text-gray-600 mt-1">{selectedUser.details}</p> */}
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-400 text-center">
        <button className="text-white p-2 px-6 bg-red-500 focus:outline-none m-2">
          cancel
        </button>
        <button
          onClick={() => {
            navigate("/chat");
          }}
          className="text-white p-2 px-6 bg-blue-700 focus:outline-none m-2"
        >
          Chat
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
