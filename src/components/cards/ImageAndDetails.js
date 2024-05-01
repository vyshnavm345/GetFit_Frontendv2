import React from 'react'
import { API_URL } from 'config';
import { useNavigate } from 'react-router-dom';
const ImageAndDetails = ({user}) => {
    const navigate = useNavigate()
  return (
    <div
      className="flex  p-2 rounded mx-4 cursor-pointer"
      onClick={() => navigate("/TrainerDashboard")}
    >
      {user?.profile_picture && (
        <img
          src={`${API_URL}/${user?.profile_picture}`}
          alt="Profile"
          className="rounded-full w-20 object-cover  h-20"
        />
      )}
      <h3 className="mx-2 text-2xl font-bold uppercase text-[#f5f5f5] my-2">
        {user?.first_name} {user?.last_name}
      </h3>
    </div>
  );
}
export default ImageAndDetails