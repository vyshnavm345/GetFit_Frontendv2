import React, { useState } from "react";
import CourseMainContent from "components/courses/CourseMainContent";
import LessonSidebar from "components/courses/LessonSidebar";
import Layout from "components/Layout";


function ProgramLesson() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Layout >

    <div className="pt-2 h-screen mx-[3%]">
      {/* Drawer */}
      <LessonSidebar isOpen={isOpen} setIsOpen={setIsOpen}/>
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="text-blue-900 fixed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2.722 2.722L13 17.24V14zM4 14h16v-2l-3-3m0 0l-4 4m3.278 0l3.278-3.278L20 10.722z"
            />
          </svg>
        </button>
      )}
      <CourseMainContent isOpen={isOpen} />
    </div>
    </Layout>
  );
}

export default ProgramLesson;
