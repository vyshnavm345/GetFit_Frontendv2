import React, { useEffect, useState } from "react";
import CardList from "components/CardList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgramme } from "features/trainer";
import { getLessonsList } from "features/lessons";
import { API_URL } from "config";
import { followedProgram, getFollowedPrograms, unfollowProgram } from "features/program";
import { toast } from "react-toastify";

const CourseDescription = () => {
  const dispatch = useDispatch();
  const { programme } = useSelector((state) => state.trainer);
  const { lessonsList } = useSelector((state) => state.lesson);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { followedPrograms } = useSelector((state) => state.program);
  // const [showLessons,  setShowLessons] = useState(false)
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    dispatch(getFollowedPrograms());
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("mounting course description");
    dispatch(getProgramme(id));

    if (isAuthenticated) {
      dispatch(getLessonsList(id));
    }

    if (
      followedPrograms?.some((program) =>
        program.program.some((p) => p.id === programme?.id)
      )
    ) {
      console.log("the user is a follower of the program");
      setSubscribed(true);
    } else {
      setSubscribed(false);
    }
  }, [followedPrograms]);

  const handleClick = () => {
    if (user) {
      setSubscribed(!subscribed);
      if(subscribed){
        dispatch(unfollowProgram(programme.id))
      } else{

        dispatch(followedProgram(programme.id));
      }
    } else {
      toast.error("Please Login First !");
    }
  };
  // if (followedPrograms) {
  //   console.log(
  //     "this is the user followed programms List : ",
  //     followedPrograms
  //   );
  // }
  // if (programme) {
  //   if (followedPrograms && followedPrograms.length > 0) {
  //     console.log(
  //       "This is the program id : ",
  //       programme?.id,
  //       followedPrograms[0]?.program[0].id
  //     );
  //   }
  // }
  return (
    <>
      <div className=" lg:mx-32 mx-auto px-4  py-24 bg-black/15 ">
        <div
          className="bg-cover bg-no-repeat bg-center h-64 lg:h-[450px] object-cover rounded mb-8"
          style={{
            backgroundImage: `url(${API_URL}${programme?.cover_image})`,
          }}
        ></div>

        <div className="mx-5 flex justify-between items-center pb-8">
          <h1 className="text-3xl font-blackops-one text-[#f5f5f5]">
            {programme?.program_name}
          </h1>
          {!user?.is_trainer && (
            <div className="flex items-center">
              <button
                onClick={() => {
                  handleClick();
                }}
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow hover:bg-blue-700"
              >
                {subscribed ? (
                  <span>UnSubscribe</span>
                ) : (
                  <>
                    <p>Subscribe</p>
                    <span className="text-xs">follow this program</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col   justify-between pb-8">
          <div className="mx-5 w-full mb-4">
            <h3 className="text-xl font-bold text-[#f5f5f5] mb-4">
              Program Description
            </h3>
            <p className="text-blue-200 text-base px-4 py-2   rounded-md">
              {programme?.description}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="mx-5 w-full mb-4 lg:mb-1 lg:w-1/2">
              <h3 className="text-xl font-bold text-[#f5f5f5] mb-4">
                Key Benifits
              </h3>
              <ul className="list-disc pl-4 text-blue-200">
                <li className=" text-base">Improve Your Stamina</li>
                <li className=" text-base">Get Better Health</li>
                <li className=" text-base">Achieve Peace of Mind</li>
                <li className=" text-base">Look Young & Beautiful</li>
                <li className=" text-base">Achieve More in Life</li>
              </ul>
            </div>
            <div className="w-full mx-5 lg:w-1/2 mb-4 lg:mb-0">
              <h3 className="text-xl  font-bold text-[#f5f5f5] mb-4">
                User Testimonial
              </h3>
              <div className="bg-blue-100 no-scrollbar w-[97%]  lg:w-[540px] h-48 overflow-y-auto border rounded-md shadow-md my-4">
                <CardList />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  justify-between">
          {isAuthenticated && subscribed ? (
            <div className="w-full mx-5 ">
              <h3 className="text-xl mb font-bold text-[#f5f5f5] mb-4 mt-4">
                Course Content
              </h3>
              <ul className="list-disc text-blue-200 pl-4  ">
                {lessonsList?.map((lesson) => (
                  <li
                    key={lesson.id}
                    onClick={() => {
                      navigate(`/programLesson/${programme?.id}`);
                    }}
                    className="text-base border rounded p-4 w-[97%] my-2 "
                  >
                    <button>{lesson?.title}</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className=" ml-10 text-4xl text-white font-mono">
              {subscribed ? "Login" : "Subscribe"} to view the lessons
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDescription;
