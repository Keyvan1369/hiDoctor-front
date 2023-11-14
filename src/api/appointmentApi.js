import api from "./api.js";

export const AppointmentApi = {
  get(date) {
    return api.get(`/appointment/${date}`);
  },
  create(body) {
    return api.post(`/appointment`, body);
  },
};
