import React from 'react'
import { IoIosArrowDropleft } from 'react-icons/io';

const LessonSidebar = ({lessonsList, setLessonNo, isOpen, setIsOpen}) => {

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 lg:w-80 overflow-y-auto bg-gray-800 opacity-70 text-white z-150 transition duration-300 ease-in-out transform ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-bold">Program Lessons</h2>
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          {lessonsList?.map((lesson, index) => (
            <li
              onClick={() => {
                setLessonNo(index);
              }}
              className="px-4 py-2 hover:bg-gray-700"
            >
              <a href="#" className="text-base font-medium">
                {lesson?.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-bold">Program Lessons</h2>
        <button
          onClick={toggleDrawer}
          className="text-gray-400 hover:text-gray-300 focus:outline-none"
        >
          <IoIosArrowDropleft className='text-3xl' />
        </button>
      </div>
    </div>
  );
}

export default LessonSidebar