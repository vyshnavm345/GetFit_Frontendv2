import React from "react";
import VideoPage from "components/courses/VideoPage";
// import React, { useState } from "react";

const CourseMainContent = ({lesson, isOpen }) => {
  return (
    <div
      className={` px-4 py-8 flex flex-col bg-[#f5f5f5]  ${
        isOpen ? "lg:ml-80 md:ml-64 ml-1 " : " lg:mx-40"
      }`}
    >
      {" "}
      {/* Added responsive class for main content */}
      <VideoPage video_url={lesson?.video_url} />
      {console.log("This is the url inside parent", lesson?.video_url)}
      <div
        className="bg-cover bg-no-repeat bg-center w-full aspect-w-16 aspect-h-9 rounded-lg mb-8"
        style={{
          backgroundImage: `url(http://127.0.0.1:8000/${lesson?.image})`,
        }}
      ></div>
      <div className="flex flex-col items-start justify-between pb-8">
        <div className="w-full  mb-4 lg:mb-0">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {lesson?.title}
          </h3>
          <p className="text-gray-600 text-base">{lesson?.description}</p>
        </div>
        {/* <div className="w-full ">
          <button className="button mt-5 bg-green-500 hover:bg-green-600 text-white font-mono  py-1  px-4 rounded transition-colors duration-300">
            Next Lesson ->
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default CourseMainContent;
