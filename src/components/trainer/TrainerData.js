import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTrainerByID } from 'features/trainer';
import { API_URL } from 'config';
import { useState } from 'react';

const TrainerData = ({id}) => {
    const { selectedTrainer } = useSelector((state) => state.trainer);
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("about");

    useEffect(()=>{
        dispatch(getTrainerByID(id));
    },[])

    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const truncateText = (text, wordLimit) => {
      const words = text.split(" ");
      if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
      }
      return text;
    };

    return (
      <div className=" px-2 container mx-auto py-16 md:px-10 ">
        <div className="mt-8 lg:flex grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="h-96 w-20 lg:h-auto md:w-[39rem]">
            <img
              src={`${API_URL}${selectedTrainer?.profile_picture}`}
              className="object-cover w-full h-full"
              alt="Image"
            />
          </div>
          <div className="h-[]">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-blackops-one">
              <p>{selectedTrainer?.username}</p>
              <span>Specialized In: {selectedTrainer?.specalized}</span>
            </h1>
            {console.log("The selected trainer data is : ", selectedTrainer)}
            <p className="text-lg mb-4 text-white">
              {/* {selectedTrainer?.about} */}
              
              {selectedTrainer && truncateText(selectedTrainer?.about, 20)}
            </p>
            <div className="bg-gray-200 py-4 px-6 rounded-lg">
              <ul className="flex space-x-3">
                <li>
                  <button
                    className={`py-2 px-4 font-semibold rounded-full transition duration-300 ${
                      activeTab === "about"
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    }`}
                    onClick={() => handleTabClick("about")}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 font-semibold rounded-full transition duration-300 ${
                      activeTab === "mission"
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    }`}
                    onClick={() => handleTabClick("mission")}
                  >
                    Credentials
                  </button>
                </li>
                <li>
                  <button
                    className={`py-2 px-4 font-semibold rounded-full transition duration-300 ${
                      activeTab === "vision"
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    }`}
                    onClick={() => handleTabClick("vision")}
                  >
                    Vision
                  </button>
                </li>
              </ul>
              <div className="mt-4 overflow-auto h-72">
                {activeTab === "about" && (
                  <div id="tab-1" className="tab-content">
                    <h5 className="text-lg font-semibold">
                      Transforming Lives through Fitness
                    </h5>
                    <p className="text-lg mb-4">{selectedTrainer?.about}</p>
                    <a
                      className="btn btn-primary py-2 px-4 rounded-lg transition duration-300 hover:bg-primary hover:text-white"
                      href="#"
                    >
                      Read More
                    </a>
                  </div>
                )}
                {activeTab === "mission" && (
                  <div id="tab-2" className="tab-content">
                    <h5 className="text-lg font-semibold">My Credentials</h5>
                    <p className="text-lg mb-4">
                      Specalized in {selectedTrainer?.specalized}
                      <br />
                      Certified in {selectedTrainer?.certifications}
                    </p>
                    <a
                      className="btn btn-primary py-2 px-4 rounded-lg transition duration-300 hover:bg-primary hover:text-white"
                      href="#"
                    >
                      Read More
                    </a>
                  </div>
                )}
                {activeTab === "vision" && (
                  <div id="tab-3" className="tab-content">
                    <h5 className="text-lg font-semibold">Our Vision</h5>
                    <p className="text-lg mb-4">
                      Our vision is to be the leading source of fitness
                      transformation, creating a healthier and more active world
                      through our innovative programs and community support.
                    </p>
                    <a
                      className="btn btn-primary py-2 px-4 rounded-lg transition duration-300 hover:bg-primary hover:text-white"
                      href="#"
                    >
                      Read More
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TrainerData