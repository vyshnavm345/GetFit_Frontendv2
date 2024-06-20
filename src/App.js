import Register from "containers/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import DashboardPage from "containers/DashboardPage";
import Home from "containers/Home";
import Login from "containers/Login";
import NotFoundPage from "containers/NotFoundPage";
import UserProfile from "containers/UserProfile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { checkAuth } from "features/user";
import FindTrainers from "containers/FindTrainers";
import ProgrammesPage from "containers/ProgrammesPage";
import TrainerHomePage from "containers/TrainerHomePage";
import VerifyEmail from "components/VerifyEmail";
import ProtectedRoute, { AdminProtectedRoute } from "components/ProtectedRoutes";
import TrainerRegister from "containers/TrainerRegister";
import ProgramDetails from "containers/ProgramDetails";
import ProgramLesson from "containers/ProgramLesson";
import TrainerDashboard from "containers/TrainerDashboard";
import ChatWindow from "containers/ChatWindow";
import { addNotification, addOnlineusers, closeWebSocket, getOnlineUserIds, initializeWebSocket, removeOnlineusers } from "features/webSocketSlice";
import { toast } from "react-toastify";
import { getNotifications } from "features/chat";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Dashboard from "components/MainAdmin/Dashboard";
import Users from "components/MainAdmin/Users";
import Trainers from "components/MainAdmin/Trainers"
import AdminLayout from "components/MainAdmin/AdminLayout";
import FitnessPrograms from "components/MainAdmin/FitnessPrograms";
import ProgramApprovalRequests from "components/MainAdmin/ProgramApprovalRequests";


function App() {
  const dispatch = useDispatch();
  const { wsUrl } = useSelector((state) => state.websocket);
  const { user } = useSelector((state) => state.user);
  const { pendingNotifications } = useSelector((state) => state.chat);
  const initialOptions = useSelector((state) => state.paypal.options);
  
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  
  useEffect(() => {
    if (wsUrl) {
      const globalws = new WebSocket(wsUrl);
      globalws.onopen = () => {
      };
      globalws.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        if (notification.category === "message") {
          toast.success(`${notification.sender}: ${notification.payload}`);
          dispatch(addNotification(notification));
        } else if (notification.category === "status") {
          toast.success(`${notification.sender}: ${notification.payload}`);
          if (notification.payload === "user Online") {
            dispatch(addOnlineusers(notification.sender));
          } else if (notification.payload === "user Offline") {
            dispatch(removeOnlineusers(notification.sender));
          }

        }
      };
      globalws.onclose = () => {
        dispatch(closeWebSocket());
      };
      return () => {
        globalws.close();
      };
    }
  }, [wsUrl]);

  
  useEffect(() => {
    dispatch(getOnlineUserIds());
  }, [user]);
  

  useEffect(() => {
    if(user){
      dispatch(getNotifications());
    }
  }, [user]);
  
  useEffect(()=>{
    if (pendingNotifications) {
      if (pendingNotifications.length <= 3) {
        
       pendingNotifications.forEach((notification, index) => {
         setTimeout(() => {
           toast.success(`${notification.sender}: ${notification.message}`);
         }, index * 500); // Display each toast half a second after the previous one
       });
      } else {
        toast.success(`You received ${pendingNotifications?.length} messages`);
      }
    }
  }, [pendingNotifications])

  

  useEffect(()=>{
    if (user) {
      //setting the url for the websocket
      dispatch(initializeWebSocket(user?.id));
      console.log("global websocket initializing");
    }
  }, [user])

  return (
    <PayPalScriptProvider options={initialOptions}>
      <Router>
        <Routes>

          {/* Protected Routes */}
          <Route path="/trainerDashboard" element={<ProtectedRoute><TrainerDashboard /></ProtectedRoute>}/>
          <Route path="/userProfile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>}/>
          <Route path="/chat" element={<ProtectedRoute><ChatWindow /></ProtectedRoute>}/>


          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/findTrainer" element={<FindTrainers />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/trainerPage/:id" element={<DashboardPage />} />
          <Route path="/trainer/profile" element={<TrainerHomePage />} />
          <Route path="/trainerRegister" element={<TrainerRegister />} />
          <Route path="/programDetails/:id" element={<ProgramDetails />} />
          <Route path="/programLesson/:id" element={<ProgramLesson />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminProtectedRoute>
                <AdminLayout title="Admin Panel" content="Admin panel">
                  <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="users" element={<Users />} />
                    <Route path="trainers" element={<Trainers />} />
                    <Route path="fitnessPrograms" element={<FitnessPrograms />}/>
                    <Route path="requestNotificaions" element={<ProgramApprovalRequests />}/></Routes>
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
        </Routes>

      </Router>
    </PayPalScriptProvider>
  );
}

export default App;
