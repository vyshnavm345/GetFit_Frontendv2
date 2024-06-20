import React, { useEffect, useState } from 'react'
import AddLessonModal from './AddLessonModal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLesson, getLessonsList } from 'features/lessons';
import { API_URL } from 'config';

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
                <form>
                  <label>Title:</label>
                  <input type="text" />
                  <button type="submit">Submit</button>
                </form>
              </AddLessonModal>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
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
                  <tr key={lesson?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {lesson?.image && (
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={`${API_URL}${lesson?.image}`}
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