import React from 'react'

const LessonSidebar = ({isOpen, setIsOpen}) => {

    const toggleDrawer = () => {
      setIsOpen(!isOpen);
    };
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 lg:w-80 overflow-y-auto bg-gray-800 opacity-70 text-white z-50 transition duration-300 ease-in-out transform ${
        isOpen ? "-translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <h2 className="text-xl font-bold">Yoga Sadhana</h2>
        <button
          onClick={toggleDrawer}
          className="text-gray-400 hover:text-gray-300 focus:outline-none"
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
      </div>
      <nav className="mt-4">
        <ul className="space-y-2">
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#" className="text-base font-medium">
              Lesson 1
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#" className="text-base font-medium">
              Lesson 2
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#" className="text-base font-medium">
              Lesson 3
            </a>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700">
            <a href="#" className="text-base font-medium">
              Lesson 4
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default LessonSidebar