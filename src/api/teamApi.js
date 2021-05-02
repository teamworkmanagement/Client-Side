import axiosClient from "./axiosClient";


const teamApi = {
    getAllUserByTeam(teamId) {
        const url = `/team/getalluser/${teamId}`;
        return axiosClient.get(url);
    },
    getAllTeamByUser(userId) {
        const url = `/team/byuserid/${userId}`;
        return axiosClient.get(url);
    }
};

export default teamApi;