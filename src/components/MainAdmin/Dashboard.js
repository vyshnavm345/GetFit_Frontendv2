import React, { useEffect } from 'react';
import AdminCards from './InfoCards'; 
import TopProgramsTable from './TopProgramsTable';
import ActiveUsers from './ActiveUsers';
import { useDispatch, useSelector } from 'react-redux';
import { getLoggedInUsers } from 'features/user';
import { getLoggedInTrainers } from 'features/trainer';
import {getUser} from 'features/user'

const Dashboard = () => {
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
      <AdminCards />
      <TopProgramsTable />
      <div className="w-full flex">
        <ActiveUsers title="Online Trainers" users={onlineTrainers} />
        <ActiveUsers title="Online Users" users={loggedInUsers} />
      </div>
    </div>
  );
};

export default Dashboard;
