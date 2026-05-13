import axios from "axios";

const API = axios.create({
  baseURL: "https://spendpilot-lzs3.onrender.com/api",
});

export default API;
