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
import Test from "containers/Test";
import ProgrammesPage from "containers/ProgrammesPage";
import TrainerHomePage from "containers/TrainerHomePage";
import VerifyEmail from "components/VerifyEmail";
import ProtectedRoute from "components/ProtectedRoutes";
import TrainerRegister from "containers/TrainerRegister";
import ProgramDetails from "containers/ProgramDetails";
import ProgramLesson from "containers/ProgramLesson";
import TrainerDashboard from "containers/TrainerDashboard";
import Test1 from "containers/Test1";
import ChatWindow from "containers/ChatWindow";
import RoomSelection from "components/test/RoomSelection";
import ChatRoom2 from "components/test/ChatRoom2";
import { addNotification, addOnlineusers, closeWebSocket, getOnlineUserIds, initializeWebSocket, removeOnlineusers } from "features/webSocketSlice";
import { toast } from "react-toastify";
import { getNotifications } from "features/chat";


function App() {
  const dispatch = useDispatch();
  const { wsUrl } = useSelector((state) => state.websocket);
  const { user } = useSelector((state) => state.user);
  const { pendingNotifications } = useSelector((state) => state.chat);
  
  useEffect(() => {
    if (wsUrl) {
      const globalws = new WebSocket(wsUrl);
      globalws.onopen = () => {
        console.log("WebSocket connected in app.js");
      };
      globalws.onmessage = (event) => {
        const notification = JSON.parse(event.data);
        console.log("the notificaion", notification)
        if (notification.category === "message") {
          console.log("the notification is a message");
          toast.success(`${notification.sender}: ${notification.payload}`);
          dispatch(addNotification(notification));
        } else if (notification.category === "status") {
          console.log("the notification is a message");
          toast.success(`${notification.sender}: ${notification.payload}`);
          if (notification.payload === "user Online") {
            console.log("User online", notification.message);
            dispatch(addOnlineusers(notification.sender));
          } else if (notification.payload === "user Offline") {
            console.log("User offline", notification.message);
            dispatch(removeOnlineusers(notification.sender));
          }

        }
      };
      globalws.onclose = () => {
        console.log("Global WebSocket disconnected");
        dispatch(closeWebSocket());
      };
      return () => {
        globalws.close();
      };
    }
  }, [wsUrl]);

  useEffect(() => {
    // console.log("checking authenticaion")
    dispatch(checkAuth());
  }, []);
  
  useEffect(() => {
    console.log("dispatching online users")
    dispatch(getOnlineUserIds());
  }, []);

  useEffect(() => {
    // console.log("about to trigger getNotification")
    dispatch(getNotifications());
  }, [user]);
  
  useEffect(()=>{
    if (pendingNotifications) {
      console.log("this is the pending notificaions : ", pendingNotifications);
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
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trainerPage/:id" element={<DashboardPage />} />
        {/* <Route path="/trainerDashboard" element={<TrainerDashboard />} /> */}
        <Route
          path="/trainerDashboard"
          element={
            <ProtectedRoute>
              <TrainerDashboard />
            </ProtectedRoute>
          }
        />
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
        <Route path="/trainerRegister" element={<TrainerRegister />} />
        <Route path="/findTrainer" element={<FindTrainers />} />
        <Route path="/programmes" element={<ProgrammesPage />} />
        <Route path="/trainer/profile" element={<TrainerHomePage />} />
        <Route path="*" element={<NotFoundPage />} />
        {/* <Route path="/chattest" element={<Test />} /> */}
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/programDetails/:id" element={<ProgramDetails />} />
        <Route path="/programLesson/:id" element={<ProgramLesson />} />
        <Route path="/chat" element={<ChatWindow />} />
      </Routes>
    </Router>
  );
}

export default App;
