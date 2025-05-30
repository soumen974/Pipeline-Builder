import axios from "axios";
const API_link= process.env.REACT_APP_API_BASE_URL;
export const api = axios.create({
  baseURL: API_link,
  withCredentials: true
});

 