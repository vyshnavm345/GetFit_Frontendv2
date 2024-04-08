import React from 'react'
import Modal from "components/EditModalForm";

import { API_URL } from "config/index";

const ProfileHeroSection = ({user}) => {
    const backgroundImage = false;
  return (
    <>
      <div className="p-16">
        <div
          className={
            backgroundImage
              ? "p-8 bg-black shadow mt-24"
              : "p-8  shadow mt-24 bg-white"
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">22</p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">10</p>
                <p className="text-gray-400">Posts</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">89</p>
                <p className="text-gray-400">Following</p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-indigo-100 mx-auto rounded-full shadow-2xl w-48 h-48 absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {user.profile_picture ? (
                  <img
                    className="rounded-full object-cover w-48 h-48"
                    src={`${API_URL}${user?.profile_picture}`}
                    alt="User"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-[#111] border-2 bg-transparent active:bg-blue-400 hover:bg-blue-500 hover:text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:-translate-y-0.5">
                Feeds
              </button>
              <button className="text-[#111] bg-transparent border-2 active:bg-blue-400 hover:bg-blue-500 hover:text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:-translate-y-0.5">
                My Posts
              </button>
              <Modal />
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.first_name} {user?.last_name},
              <span className="font-light text-gray-500">
                {user?.profile.age}
              </span>
            </h1>
            <p className="font-light text-gray-600 mt-3">{user?.email}</p>
            <div className="flex items-start justify-between p-4 w-[50%] ">
              <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span class="flex w-2.5 h-2.5 bg-blue-600 rounded-full me-1.5 flex-shrink-0"></span>
                {user?.profile.height} CM
              </span>
              <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span class="flex w-2.5 h-2.5 bg-purple-500 rounded-full me-1.5 flex-shrink-0"></span>
                {user?.profile.weight} KG
              </span>
              <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span class="flex w-2.5 h-2.5 bg-indigo-500 rounded-full me-1.5 flex-shrink-0"></span>
                {user?.profile.body_fat} %
              </span>
              <span class="flex items-center text-sm font-medium text-gray-900 dark:text-white me-3">
                <span class="flex w-2.5 h-2.5 bg-teal-500 rounded-full me-1.5 flex-shrink-0"></span>
                +91-{user?.profile.phone}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileHeroSection