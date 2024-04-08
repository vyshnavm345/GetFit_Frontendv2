import Layout from "components/Layout";
import React from "react";
import img1 from "../assets/heroImage.jpg";
import img4 from "../assets/1_About_Header.jpg";
import programme1 from 'assets/programmes/gethin-12-week-hardcore-logo-header-640xh.jpg'
import programme2 from 'assets/programmes/gethin-8-week-hardcore-logo-header-640xh.jpg'
import programme3 from 'assets/programmes/gethin-dtp-logo-header-640xh.jpg'
import programme4 from 'assets/programmes/gethin-muscle-building-logo-header-640xh.jpg'
import { useNavigate } from "react-router-dom";

const ProgrammesPage = () => {
    const navigate = useNavigate();
  return (
    <Layout>
      <div className="w-full h-[650px] text-white ">
        <div className="w-full h-full">
          <div className="absolute w-full h-[650px] bg-gradient-to-r from-black xl:h-[712px]"></div>
          <img className="w-full h-full object-cover" src={img1} alt="" />
          <div className="absolute  top-[325px] transform -translate-y-1/2 sm:left-[400px] md:left-[500px] lg:left-[650px] xl:left-[750px] lg:object-contain self-end">
            <img
              src={img4}
              alt="hero"
              className="w-full h-[650px] self-end md:self-end object-cover"
            />
          </div>
          <div className="top-[45%] absolute w-full sm:top-[28%] md:top-[30%] p-4 md:p-4 md:pl-10 lg:pl-10 ">
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
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
              {" "}
              Programmes
            </h1>
            <p className=" text-white lg:w-1/2 w-full leading-relaxed text-base">
              J'aime bien partager mes connaissances et des recherche
              intéressantes, pour le faire j'ai mis en place un blog personnel.
              Nous abordons plusieurs sujets intéressants et je donne quelques
              astuces et conseils aux jeunes développeurs pour mieux s'en
              sortir.
            </p>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 ">
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(${programme1})`,
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
                  <div className="category-title flex-4 font-blackops-one text-sm">
                    {" "}
                    12 Week Hardcore
                  </div>
                </div>
                <div className="title-post text-blue-800 opacity-70 font-bold">
                  Trainer: Krris Gethin
                </div>

                <div className="summary-post text-base text-justify">
                  12 weeks of intense workouts to transform you body.
                  <br/>
                  // add text truncation here to avoid text overflow 
                  <button className="bg-blue-100 text-blue-500 mb-2 mt-4 block rounded p-2 text-sm ">
                    <span className="">View</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://miro.medium.com/v2/da:true/resize:fill:1200:632/g:fp:0.49:0.32/0*zOEo8IEJN37f5K7P)",
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
                  <div className="category-title flex-4 font-blackops-one text-sm">
                    {" "}
                    Bodybuilde and Fitness Expert
                  </div>
                </div>
                <div className="title-post font-medium">Krris Gethin</div>

                <div className="summary-post text-base text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 mt-4 block rounded p-2 text-sm ">
                    <span className="">View</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(${programme2})`,
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
                  <div className="category-title flex-4 font-blackops-one text-sm">
                    {" "}
                    Bodybuilde and Fitness Expert
                  </div>
                </div>
                <div className="title-post font-medium">Krris Gethin</div>

                <div className="summary-post text-base text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 mt-4 block rounded p-2 text-sm ">
                    <span className="">View</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(${programme3})`,
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
                  <div className="category-title flex-4 font-blackops-one text-sm">
                    {" "}
                    Bodybuilde and Fitness Expert
                  </div>
                </div>
                <div className="title-post font-medium">Krris Gethin</div>

                <div className="summary-post text-base text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 mt-4 block rounded p-2 text-sm ">
                    <span className="">View</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage: `url(${programme4})`,
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
                  <div className="category-title flex-4 font-blackops-one text-sm">
                    {" "}
                    Bodybuilde and Fitness Expert
                  </div>
                </div>
                <div className="title-post font-medium">Krris Gethin</div>

                <div className="summary-post text-base text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 mt-4 block rounded p-2 text-sm ">
                    <span className="">View</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3 md:mb-0 mb-6 flex flex-col justify-center items-center max-w-sm mx-auto">
              <div
                className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://miro.medium.com/v2/da:true/resize:fill:1200:632/g:fp:0.49:0.32/0*zOEo8IEJN37f5K7P)",
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
                  <div className="category-title flex-4 font-blackops-one text-sm">
                    {" "}
                    Bodybuilde and Fitness Expert
                  </div>
                </div>
                <div className="title-post font-medium">Krris Gethin</div>

                <div className="summary-post text-base text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Perspiciatis veritatis vel suscipit ex dolore possimus iure.
                  <button className="bg-blue-100 text-blue-500 mt-4 block rounded p-2 text-sm ">
                    <span className="">View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Repeat the above structure for other sections */}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProgrammesPage;
