import LessonSidebar from 'components/courses/LessonSidebar';
import Sidebar from 'components/trainer/Sidebar';
import { IoIosArrowDropright } from "react-icons/io";
import React from 'react'
import { useState } from 'react';
import Layout from 'components/Layout';
import CardTable from 'components/trainer/CardTable';
import UserTable from 'components/trainer/UserTable';

const TrainerDashboard = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [option , setOption] = useState(1);
  return (
    <Layout
      title="Get-Fit | Trainer Dashboard"
      content="Trainer Dashboard Page"
    >
      <div className="md:mx-10 py-10">
        <div className="my-10">
          {!isOpen && (
            <IoIosArrowDropright
              className="text-white mt-3 ml-1 text-4xl"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
          )}
          <Sidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setOption={setOption}
          />
          <div
            className={`mx-1  flex flex-col justify-evenly   h-full transform ${
              isOpen ? "lg:ml-72 mt-12" : ""
            }`}
          >
            <CardTable />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TrainerDashboard