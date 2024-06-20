import { logout, verifyEmail } from "features/user";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams} from "react-router-dom";
import Loader2 from "./Loader2";

const VerifyEmail = () => {
    const navigate = useNavigate()
    const params = useParams();
    const { token } = params; // Destructure token directly from params object
    const {verified} = useSelector(state=> state.user)

    const dispatch = useDispatch();

    useEffect(() => {
      // Dispatch the verifyEmail action with token as payload
      dispatch(logout());
      dispatch(verifyEmail({ token }));
      navigate("/login");
    }, []);


  // Your verification logic here (optional: send request to backend)
  // Update Redux store or application context

  return <div>{verified ? <Navigate to="/login" /> : <Loader2/>}</div>;
};
 export default VerifyEmail