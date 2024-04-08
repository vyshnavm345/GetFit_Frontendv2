import React from "react";
import img1 from "../assets/heroImage.jpg";
import img4 from "../assets/1_About_Header.jpg";
import { useNavigate } from "react-router-dom";
import CreatePost from "components/community/CreatePost";
import { toast } from "react-toastify";
import { useEffect } from "react";


const Test = () => {
      const navigate = useNavigate();
      


  return (
    <div className="w-full h-[650px] text-white ">
      <div className="h-10 w-[50%] ml-[5%] mt-[10%]">
      <h1>This is a test</h1>
      <button >click</button>
      </div>
    </div>
  );
};

export default Test;
