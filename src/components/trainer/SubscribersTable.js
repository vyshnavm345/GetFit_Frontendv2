import React from "react";

const SubscribersTable = ({ programName, data, onRowClick }) => {
    return (
        <div className="bg-white shadow-md rounded my-6">
        <div className="ml-10 overflow-x-auto ">
            <table className="min-w-full bg-white">
            <thead>
                <tr>
                <th className="text-left py-2 px-3 border-b border-gray-300">
                    User
                </th>
                <th className="text-left py-2 px-3 border-b border-gray-300">
                    Join Date
                </th>
                <th className="text-left py-2 px-3 border-b border-gray-300">
                    Status
                </th>
                <th className="text-left py-2 px-3 border-b border-gray-300">
                    Progress
                </th>
                </tr>
            </thead>
            <tbody>
                {data?.map((row, index) => (
                <tr
                    key={index}
                    onClick={() => onRowClick(row)}
                    className={
                    index % 2 === 0
                        ? "bg-gray-50 cursor-pointer"
                        : "cursor-pointer"
                    }
                >
                    <td className="text-left py-2 px-3 border-b border-gray-300">
                    {row.username}
                    </td>
                    <td className="text-left py-2 px-3 border-b border-gray-300">
                    {row.created_on}
                    </td>
                    <td className="text-left py-2 px-3 border-b border-gray-300">
                    {row.status}
                    </td>
                    <td className="text-left py-2 px-3 border-b border-gray-300">
                    {row.status}
                    </td>
                    <td className="text-left py-2 px-3 border-b border-gray-300">
                    {row.progress}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </div>
    );
};

export default SubscribersTable;
