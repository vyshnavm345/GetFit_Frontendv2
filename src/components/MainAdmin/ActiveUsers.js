import { API_URL } from "config";
import React from "react";

const ActiveUsers = ({title, users}) => {

    const tableHeaders = ["Name", "User ID", "Email"];

    return (
      <div className="container shadow-2xl rounded-md my-8 mx-6 w-1/2">
        <h2 className="text-center font-bold text-xl mb-4">{title}</h2>
        <table className="w-full border-collapse shadow">
          <thead>
            <tr className="text-left border-b bg-gray-100">
              {tableHeaders.map((header) => (
                <th key={header} className="px-4 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          {users ? (
            <tbody>
              {users?.map((user, index) => (
                <tr key={index} className="text-left border-b">
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10  object-cover rounded-full mr-2"
                        src={`${API_URL}${user?.profile_picture}`}
                        alt="img"
                      />
                      <p>
                        {user?.first_name} {user?.last_name}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">user-{user?.id}</td>
                  <td className="px-4 py-3"> {user?.email}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>Loading users...</p>
          )}
        </table>
      </div>
    );
};

export default ActiveUsers;
