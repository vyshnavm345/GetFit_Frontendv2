import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "config";
import logo from "assets/Get-fit-Logo.png";
import { useNavigate } from "react-router-dom";
import ProgressCircle from "components/ProgressCircle";
import { getFollowedPrograms } from "features/program";
import { getlessonProgress } from "features/lessons";

const FollowedPrograms = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { followedPrograms } = useSelector((state) => state.program);
  const { user } = useSelector((state) => state.user);
  const { progressStatus } = useSelector((state) => state.lesson);

  useEffect(() => {
    dispatch(getFollowedPrograms());
  }, [dispatch]);

  useEffect(() => {
    if (followedPrograms) {
      followedPrograms.forEach((programGroup) => {
        programGroup.program.forEach((program) => {
          dispatch(
            getlessonProgress({ user_id: user.id, program_id: program.id })
          );
        });
      });
    }
  }, [dispatch, followedPrograms, user.id]);

  // console.log("Followed programs:", followedPrograms);
  // console.log("Progress status:", progressStatus);

  const getProgressForProgram = (programId) => {
    const progress = progressStatus.find((prog) => prog.program === programId);
    return progress ? progress.progress_percentage : 0; // Default to 0 if progress not found
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {followedPrograms?.map((programGroup) =>
        programGroup.program.map((program) => (
          <div
            key={program.id}
            onClick={() => {
              navigate(`/programDetails/${program.id}`);
            }}
            className="bg-gray-200 rounded-md overflow-hidden relative cursor-pointer"
          >
            <img
              src={
                program?.cover_image ? `${API_URL}${program.cover_image}` : logo
              }
              alt="Card"
              className="w-full h-48 object-cover"
            />
            <ProgressCircle percentage={getProgressForProgram(program.id)} />
            <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white inset-0 flex flex-col justify-center items-center">
              <h2 className="text-white text-xl font-bold mb-2">
                {program.program_name}
              </h2>
              <p className="text-white text-lg">
                Trainer: {program.trainer_name}
              </p>
              <p className="text-white text-lg">{program.category}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FollowedPrograms;
