import Layout from "components/Layout";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Modal from "components/EditModalForm";

const UserProfile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const backgroundImage = false;

  if (!isAuthenticated && !loading && user === null){
    return <Navigate to='/login' />
  }

  return (
    <Layout title="Get-Fit | Pofile" content="Profile page">
      {loading || user === null ? (
        <div className="flex items-center justify-center h-screen">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="text-white sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="p-16">
          <div
            className={
              backgroundImage
                ? "p-8 bg-black shadow mt-24"
                : "p-8  shadow mt-24 bg-white"
            }
          >
            {" "}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {" "}
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                {" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">22</p>{" "}
                  <p className="text-gray-400">Followers</p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">10</p>{" "}
                  <p className="text-gray-400">Posts</p>{" "}
                </div>{" "}
                <div>
                  {" "}
                  <p className="font-bold text-gray-700 text-xl">89</p>{" "}
                  <p className="text-gray-400">Following</p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="relative">
                {" "}
                <div className="bg-indigo-100 mx-auto rounded-full shadow-2xl w-48 h-48 absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                  {user.profile_picture ? (
                    <img
                      className="rounded-full object-cover w-48 h-48"
                      src={`http://localhost:8000${user?.profile_picture}`}
                      alt="User"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-24 w-24"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      {" "}
                      <path
                        fill-rule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                </div>{" "}
              </div>{" "}
              <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                <button className="text-[#111] bg-transparent active:bg-blue-400 hover:bg-blue-500 hover:text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:-translate-y-0.5">
                  {" "}
                  Message
                </button>{" "}
                <Modal />
              </div>{" "}
            </div>{" "}
            <div className="mt-20 text-center border-b pb-12">
              {" "}
              <h1 className="text-4xl font-medium text-gray-700">
                {user?.first_name} {user?.last_name},{" "}
                <span className="font-light text-gray-500">
                  {user?.profile.age}
                </span>
              </h1>{" "}
              <p className="font-light text-gray-600 mt-3">
                Bucharest, Romania
              </p>{" "}
              <p className="mt-8 text-gray-500">{user?.email}</p>{" "}
              <p className="mt-2 text-gray-500">
                University of Computer Science
              </p>{" "}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default UserProfile;

                  // <svg
                  //   xmlns="http://www.w3.org/2000/svg"
                  //   className="h-24 w-24"
                  //   viewBox="0 0 20 20"
                  //   fill="currentColor"
                  // >
                  //   {" "}
                  //   <path
                  //     fill-rule="evenodd"
                  //     d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  //     clip-rule="evenodd"
                  //   />
                  // </svg>