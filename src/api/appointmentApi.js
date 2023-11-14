import api from "./api.js";

export const AppointmentApi = {
    create(body) {
        return api.post(`/appointment`,body)
    },
}
