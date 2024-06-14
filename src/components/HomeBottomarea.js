import React from 'react'
import img1 from "assets/Homepage/team-kaged-1.webp";
import img2 from "assets/Homepage/team-kaged-2.webp";
import img3 from "assets/Homepage/team-kaged-3.webp";
import img4 from "assets/Homepage/team-kaged-4.webp";
import img5 from "assets/Homepage/team-kaged-5.webp";
import { Link } from "react-router-dom";

const HomeBottomarea = () => {
  return (
    <>
      <div className="bg-white py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join our Inner Circle</h2>
          <p className="text-gray-600 text-lg mb-6">
            Unlock Exclusive Content and Connect with a Community Committed to
            Health and Wellness
          </p>
          <Link to="/trainerRegister">
            <button className="bg-black text-white rounded-md px-4 py-2 hover:opacity-75 hover:shadow-md active:opacity-80 shadow-sm">
              BECOME A TRAINER
            </button>
          </Link>
        </div>
      </div>
      <div className="bg-white py-8 w-full">
        <div className="flex no-scrollbar flex-row overflow-x-auto sm:overflow-x-scroll">
          {" "}
          {/* Added overflow-x-auto and sm:overflow-x-scroll */}
          <img
            className="h-80 object-cover w-full m-0 p-0"
            src={img1}
            alt="model1"
          />
          <img
            className="h-80 object-cover w-full m-0 p-0"
            src={img2}
            alt="model2"
          />
          <img
            className="h-80 object-cover w-full m-0 p-0"
            src={img3}
            alt="model3"
          />
          <img
            className="h-80 object-cover w-full m-0 p-0"
            src={img4}
            alt="model4"
          />
          <img
            className="h-80 object-cover w-full m-0 p-0"
            src={img5}
            alt="model5"
          />
        </div>
      </div>
      <div className="py-8  bg-[#eae4d9]   ">
        <div className="flex flex-col  sm:flex-row  justify-between mx-8 lg:p-4 md:mx-24 space-y-4 md:flex-row md:space-x-8 lg:space-x-16">
          <section className="flex-grow pt-4">
            <h1 className="text-3xl font-bold">Excellent Fitness Programs</h1>
            <p className="text-gray-400 text-sm">
              The programs are individually vetted by experts in the field
            </p>
          </section>
          <section className="flex-grow">
            <h1 className="text-3xl font-bold">World class Trainers</h1>
            <p className="text-gray-400 text-sm">
              Our trainer are the best in the field.
            </p>
          </section>
          <section className="flex-grow">
            <h1 className="text-3xl font-bold">Designed For Athletes</h1>
            <p className="text-gray-400 text-sm">
              Our products are designed to support the unique needs of athletes.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default HomeBottomarea