import React, { useEffect } from "react";
import img1 from "assets/hero_image2.jpg";
import img2 from "assets/TrainerBaground.jpg";
import img3 from "assets/kris gethin.jpg";
import img4 from "assets/heroImage.jpg";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrainerprogrammesList, resetTrainersProgrammes } from "features/trainer";
import ProgrammeCard from "./courses/ProgrammeCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const CoursesSectionLevels = ({ title, rowId, programs }) => {

  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider" + rowId);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div className="m-1 mt-5 bg-white/10 py-5 px-2 ">
      <div className="text-center mx-auto pb-5">
        <h5 className="text-white font-blackops-one text-3xl">{title}</h5>
        <h1 className="text-[#F5F5F5] font-mono ">
          Choose the best programme that suits your needs
        </h1>
      </div>
      <div className="group">
        {programs?.length > 4 && (
          <MdChevronLeft
            onClick={slideLeft}
            className="bg-black/80 rounded-full left-0 absolute opacity-60 hover:opacity-100 cursor-pointer mt-36 text-white  z-10 hidden group-hover:block"
            size={50}
          />
        )}
        <div
          id={"slider" + rowId}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide no-scrollbar relative"
        >
          {programs?.map((programme) => (
            <>
              <ProgrammeCard key={programme?.id} programme={programme} />
            </>
          ))}
        </div>
        {programs?.length > 4 && (
          <MdChevronRight
            onClick={slideRight}
            className="bg-black/80 rounded-full right-0 absolute opacity-60 hover:opacity-100 text-white cursor-pointer z-10 mt-[-200px] hidden group-hover:block"
            size={50}
          />
        )}
      </div>
    </div>
  );
};

export default CoursesSectionLevels;
