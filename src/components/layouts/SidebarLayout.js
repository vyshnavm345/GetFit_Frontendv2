import React from "react";
import ImageAndDetails from "components/cards/ImageAndDetails";
import { useSelector } from "react-redux";

export default function Sidebar({ title, list }) {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="fixed top-0 left-0 h-full w-64 lg:w-80 overflow-y-auto bg-black/50 text-white z-50 -translate-x-0">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div>
          <ImageAndDetails user={user} />
        </div>
        <nav className="mt-4">
          <ul className="space-y-2">
            {list.map((item, index) => (
              <li key={index} className="px-4 py-2 hover:bg-gray-700">
                <div className="text-base cursor-pointer font-medium">
                  {item}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
