import React from "react";

const UserTable = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <table className="w-full rounded-lg shadow-md">
        <thead>
          <tr className="text-left font-bold bg-gray-500 text-white">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Function</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Employed Since</th>
            <th className="px-4 py-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-100">
            <td className="px-4 py-3">John Michael</td>
            <td className="px-4 py-3">Manager</td>
            <td className="px-4 py-3">
              <span className="px-2 inline-block rounded-full bg-green-200 text-green-600">
                ONLINE
              </span>
            </td>
            <td className="px-4 py-3">23/04/2018</td>
            <td className="px-4 py-3 text-blue-500 hover:underline">Edit</td>
          </tr>
          <tr className="border-b hover:bg-gray-100">
            <td className="px-4 py-3">Alexa Liras</td>
            <td className="px-4 py-3">Programator</td>
            <td className="px-4 py-3">
              <span className="px-2 inline-block rounded-full bg-gray-200 text-gray-400">
                OFFLINE
              </span>
            </td>
            <td className="px-4 py-3">11/01/2019</td>
            <td className="px-4 py-3 text-blue-500 hover:underline">Edit</td>
          </tr>
          {/* Add more table rows here */}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
