import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import default_img from 'assets/default workot.png'
import { API_URL } from "config";
import { useNavigate } from "react-router-dom";

const ProgrammeCard = ({ programme }) => {
    const navigate = useNavigate();

  return (
    <>
      <div onClick={()=>{navigate(`/programDetails/${programme?.id}`);}} className="w-[60px] sm:w-[200px] md:w-[240px] lg:w-[400px] inline-block cursor-pointer relative p-2">
        <img
          className="w-full block h-64 object-cover"
          src={
            programme?.cover_image
              ? `${API_URL}/${programme?.cover_image}`
              : default_img
          }
          alt="testImg"
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/30 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            test
          </p>
        </div>
        <div className="service-link">
          <a href="#" className="text-[#F5F5F5]">
            {programme?.program_name}
          </a>
        </div>
        <div className="my-4 text-blue-200">Lorem Ipsum is simply dummy</div>
      </div>
    </>
  );
};

export default ProgrammeCard;
