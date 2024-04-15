import React from "react";
import img1 from "assets/hero_image2.jpg";
import img2 from "assets/TrainerBaground.jpg";
import img3 from "assets/kris gethin.jpg";
import img4 from "assets/heroImage.jpg";

const CoursesSectionLevels = () => {
    return (
      <div className="m-1 mt-5 bg-slate-700 py-5 px-2 ">
        <div className="text-center mx-auto pb-5">
          <h5 className="text-white font-blackops-one text-3xl">Beginners</h5>
          <h1 className="text-[#F5F5F5] font-mono ">
            What we do to protect environment
          </h1>
        </div>
        <div className="w-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar relative">
          <div className="flex justify-evenly ">
            <div className="cursor-pointer w-80">
              <div className="service-item">
                <img
                  src={img1}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className=" text-[#F5F5F5]">
                    Raising money to help
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap text-blue-200">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="cursor-pointer w-80">
              <div className="service-item">
                <img
                  src={img1}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className=" text-[#F5F5F5]">
                    Raising money to help
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap text-blue-200">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="cursor-pointer w-80">
              <div className="service-item">
                <img
                  src={img1}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className=" text-[#F5F5F5]">
                    Raising money to help
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap text-blue-200">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="cursor-pointer w-80">
              <div className="service-item">
                <img
                  src={img1}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className=" text-[#F5F5F5]">
                    Raising money to help
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap text-blue-200">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            {/* <div className="w-80">
              <div className="service-item">
                <img
                  src={img2}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className="mb-0 h4">
                    close work with services
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="w-80">
              <div className="service-item">
                <img
                  src={img3}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className="mb-0 h4">
                    Pro Guided tours only
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="w-80">
              <div className="service-item">
                <img
                  src={img4}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className="mb-0 h4">
                    Protecting animal area
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="w-80">
              <div className="service-item">
                <img
                  src={img4}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className="mb-0 h4">
                    Protecting animal area
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div>
            <div className="w-80">
              <div className="service-item">
                <img
                  src={img4}
                  className="w-full h-64 object-cover"
                  alt="Image"
                />
                <div className="service-link">
                  <a href="#" className="mb-0 h4">
                    Protecting animal area
                  </a>
                </div>
              </div>
              <p className="my-4 text-wrap">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    );
};

export default CoursesSectionLevels;
