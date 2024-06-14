import React, { useEffect, useState } from "react";
import SubscribersTable from "./SubscribersTable";
import { useDispatch, useSelector } from "react-redux";
import { getSubscribers } from "features/trainer";
import ModalLayout from "components/ModalLayout";
import EditModalForm from 'components/EditModalForm'
import ProfileCard from "components/user/ProfileCard";

const SubscribersData = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { programSubscribers } = useSelector((state) => state.trainer);
    // const { selectedUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // useEffect(()=>{
    //     if(selectedUser=== null){
    //         dispatch(getUserById);
    //     }
    // })

    useEffect(() => {
      if (programSubscribers.length === 0) {
        console.log("getting subscribers", programSubscribers)
        dispatch(getSubscribers());
      } 
    }, []);

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setModalVisible(true);
    };
    console.log("model is : ", modalVisible);

    const closeModal = () => {
        setModalVisible(false);
    };


    // Function to get unique program names
    const getUniqueProgramNames = () => {
        const uniqueProgramNames = new Set();
        programSubscribers?.forEach((subscriber) => {
        subscriber.program.forEach((program) => {
            uniqueProgramNames.add(program.program_name);
        });
        });
        return Array.from(uniqueProgramNames);
    };

    // Function to filter subscribers for a specific program
    const getSubscribersForProgram = (programName) => {
        return programSubscribers.filter((subscriber) =>
        subscriber.program.some((program) => program.program_name === programName)
        );
    };

    return (
      <>
        {getUniqueProgramNames().map((programName) => (
          <div key={programName} className="h-screen">
            <h2 className="text-black/90 text-3xl font-bold">{programName}</h2>
            <SubscribersTable
              key={programName}
              programName={programName}
              data={getSubscribersForProgram(programName)}
              onRowClick={handleRowClick}
            />
            {modalVisible && (
              <ModalLayout
                title={"User Details"}
                onClose={closeModal}
                children={<ProfileCard user_id={selectedUser?.user} />}
              />
            )}
          </div>
        ))}
      </>
    );
};

export default SubscribersData;
