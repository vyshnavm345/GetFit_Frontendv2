import React, { useEffect, useState } from "react";
import CourseMainContent from "components/courses/CourseMainContent";
import LessonSidebar from "components/courses/LessonSidebar";
import Layout from "components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getLessonsList } from "features/lessons";
import { useParams } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

function ProgramLesson() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { lessonsList } = useSelector((state) => state.lesson);
  const { id } = useParams();
  const [lessonNo, setLessonNo] = useState(0);
  const [nextLesson, setNextLesson] = useState(1);

  useEffect(() => {
    dispatch(getLessonsList(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (lessonsList.length < lessonNo + 1) {
      setNextLesson(null);
    } else {
      setNextLesson(lessonNo + 1);
    }
    window.scrollTo(0, 0);
  }, [lessonNo, lessonsList]);

  return (
    <Layout>
      <div className="pt-2 mx-[1%]">
        {/* Drawer */}
        <LessonSidebar
          lessonsList={lessonsList}
          setLessonNo={setLessonNo}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        {!isOpen && (
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="text-blue-900 fixed mt-20"
          >
            <IoIosArrowDropright className="text-3xl font-bold text-black hover:opacity-55" />
          </button>
        )}
        {nextLesson ? (
          <CourseMainContent
            lesson={lessonsList[lessonNo]}
            isOpen={isOpen}
            setLessonNo={setLessonNo}
            nextLesson={nextLesson}
          />
        ) : (
          <div className="h-screen text-black text-4xl mt-10 py-20 ml-72 font-bold">Congrats You Finished all the Lessons In this Program</div>
        )}
      </div>
    </Layout>
  );
}

export default ProgramLesson;
