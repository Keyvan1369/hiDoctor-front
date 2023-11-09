import api from "./api.js";

export const AuthApi = {
    login(username, password) {
        return api.post("/auth/login", {username, password})
    },
    register(user) {
        return api.post("/auth/register", user)
    },
}
