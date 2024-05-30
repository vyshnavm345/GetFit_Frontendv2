import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { API_URL } from "config";


const baseURL = API_URL;
// const baseURL = "http://127.0.0.1:8000";

// const getAccessToken = () => Cookies.get("accessToken") || null;
let authToken = Cookies.get("accessToken") || null;
let refreshToken = Cookies.get('refreshToken') || null;

const setAuthHeader = () => ({
  Authorization: `Bearer ${authToken}`,
});
const axiosInstance = axios.create({
  baseURL,
  headers: setAuthHeader()
});

axiosInstance.interceptors.request.use(async req =>{
  
    authToken = Cookies.get("accessToken") || null;
    req.headers.Authorization = `Bearer ${authToken}`;

  const user = jwtDecode(authToken);
  const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  if (isExpired){

      const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: refreshToken
      });
      Cookies.remove("accessToken");
     
      Cookies.set("accessToken", response.data.access, { expires: 7 });
      req.headers.Authorization = `Bearer ${response.data.access}`;
  }

  if (req.url === "/api/token/verify/") {
      req = {
        ...req,
        data: {
          token: Cookies.get("accessToken"),
        },
      };
  }
  return req
})
export default axiosInstance;