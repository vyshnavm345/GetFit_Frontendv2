import React, { useEffect, useState } from "react";
import CardList from "components/CardList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProgramme } from "features/trainer";
import { getLessonsList } from "features/lessons";
import { API_URL } from "config";
import { followedProgram, getFollowedPrograms, unfollowProgram } from "features/program";
import { toast } from "react-toastify";
import ModalLayout from 'components/ModalLayout'
import Checkout from "components/Payment/Checkout";

const CourseDescription = () => {
  const dispatch = useDispatch();
  const { programme } = useSelector((state) => state.trainer);
  const { lessonsList } = useSelector((state) => state.lesson);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { followedPrograms } = useSelector((state) => state.program);
  // const [showLessons,  setShowLessons] = useState(false)
  const [subscribed, setSubscribed] = useState(false);
  const [show, setShow] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

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

  const handlePayment= ()=>{
    if (user) {
      setShow(true);
    } else {
      toast.error("Please Login First !");
    }
  }

  const handleClick = () => {
    if (user) {
      setShowWarning(true);
      // setSubscribed(!subscribed);
      // if(subscribed){
      //   dispatch(unfollowProgram(programme.id))
      // }
    } else {
      toast.error("Please Login First !");
    }
  };

  const onClose = ()=>{
    setShow(false)
  }
  const handleUnsubscribe = ()=>{
    setSubscribed(false);
    dispatch(unfollowProgram(programme.id));
  }
  const onCloseWarning = ()=>{
    setShowWarning(false)
  }
  

  return (
    <>
      <div className=" lg:mx-0 mx-auto px-0  py-20 bg-black/85 ">
        <div
          className="bg-cover bg-no-repeat bg-center h-64 lg:h-[450px] object-cover rounded mb-8"
          style={{
            backgroundImage: `url(${API_URL}${programme?.cover_image})`,
          
          }}
        ></div>

        <div className="mx-5  flex justify-between items-center pb-8">
          <div className="flex flex-col">
            <h1 className="text-3xl font-blackops-one text-[#f5f5f5]">
              {programme?.program_name}
            </h1>
            <p className="text-white font-bold text-lg">
              Duration : {programme?.duration} Day Program
            </p>
          </div>
          {!user?.is_trainer && (
            <div className="flex items-center">
              {subscribed ? (
                <button
                  onClick={() => {
                    handleClick();
                  }}
                  className="px-4 py-2 bg-red-500 text-white font-bold rounded-md shadow hover:bg-red-700"
                >
                  <span> UnSubscribe</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handlePayment();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow hover:bg-blue-700"
                  >
                    <p>
                      Subscribe at just
                      <span className="text-lg font-bold">
                        ₹{programme?.price}
                      </span>
                    </p>
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col   justify-between pb-8">
          <div className="mx-5 w-full mb-4">
            <h3 className="text-xl font-bold text-[#f5f5f5] mb-4">
              Program Description
            </h3>
            <p className="text-white text-base px-4 py-2   rounded-md">
              {programme?.description}
            </p>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="mx-5 w-full mb-4 lg:mb-1 lg:w-1/2">
              <h3 className="text-xl font-bold text-[#f5f5f5] mb-4">
                Key Benifits
              </h3>
              <ul className="list-disc pl-4 text-white">
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
              <div className="bg-white no-scrollbar w-[97%]  lg:w-[540px] h-48 overflow-y-auto border rounded-md shadow-md my-4">
                <CardList />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  justify-between">
          {isAuthenticated && subscribed ? (
            <div className="w-full mx-5 ">
              <h3 className="text-xl mb font-bold text-[#f5f5f5] mb-4 mt-4">
                Start Learning
              </h3>
              <ul className="list-disc text-white pl-4  ">
                {/* {lessonsList?.map((lesson, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      navigate(`/programLesson/${programme?.id}`);
                    }}
                    className="text-base border rounded p-4 w-[97%] my-2 "
                  >
                    <button>{lesson?.title}</button>
                  </li>
                ))} */}
                <li
                  key={programme?.id}
                  onClick={() => {
                    navigate(`/programLesson/${programme?.id}`);
                  }}
                  className="text-base border rounded p-4 w-[97%] my-2 "
                >
                  <button>Go to Lessons</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className=" ml-10 text-4xl text-white font-mono">
              {subscribed ? "Login" : "Subscribe"} to view the lessons
            </div>
          )}
        </div>
      </div>
      {show && (
        <ModalLayout
          title={"Payment"}
          onClose={onClose}
          children={
            <div>
              <Checkout
                price={programme?.price}
                id={programme.id}
                setSubscribed={setSubscribed}
                setShow={setShow}
              />
            </div>
          }
        />
      )}
      {showWarning && (
        <ModalLayout
          className="border-black shadow-lg"
          title={"Warning"}
          onClose={onCloseWarning}
          children={
            <div>
              <p className="text-xl font-bold">
                Are you sure you want to unsubscribe?
              </p>
              <p className="text-xl font-semibold">
                You will have to pay again to resubscribe later.
              </p>
              <div className="flex justify-around">
                <button
                  onClick={handleUnsubscribe}
                  className="p-2 rounded-md my-3 bg-yellow-500 text-white font-bold shadow-md hover:bg-yellow-800"
                >
                  Unsubscribe
                </button>
                <button
                  onClick={() => {
                    setShowWarning(false);
                  }}
                  className="p-2 rounded-md my-3 bg-red-500 text-white font-bold shadow-md hover:bg-red-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default CourseDescription;
