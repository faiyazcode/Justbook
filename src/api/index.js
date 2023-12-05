import axios from "axios"

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
})

api.interceptors.request.use(
    async config => {
      config.headers = { 
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
        "apikey":"indusAltaR2PSM",
        "Content-Type":"application/json"
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });