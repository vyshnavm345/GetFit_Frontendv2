import React from "react";
import img1 from "../assets/heroImage.jpg";
import img4 from "../assets/1_About_Header.jpg";
import { useNavigate } from "react-router-dom";
import CreatePost from "components/community/CreatePost";


const Test = () => {
      const navigate = useNavigate();

  return (
    <div className="w-full h-[650px] text-white ">
     <CreatePost/>
    </div>
  );
};

export default Test;
