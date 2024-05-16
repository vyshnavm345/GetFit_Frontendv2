// src/components/AdminCards.js

import { getTotalPrograms } from "features/program";
import { getTotalTrainers } from "features/trainer";
import { getTotalUsers } from "features/user";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminCards = ({ totalUsers, totalTrainers, totalPrograms }) => {
  
  const {totalUserCount} = useSelector(state=>state.user)
  const {totalTrainerCount} = useSelector(state=>state.trainer)
  const { totalProgramCount } = useSelector((state) => state.program);

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getTotalUsers());
    dispatch(getTotalTrainers());
    dispatch(getTotalPrograms());
  }, [])

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="bg-white shadow-2xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Total Users</h2>
        <p className="text-xl">{totalUserCount}</p>
      </div>
      <div className="bg-white shadow-2xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Total Trainers</h2>
        <p className="text-xl">{totalTrainerCount}</p>
      </div>
      <div className="bg-white shadow-2xl rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Total Programs</h2>
        <p className="text-xl">{totalProgramCount}</p>
      </div>
    </div>
  );
}
;

export default AdminCards;
