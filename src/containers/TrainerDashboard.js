import Sidebar from 'components/trainer/Sidebar';
import { IoIosArrowDropright } from "react-icons/io";
import React from 'react'
import { useState } from 'react';
import Layout from 'components/Layout';
import CardTable from 'components/trainer/CardTable';
import { useSelector } from 'react-redux';
import ProfileHeroSection from 'components/ProfileHeroSection';
import FollowedPrograms from 'components/courses/FollowedPrograms';
import SubscribersTable from 'components/trainer/SubscribersTable';
import SubscribersData from 'components/trainer/SubscribersData';

const TrainerDashboard = () => {
    // const { programSubscribers } = useSelector((state) => state.trainer);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(getSubscribers());
    // }, []);
  
    const { user } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(true);
    const [option , setOption] = useState(1);
    
    let content;
    
    switch (option) {
      case 1:
        content = user?.first_name ? <ProfileHeroSection user={user} /> : null;
        break;
      case 2:
        content = <CardTable />
        break;
      case 3:
        content = <FollowedPrograms />;
        break;
      case 4:
        content = <div className='text-5xl text-red-800'>hello</div>
        break;
      case 5:
        content = <SubscribersData/>;
        break;
      // default:
        // content = user?.first_name ? <ProfileHeroSection user={user} /> : null;
    }
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
                {content}
              </div>
            </div>
          </div>
        </Layout>
      );
}

export default TrainerDashboard