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
    },
    getUsersForTag(teamId) {
        const url = `/team/users-for-tag/${teamId}`;
        return axiosClient.get(url);
    },
    getBoardsByTeam(teamId) {
        const url = `/team/boards-by-team/${teamId}`;
        return axiosClient.get(url);
    },
    updateTeam(payload) {
        const url = `/team`;
        return axiosClient.put(url, payload);
    },
    getTeamsRecommendForUser(userId) {
        const url = `/team/teams-recommend-user/${userId}`;
        return axiosClient.get(url);
    },
    leaveTeam(payload) {
        const url = '/participation';
        return axiosClient.delete(url, payload);
    }
};

export default teamApi;