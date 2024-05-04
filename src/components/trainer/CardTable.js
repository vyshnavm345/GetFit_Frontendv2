
import React, { useEffect, useState } from "react";
import Team1 from "assets/kris gethin.jpg";
import Team2 from "assets/kris-gethin-coach-square-headshot.jpg";
import Team3 from "assets/hero_Image1.jpg";
import Team4 from "assets/programmes/gethin-muscle-building-logo-header-640xh.jpg";
import FitnessProgramForm from "components/courses/FitnessProgramForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getTrainer,
  getTrainerprogrammesList,
  resetCreated,
} from "features/trainer";
import LessonsTable from "components/courses/LessonsTable";

export default function CardTable() {
  const { trainer, trainersProgrammes, created } = useSelector(
    (state) => state.trainer
  );
  const dispatch = useDispatch();
  const [addProgramme, setAddProgramme] = useState(true);
  const [selectedProgramId, setSelectedProgramId] = useState(null);

  useEffect(() => {
    dispatch(resetCreated());
  }, [created]);

  useEffect(() => {
    if (trainer?.id) {
      dispatch(getTrainerprogrammesList(trainer?.id));
    }
  }, [trainer]);

  return (
    <>
      {addProgramme ? (
        <>
          {selectedProgramId ? (
            <LessonsTable
              programmeId={selectedProgramId}
              setShowLessons={() => setSelectedProgramId(null)}
            />
          ) : (
            <div className="bg-white py-2 shadow-md rounded md:px-6 md:my-6 overflow-x-auto">
              {/* <p className="text-5xl text-red-950">{trainersProgrammes[12]?.id}</p> */}
              <div className="bg-purple-500 text-white uppercase text-xl py-2 px-4 flex justify-between">
                Programms
                <button
                  onClick={() => setAddProgramme(!addProgramme)}
                  className="text-sm font-bold border p-1 rounded border-spacing-2"
                >
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
                    {trainersProgrammes?.map((programme) => (
                      <tr
                        onClick={() => {
                          setSelectedProgramId(programme.id);
                        }}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="border-b border-gray-200 py-4 px-2">
                          {programme?.program_name}
                        </td>
                        <td className="border-b border-gray-200 py-4 px-2">
                          {programme?.category}
                        </td>
                        <td className="border-b border-gray-200 py-4 px-2">
                          <i className="fas fa-circle fa-sm text-orange-500 mr-2"></i>
                          {programme?.duration} Days
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <FitnessProgramForm
          setAddProgramme={setAddProgramme}
          addProgramme={addProgramme}
        />
      )}
    </>
  );
}
