import axiosClient from "./axiosClient";


const teamApi = {
    getAllUserByTeam(teamId) {
        const url = `/team/getalluser/${teamId}`;
        return axiosClient.get(url);
    },
    getAllTeamByUser(userId) {
        const url = `/team/byuserid/${userId}`;
        return axiosClient.get(url);
    },
    addTeam(params) {
        const url = '/team';
        return axiosClient.post(url, params);
    },
    joinTeam(params) {
        const url = '/team/join-team';
        return axiosClient.post(url, params);
    }
};

export default teamApi;