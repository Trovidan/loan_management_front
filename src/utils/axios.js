import axios from "axios";
import cookie from "./cookie";
import dotenv from 'dotenv'
dotenv.config();

let BASE_URL = process.env.REACT_APP_BASE_URL

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'authorization': cookie.get("token",{path: '/'})
  }
});

export default instance;
