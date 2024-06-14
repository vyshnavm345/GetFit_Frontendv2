import Layout from "components/Layout";
import React, { useEffect } from "react";
import img1 from "../assets/heroImage.jpg";
import img4 from "../assets/Register.jpg";
import programme1 from 'assets/programmes/gethin-12-week-hardcore-logo-header-640xh.jpg'
import programme2 from 'assets/programmes/gethin-8-week-hardcore-logo-header-640xh.jpg'
import programme3 from 'assets/programmes/gethin-dtp-logo-header-640xh.jpg'
import programme4 from 'assets/programmes/gethin-muscle-building-logo-header-640xh.jpg'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getprogrammeslist } from "features/trainer";
import { API_URL } from "config";

const ProgrammesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { programmes } = useSelector((state) => state.trainer);
    
    useEffect(() => {
      dispatch(getprogrammeslist());
    }, []);

    const truncateText = (text, wordLimit) => {
      const words = text.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
    };

  return (
    <Layout>
      <div className="w-full h-[650px] text-white ">
        <div className="w-full h-full">
          <div className="absolute w-full h-[650px] bg-gradient-to-r from-black xl:h-[650px]"></div>
          <img className="w-full h-full object-cover" src={img1} alt="" />
          <div className="absolute  top-[325px] transform -translate-y-1/2 sm:left-[400px] md:left-[500px] lg:left-[650px] xl:left-[750px] lg:object-contain self-end">
            <img
              src={img4}
              alt="hero"
              className="w-full h-[650px] self-end md:self-end object-cover"
            />
          </div>
          <div className=" top-[45%] absolute w-full sm:top-[28%] md:top-[30%] p-4 md:p-4 md:pl-10 lg:pl-10 ">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-blackops-one">
              Find Programmes that
              <br /> Suits Your Goals
            </h1>
            <p className="text-sm md:text-md md:mt-2 lg:text-3xl">
              Find your ideal programme from our Database. <br />
            </p>
            <div className="my-4 ml-1 md:ml-16">
              <button
                onClick={() => navigate("/register")}
                className="border rounded bg-gray-300 text-black border-gray-300 py-2 px-5"
              >
                Get Started
              </button>
              <button className="border rounded text-white border-gray-300 py-2 px-5 ml-4 ">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="blog text-gray-700 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl  title-font mb-2 text-black font-bold">
              Programmes
            </h1>
            <p className=" text-black/80 lg:w-1/2 w-full leading-relaxed text-base">
              Below are a list of our most popular training programs created to
              help you achieve the best version of yourself. Built by world
              renowned trainers - these programs are used daily by thousands of
              others looking to take their fitness to the next level.
            </p>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 ">
            {programmes &&
              programmes.map(
                (programme) => (
                  // programme.level === "Beginner" ? (
                  <div
                    onClick={() => {
                      navigate(`/programDetails/${programme?.id}`);
                    }}
                    className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto cursor-pointer"
                  >
                    <div
                      className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${API_URL}${programme?.cover_image})`,
                      }}
                    ></div>

                    <div
                      className="w-70 h-60 bg-white -mt-10 shadow-lg rounded-lg overflow-hidden p-5"
                      style={{ width: "20rem" }}
                    >
                      <div className="header-content inline-flex ">
                        <div className="category-badge flex-1  h-4 w-4 m rounded-full m-1 bg-purple-100">
                          <div className="h-2 w-2 rounded-full m-1 bg-purple-500 "></div>
                        </div>
                        <div className="flex flex-row justify-between">
                          <div className="category-title flex-4 font-blackops-one text-sm mr-2 mb-1">
                            {programme?.program_name}
                          </div>
                          <div className="title-post  text-xs font-bold ml-4 mt-1">
                            Difficulty :
                            <strong className="text-green-700">
                              {programme?.level}
                            </strong>
                          </div>
                        </div>
                      </div>
                      <div className="title-post text-blue-600 font-bold">
                        Trainer: {programme?.trainer_name}
                      </div>
                      {/* <div className="title-post  text-xs font-bold">
                        Difficulty level :{" "}
                        <strong className="text-green-700">
                          {programme?.level}
                        </strong>
                      </div> */}

                      <div className="summary-post text-base text-justify">
                        {truncateText(programme?.description, 20)}
                        <br />
                        <button className="bg-blue-100 text-blue-500 mb-2 mt-4 block rounded p-2 text-sm ">
                          <span className="">View</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
                // ) : null
              )}

            {/* Repeat the above structure for other sections */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProgrammesPage;


