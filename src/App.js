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

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/userProfile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/userProfile" element={<UserProfile />} /> */}
        <Route path="/findTrainer" element={<FindTrainers />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/trainer/profile" element={<TrainerHomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/test" element={<Test />} /> */}
        {/* <Route path="/verify" element={<VerifyEmail />} /> */}
        <Route path="/verify/:token" element={<VerifyEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
