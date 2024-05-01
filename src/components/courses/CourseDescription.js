import React, { useEffect } from 'react'
import CardList from 'components/CardList';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProgramme } from 'features/trainer';
import { getLessonsList } from 'features/lessons';
import { API_URL } from 'config';
import { followedProgram } from 'features/program';
import { toast } from 'react-toastify';

const CourseDescription = () => {
  const dispatch = useDispatch()
    const { programme } = useSelector((state) => state.trainer);
    const { lessonsList } = useSelector((state) => state.lesson);
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(()=>{
      console.log('mounting course description')
      dispatch(getProgramme(id));
      // add the subscriber logic here that is only subscribed users should be able to see the lesson contents
      if (isAuthenticated){
        dispatch(getLessonsList(id));
      } 
    }, [])
    const handleClick = ()=>{
      if (user){
        dispatch(followedProgram(programme.id));
      } else {
        toast.error("Please Login First !")
      }
    }
  return (
    <>
      <div className=" lg:mx-32 mx-auto px-4  py-24 bg-black/15 ">
        <div
          className="bg-cover bg-no-repeat bg-center h-64 lg:h-[450px] object-cover rounded mb-8"
          style={{
            backgroundImage: `url(${API_URL}/${programme?.cover_image})`,
          }}
        ></div>

        <div className="mx-5 flex justify-between items-center pb-8">
          <h1 className="text-3xl font-blackops-one text-[#f5f5f5]">
            {programme?.program_name}
          </h1>
          {!user?.is_trainer &&
          <div className="flex items-center">
            <button onClick={()=>{handleClick()}} className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow hover:bg-blue-700">
              Follow this Program
            </button>
          </div>
          }
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
          {/* <div className="w-full mx-5  mb-4 lg:mb-0">
            <h3 className="text-xl  font-bold text-[#f5f5f5] mb-4">
              User Testimonial
            </h3>
            <div className="flex items-center p-4 border border-gray-200 rounded">
              <img
                src={img1}
                alt="Customer Review"
                className="w-16 h-16 rounded mr-4"
              />
              <div>
                <h4 className="text-[#f5f5f5] text-base font-bold">
                  Jessica Simon
                </h4>
                <p className="text-blue-200 text-sm">
                  I have been following this routine and became healthier by
                  doing lorem ipsum proin gravida nibh vel velit auctor aliquet
                  aenean.
                </p>
              </div>
            </div>
          </div> */}
          {isAuthenticated ? (
            <div className="w-full mx-5 ">
              <h3 className="text-xl mb font-bold text-[#f5f5f5] mb-4 mt-4">
                Course Content
              </h3>
              <ul className="list-disc text-blue-200 pl-4  ">
                {lessonsList?.map((lesson) => (
                  <li
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
              Login to view the lessons
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CourseDescription