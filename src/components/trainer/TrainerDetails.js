import { getTrainer } from 'features/trainer';
import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TrainerDetails = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { trainer } = useSelector((state) => state.trainer);

    useEffect(() => {
      if (user?.is_trainer) {
        console.log("dispatching GetTrainer");
        dispatch(getTrainer());
        console.log("dispatched GetTrainer");
      }
    }, []);

  return (
    <div className="m-6 mr-24 p-10 sm:ml-[-350px] md:ml-[-78px] shadow-lg border-spacing-4">
      <h1 className="mx-[25%] text-3xl">Trainer</h1>
      <h2>Trainer ID : {trainer?.id}</h2>
      <p>``
        Specialized in <strong>{trainer?.specalized}</strong>
      </p>
      <p>
        Experience:
        <strong>{trainer?.experience_years}</strong>
        Years
      </p>
      <p>
        Rating: <strong>{trainer?.rating}</strong>
      </p>
      <p>
        country: <strong>{trainer?.country}</strong>
      </p>
      <p>
        phone: <strong>{trainer?.phone}</strong>
      </p>
    </div>
  );
}

export default TrainerDetails