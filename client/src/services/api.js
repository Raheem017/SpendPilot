import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const generateAudit = async (data) => {
  const response = await API.post(
    "/audit",
    data
  );

  return response.data;
};