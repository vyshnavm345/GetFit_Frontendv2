import React from "react";
import Team1 from "assets/kris gethin.jpg";
import Team2 from "assets/kris-gethin-coach-square-headshot.jpg";
import Team3 from "assets/hero_Image1.jpg";
import Team4 from "assets/programmes/gethin-muscle-building-logo-header-640xh.jpg";

export default function CardTable() {
  return (
    <div className="bg-white py-2 shadow-md rounded md:px-6 md:my-6 overflow-x-auto">
      <div className="bg-purple-500 text-white uppercase text-xl py-2 px-4 flex justify-between">
        Programms{" "}
        <button className="text-sm font-bold border p-1 rounded border-spacing-2">
          Add
          <strong className="hidden lg:inline"> Programme</strong>
        </button>
      </div>
      <div className="overflow-hidden border-t border-gray-200">
        <table className="w-full bg-transparent border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-3 px-2">Name</th>
              <th className="text-left py-3 px-2">Category</th>
              <th className="text-left py-3 px-2">Duration</th>
              <th className="text-left py-3 px-2">Users</th>
              <th className="text-left py-3 px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border-b border-gray-200 py-4 px-2">DTP</td>
              <td className="border-b border-gray-200 py-4 px-2">
                Strength Training
              </td>
              <td className="border-b border-gray-200 py-4 px-2">
                <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>
                4-weeks
              </td>
              <td className="border-b border-gray-200 py-4 px-2 flex">
                <img
                  src={Team1}
                  alt="Team 1"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src={Team2}
                  alt="Team 2"
                  className="w-10 h-10 rounded-full border-2 border-white -ml-4"
                />
                <img
                  src={Team3}
                  alt="Team 3"
                  className="w-10 h-10 rounded-full border-2 border-white -ml-4"
                />
                <img
                  src={Team4}
                  alt="Team 4"
                  className="w-10 h-10 rounded-full border-2 border-white -ml-4"
                />
              </td>
              <td className="border-b border-gray-200 py-4 px-2">
                <div className="w-full h-3 bg-gray-200 rounded">
                  <div className="w-3/5 h-full bg-red-500 rounded"></div>
                </div>
              </td>
            </tr>
            {/* Repeat similar structure for other rows */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
