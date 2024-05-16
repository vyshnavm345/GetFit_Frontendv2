import { API_URL } from "config";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "assets/Get-fit-Logo.png";
import { changeUserAccess } from "features/admin";
import { getAllTrainers } from "features/trainer";

const Trainers = () => {
  const { allTrainers } = useSelector((state) => state.trainer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (allTrainers.length < 1) {
      dispatch(getAllTrainers());
    }
  }, []);
  console.log("Trainers : ", allTrainers)
  return (
    <div className="bg-white shadow-2xl rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Trainer ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Name
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Email
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {allTrainers.map((user) => (
            <tr key={user?.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user?.id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                  <img
                    className="h-10 w-10  object-cover rounded-full mr-2"
                    src={
                      user?.profile_picture
                        ? `${API_URL}${user?.profile_picture}`
                        : logo
                    }
                    alt="img"
                  />
                  <p>
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user?.email}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user?.blocked ? (
                  <>
                    <p className="px-3 font-blackops-one transition-opacity duration-300">
                      Blocked
                    </p>
                    <button
                      onClick={() => {
                        dispatch(
                          changeUserAccess({ id: user?.id, role: "trainer" })
                        );
                      }}
                      className="bg-green-500 text-white font-bold rounded-md px-4 py-2 transition-opacity duration-300 hover:opacity-75"
                    >
                      Unblock
                    </button>
                  </>
                ) : (
                  <>
                    <p className="px-3 font-blackops-one transition-opacity duration-300">
                      Active
                    </p>
                    <button
                      onClick={() => {
                        dispatch(
                          changeUserAccess({ id: user?.id, role: "trainer" })
                        );
                      }}
                      className="bg-red-500 text-white font-bold rounded-md px-4 py-2 transition-opacity duration-300 hover:opacity-75"
                    >
                      Block
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trainers;
