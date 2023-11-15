import api from "./api.js";

export const PatientApi = {
  search(search, limit) {
    return api.get("/patient/search", { params: { search, limit } });
  },
  searchDoctors(expertise) {
    return api.get(`/patient/searchDoctors/${expertise}`);
  },
  getDoctorById(id) {
    return api.get(`/patient/getDoctorDetail/${id}`);
  },
  getDoctorTimes(id, date) {
    return api.get(`/patient/getDoctorTimes/${id}`, { params: { date } });
  },
  getAppointments(date) {
    return api.get(`/patient/appointments/${date}`);
  },
};
