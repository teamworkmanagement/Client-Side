import axiosClient from "./axiosClient";


const appointmentApi = {
    createAppointment(payload) {
        const url = '/appointment';
        return axiosClient.post(url, payload);
    },
    deleteAppointment(appointmentId) {
        const url = `/appointment/${appointmentId}`;
        return axiosClient.delete(url);
    },
    getByTeam(teamId) {
        const url = `/appointment/team/${teamId}`;
        return axiosClient.get(url);
    },
    updateAppointment(payload) {
        const url = '/appointment';
        return axiosClient.put(url, payload);
    },
    getByUser() {
        const url = '/appointment/user';
        return axiosClient.get(url);
    }
};

export default appointmentApi;