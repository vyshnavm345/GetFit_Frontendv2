import Register from "containers/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DashboardPage from "containers/DashboardPage";
import Home from "containers/Home";
import Login from "containers/Login";
import NotFoundPage from "containers/NotFoundPage";
import UserProfile from "containers/UserProfile";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { checkAuth } from "features/user";
import FindTrainers from "containers/FindTrainers";
import Test from "containers/Test";
import ProgrammesPage from "containers/ProgrammesPage";
import TrainerHomePage from "containers/TrainerHomePage";
import VerifyEmail from 'components/VerifyEmail'
import ProtectedRoute from "components/ProtectedRoutes";
import TrainerRegister from "containers/TrainerRegister";
import ProgramDetails from "containers/ProgramDetails";
import ProgramLesson from "containers/ProgramLesson";
import TrainerDashboard from "containers/TrainerDashboard";
import Test1 from 'containers/Test1';
import ChatWindow from "containers/ChatWindow";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainerPage/:id" element={<DashboardPage />} />
        {/* <Route path="/trainerDashboard" element={<TrainerDashboard />} /> */}
        <Route path="/trainerDashboard" element={<ProtectedRoute><TrainerDashboard /></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
        <Route path="/programLesson/:id" element={<ProtectedRoute><ProgramLesson /></ProtectedRoute>} />
        <Route path="/trainerRegister" element={<TrainerRegister />} />
        <Route path="/findTrainer" element={<FindTrainers />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/trainer/profile" element={<TrainerHomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/chat" element={<Test />} /> */}
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/programDetails/:id" element={<ProgramDetails />} />
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
