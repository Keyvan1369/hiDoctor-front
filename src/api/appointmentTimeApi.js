import api from "./api.js";

export const AppointmentTimeApi = {
    getAll(date) {
        return api.get(`/appointmentTime/${date}`)
    },
    create(date,times) {
        return api.post(`/appointmentTime`,{date,times})
    },
}
