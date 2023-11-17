import axios from "axios";


console.log();
const api = axios.create({
    baseURL: process.env.NODE_ENV==="development"? "http://localhost:3011/api":"/api",
    headers: {
        token: localStorage.getItem("token")
    }
})

api.interceptors.response.use(value => value, error => {
    if (error?.response?.data?.message)
        return Promise.reject(new Error(error.response.data.message))
    else return Promise.reject(error)
})

export default api;
