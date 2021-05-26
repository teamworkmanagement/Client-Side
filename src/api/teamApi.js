import axiosClient from "./axiosClient";


const teamApi = {
    getAdmin(teamId) {
        const url = `/team/get-admin/${teamId}`;
        return axiosClient.get(url);
    },
    getTeam(teamId) {
        const url = `/team/${teamId}`;
        return axiosClient.get(url);
    },
    getUsersPagingByTeam(params) {
        const url = `/team/getusers-paging`;
        return axiosClient.get(url, params);
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
    },
    inviteUser(params) {
        const url = '/participation';
        return axiosClient.post(url, params);
    }
};

export default teamApi;