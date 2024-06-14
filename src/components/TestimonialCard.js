import React from 'react'

const TestimonialCard = ({ image, title, text }) => {
  return (
    <div className="flex bg-white  rounded-lg border shadow-lg  mb-1 mt-0">
      <img
        className="card-image p-3 object-cover h-32 w-28"
        src={image}
        alt={title}
      />
      <div className="card-text p-4 flex-1">
        <h3 className="text-lg  font-bold mb-2">{title}</h3>
        <p className=" text-xs">{text}</p>
      </div>
    </div>
  );
};

export default TestimonialCard