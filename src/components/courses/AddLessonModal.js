import { addLesson, getLessonsList } from 'features/lessons';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { API_URL } from 'config';

const AddLessonModal = ({ lesson, programmeId, setIsModalOpen }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [lesson_number, setLesson_number] = useState("");
  const [description, setDescription] = useState("");
  const [video_url, setVideoUrl] = useState("");
  const [image, setImage] = useState('');
  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setDescription(lesson.description);
      setVideoUrl(lesson.video_url);
      setImage(lesson.image);
      setLesson_number(lesson.lesson_number);
    }
    return (()=>{
      dispatch(getLessonsList(programmeId));
    })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video_url", video_url);
    formData.append("lesson_number", `${programmeId}-${lesson_number}`);

    if (lesson.id) {
      formData.append("id", lesson.id);
    }

    if (image) {
      formData.append("image", image);
    }
    dispatch(addLesson({ formData, programmeId }));
    setIsModalOpen(false);
  };
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center overflow-x-hidden overflow-y-visible outline-none focus:outline-none">
      <div className=" max-w-3xl">
        <div className="relative flex flex-col w-full bg-green-300 border-0 rounded-lg shadow  ">
          <div className="flex z-50 items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
            <h3 className="text-lg font-semibold">Add Lesson</h3>
            <button
              className="p-1 ml-auto cursor-pointer "
              onClick={() => {
                setIsModalOpen(false);
              }}
            >
              X
            </button>
          </div>
          {/* Body */}
          <form
            onSubmit={handleSubmit}
            className="z-50 p-4 w-[90%] md:p-5"
            encType="multipart/form-data"
          >
            <div className="grid gap-4 mb-4  grid-cols-2">
              <div className="col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
              </div>
              <div className="col-span-2">
                <label
                  for="lesson_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lesson Number
                </label>
                <input
                  type="number"
                  id="lesson_number"
                  value={lesson_number}
                  onChange={(e) => setLesson_number(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required=""
                />
              </div>
              <div className="col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Youtube URL
                </label>
                <input
                  type="text"
                  id="video_url"
                  value={video_url}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="URL"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="profile-picture"
                  className="text-sm text-black block mb-1 font-medium"
                >
                  Image
                </label>
                {image && (
                  <img
                    className="h-14"
                    src={
                      lesson?.image
                        ? `${API_URL}${image}`
                        : URL.createObjectURL(image)
                    }
                    alt="img"
                  />
                )}
                <input
                  className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="image"
                />
              </div>

              <div className="col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                ></textarea>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add Lesson
            </button>
          </form>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </div>
  );
};

export default AddLessonModal