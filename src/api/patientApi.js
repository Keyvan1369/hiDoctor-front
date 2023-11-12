import api from "./api.js";

export const PatientApi = {
    search(search,limit) {
        return api.get("/patient/search",{params : {search,limit}})
    },
    searchDoctors(expertise) {
        return api.get(`/patient/searchDoctors/${expertise}`)
    },
}
