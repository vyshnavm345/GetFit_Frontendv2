import Layout from 'components/Layout'
import TrainerRegisterForm from 'components/trainer/TrainerRegisterForm';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const TrainerRegister = () => {
    const navigate = useNavigate()
    const {user} = useSelector(state=> state.user)
  return (
    <Layout
      title="Getfit | Trainer registration"
      content="Trainer Registration"
    >
      <div className="w-full h-screen mb-80">
        {user ? (
          user.is_trainer ? (
            <div className="flex justify-center items-center h-screen">
              <div className="text-center">
                <h2 className="font-blackops-one text-white text-3xl">
                  You are Already a Trainer.
                </h2>
                <button
                  onClick={() => navigate("/TrainerDashboard")}
                  className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Trainer Dashboard
                </button>
              </div>
            </div>
          ) : (
            <TrainerRegisterForm />
          )
        ) : (
          <div className="flex justify-center items-center h-screen">
            <div className="text-center">
              <h2 className="font-blackops-one text-black text-5xl">
                You need to create an account first
              </h2>
              <button
                onClick={() => navigate("/register")}
                className="mt-4 bg-black hover:bg-black/80 text-white font-bold py-2 px-4 rounded"
              >
                Create Account
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default TrainerRegister