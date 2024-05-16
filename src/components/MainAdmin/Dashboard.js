import React, { useEffect } from 'react';
import AdminCards from './InfoCards'; 
import TopProgramsTable from './TopProgramsTable';
import ActiveUsers from './ActiveUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUsers } from 'features/user';
import { getLoggedInTrainers } from 'features/trainer';

const Dashboard = () => {
  const totalUsers = 5000;
  const totalTrainers = 200;
  const totalPrograms = 150;
  const dispatch = useDispatch();
  const {loggedInUsers} = useSelector(state=>state.user)
  const { onlineTrainers } = useSelector((state) => state.trainer);
  
  useEffect(()=>{
    dispatch(getLoggedInUsers());
    dispatch(getLoggedInTrainers());
  }, [])
  console.log("the trainers online are : ", onlineTrainers);

  return (
    <div className="h-full">
      <AdminCards
        totalUsers={totalUsers}
        totalTrainers={totalTrainers}
        totalPrograms={totalPrograms}
      />
      <TopProgramsTable />
      <div className="w-full flex">
        <ActiveUsers title="Online Trainers" users={onlineTrainers} />
        <ActiveUsers title="Online Users" users={loggedInUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
