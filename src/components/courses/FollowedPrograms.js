import { getFollowedPrograms } from 'features/program';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'config';
import logo from 'assets/Get-fit-Logo.png'
import { useNavigate } from 'react-router-dom';

const FollowedPrograms = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const {followedPrograms} = useSelector(state=> state.program)
    useEffect(()=>{
        dispatch(getFollowedPrograms());
    }, [])

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Card  */}
        {followedPrograms?.map((program) => (
          <div
            onClick={() => {
              navigate(`/programDetails/${program.program[0].id}`);
            }}
            className="bg-gray-200 rounded-md overflow-hidden relative cursor-pointer"
          >
            <img
              src={
                program?.program[0].cover_image
                  ? `${API_URL}/${program.program[0].cover_image}`
                  : logo
              }
              alt="Card"
              className="w-full h-48 object-cover"
            />
              <div className="absolute top-0 left-0 w-full h-full hover:bg-black/50 opacity-0 hover:opacity-100 text-white inset-0 flex flex-col justify-center items-center">
                <h2 className="text-white text-xl font-bold mb-2">
                  {program.program[0].program_name}
                </h2>
                <p className="text-white text-lg">
                  Trainer: {program.program[0].trainer_name}
                </p>
                <p className="text-white text-lg">
                  {program.program[0].category}
                </p>
              </div>
            </div>
        ))}
      </div>
    );
}

export default FollowedPrograms