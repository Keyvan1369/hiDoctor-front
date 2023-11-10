import api from "./api.js";

export const ExpertiseApi = {
    getAll() {
        return api.get("/expertise")
    },
}
