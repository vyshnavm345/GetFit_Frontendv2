import React, { useEffect } from 'react'
import img1 from "assets/hero_image2.jpg";
import img2 from "assets/TrainerBaground.jpg";
import img3 from "assets/kris gethin.jpg";
import img4 from "assets/heroImage.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { getTrainerByID } from 'features/trainer';
import { API_URL } from 'config';

const TrainerData = ({id}) => {
    const { selectedTrainer } = useSelector((state) => state.trainer);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getTrainerByID(id));
    },[])
    return (
      <div className=" px-2 container mx-auto py-16 md:px-10 ">
        <div className="mt-8 lg:flex grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="h-96 lg:h-auto w-full md:w-[39rem]">
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
            <p className="text-lg mb-4 text-white">{selectedTrainer?.about}</p>
            <div className="bg-gray-200 py-4 px-6 rounded-lg">
              <ul className="flex space-x-3">
                <li>
                  <a
                    className="py-2 px-4 bg-white text-primary font-semibold rounded-full transition duration-300 hover:bg-primary hover:text-white"
                    href="#tab-1"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    className="py-2 px-4 bg-white text-primary font-semibold rounded-full transition duration-300 hover:bg-primary hover:text-white"
                    href="#tab-2"
                  >
                    Mission
                  </a>
                </li>
                <li>
                  <a
                    className="py-2 px-4 bg-white text-primary font-semibold rounded-full transition duration-300 hover:bg-primary hover:text-white"
                    href="#tab-3"
                  >
                    Vision
                  </a>
                </li>
              </ul>
              <div className="mt-4">
                <div id="tab-1" className="tab-content">
                  <h5 className="text-lg font-semibold">Lorem Ipsum 1</h5>
                  <p className="text-lg mb-4">
                    {selectedTrainer?.about}
                    {selectedTrainer?.about}
                    {selectedTrainer?.about}
                    {selectedTrainer?.about}
                  </p>
                  <a
                    className="btn btn-primary py-2 px-4 rounded-lg transition duration-300 hover:bg-primary hover:text-white"
                    href="#"
                  >
                    Read More
                  </a>
                </div>
                <div id="tab-2" className="tab-content hidden">
                  <h5 className="text-lg font-semibold">Lorem Ipsum 2</h5>
                  <p className="text-lg mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard
                  </p>
                  <a
                    className="btn btn-primary py-2 px-4 rounded-lg transition duration-300 hover:bg-primary hover:text-white"
                    href="#"
                  >
                    Read More
                  </a>
                </div>
                <div id="tab-3" className="tab-content hidden">
                  <h5 className="text-lg font-semibold">Lorem Ipsum 3</h5>
                  <p className="text-lg mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a
                  </p>
                  <a
                    className="btn btn-primary py-2 px-4 rounded-lg transition duration-300 hover:bg-primary hover:text-white"
                    href="#"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default TrainerData