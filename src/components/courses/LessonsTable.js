import React, { useEffect, useState } from 'react'
import AddLessonModal from './AddLessonModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLesson, getLessonsList } from 'features/lessons';

const LessonsTable = ({ programmeId, setShowLessons }) => {
    const dispatch = useDispatch();
    const { lessonsList } = useSelector((state) => state.lesson);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lessonToEdit, setLessonToEdit] = useState(null);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = (lesson) => {
      setLessonToEdit(lesson)
      setIsModalOpen(true);
    };
    useEffect(() => {
        dispatch(getLessonsList(programmeId));
    }, [isModalOpen]);
    

    if (lessonsList !== null){
        console.log("in useeffect", lessonsList);
    }
    
        return (
          <div className="h-screen">
            <div>
              <button
                onClick={openModal}
                className="bg-green-500 rounded text-xs p-2 m-2 text-white font-bold "
              >
                Add Lesson +
              </button>
              <button
                onClick={() => {
                  setShowLessons(false);
                }}
                className="bg-red-500 rounded text-xs p-2 m-2 text-white font-bold "
              >
                back
              </button>
            </div>
            {isModalOpen && (
              <AddLessonModal
                lesson={lessonToEdit}
                programmeId={programmeId}
                setIsModalOpen={setIsModalOpen}
              >
                {/* Content of the modal */}
                {/* Add your form or any content you want to display inside the modal */}
                <form>
                  <label>Title:</label>
                  <input type="text" />
                  {/* Add more form fields here */}
                  <button type="submit">Submit</button>
                </form>
              </AddLessonModal>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {/* <th scope="col" className="p-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th> */}
                  <th scope="col" className="px-6 py-3">
                    Lessons
                  </th>
                  <th scope="col" className="px-6 py-3">
                    video_url
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {lessonsList?.map((lesson) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    {/* <td className="w-4 p-4">
                            <div className="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                            </div>
                        </td> */}
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {lesson?.image && (
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={`http://127.0.0.1:8000/${lesson?.image}`}
                          alt="Jese image"
                        />
                      )}
                      <div className="ps-3">
                        <div className="text-base font-semibold">
                          {lesson?.title}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-blue-700">
                      <a href={lesson?.video_url}>{lesson?.video_url}</a>
                    </td>
                    {/* <td className="px-6 py-4">
                    <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>
                        Online
                    </div>
                    </td> */}
                    <td className="flex justify-evenly  px-6 py-4">
                      <button
                        onClick={() => {
                          openModal(lesson);
                        }}
                        className="font-medium m-1 p-2 px-3 bg-blue-500 rounded text-white dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button onClick={()=>{dispatch(deleteLesson(lesson.id)).then(() => {
                        dispatch(getLessonsList(programmeId));
                      });}} className="font-medium m-1 p-2 px-3 bg-red-500 rounded text-white dark:text-red-500 hover:underline">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
};

export default LessonsTable