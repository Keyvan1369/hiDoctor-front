import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3023/api",
    headers: {
        token: localStorage.getItem("token")
    }
})

api.interceptors.response.use(value => value, error => {
    console.log(error)
    if (error?.response?.data?.message)
        return Promise.reject(new Error(error.response.data.message))
    else return Promise.reject(error)
})

export default api;
