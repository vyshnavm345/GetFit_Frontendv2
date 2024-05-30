import React, { useState } from "react";
import VideoPage from "components/courses/VideoPage";
// import React, { useState } from "react";
import { API_URL } from "config";
import Modal from "components/ModalLayout";
import { useDispatch, useSelector } from "react-redux";
import { updatelessonProgress } from "features/lessons";

const CourseMainContent = ({ lesson, isOpen }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch()
  const {user}= useSelector(state=>state.user)

  const closeModal =()=>{
    setOpenModal(false)
  }
  console.log("The current lesson and programe is : ", lesson)
  console.log("the current user is : ", user)
  return (
    <>
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
            backgroundImage: `url(${API_URL}${lesson?.image})`,
          }}
        ></div>
        <div className="flex flex-col items-start justify-between pb-8">
          <div className="w-full  mb-4 lg:mb-0">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {lesson?.title}
            </h3>
            <p className="text-gray-600 text-base">{lesson?.description}</p>
          </div>
          <div className="w-full ">
            <button
              onClick={() => {
                setOpenModal(true);
              }}
              className="button mt-5 bg-green-500 hover:bg-green-600 text-white font-mono  py-1  px-4 rounded transition-colors duration-300"
            >
              Next Lesson ->
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          title={"GetFit"}
          onClose={closeModal}
          children={
            <div>
              <p className="font-bold underline text-2xl">
                Have you finished the current lesson
              </p>
              <div className="flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-red-500 text-white font-semibold m-4 rounded-sm hover:opacity-90 shadow-lg shadow-gray-500 focus:opacity-100"
                >
                  No... Continue this Lesson
                </button>
                <button
                   onClick={()=>{
                    dispatch(updatelessonProgress({program: lesson.program, lesson: lesson.lesson_number}))
                    closeModal()
                  }}
                  className="px-4 py-2 bg-green-500 text-white font-semibold m-4 rounded-sm hover:opacity-90 shadow-lg shadow-gray-500 focus:opacity-100 "
                >
                  Yes... Mark Lesson as Completed
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default CourseMainContent;
