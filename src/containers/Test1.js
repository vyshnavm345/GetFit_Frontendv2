import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

import img1 from "../assets/1_About_Header.jpg";
import img2 from "../assets/Get-fit-Logo.png";
import img3 from "../assets/Login.jpg";
import img4 from "../assets/Register.jpg";
import img5 from "../assets/TrainerBaground.jpg";
import img6 from "../assets/hero_Image1.jpg";
import img7 from "../assets/istockphoto-1415944087-612x612.jpg";
import img8 from "../assets/kris gethin.jpg";
import Movie from "components/Movie";
import ModalLayout from "components/ModalLayout";
import EditModalForm from 'components/EditModalForm'

const Test = () => {
  const movies = [img1, img2, img3, img4, img5, img6, img7, img8];

  const slideLeft = () => {
    var slider = document.getElementById(1);
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById(1);
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <h1 className="text-5xl text-white">This is a test</h1>
      <ModalLayout />
    </div>
  );
};

export default Test;
