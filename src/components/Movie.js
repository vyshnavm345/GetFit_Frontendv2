import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Movie = ({ item }) => {
  const [like, setLike] = useState(false);

  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img
          className="w-full block h-64 object-cover"
          src={item}
          alt="testImg"
        />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/30 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            test
          </p>
          <p
            onClick={() => {
              setLike(!like);
            }}
          >
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-grey-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-grey-300" />
            )}
          </p>
        </div>
        <div className="service-link">
          <a href="#" className="text-[#F5F5F5]">
            Raising money to help
          </a>
        </div>
        <div className="my-4 text-blue-200">Lorem Ipsum is simply dummy</div>
      </div>
    </>
  );
};

export default Movie;
