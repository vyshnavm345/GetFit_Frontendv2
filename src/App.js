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


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/findTrainer" element={<FindTrainers />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
