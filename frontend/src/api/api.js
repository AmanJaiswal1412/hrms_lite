import axios from "axios";

const API = axios.create({
  baseURL: "https://hrms-lite-y4fp.onrender.com",
});

export default API;