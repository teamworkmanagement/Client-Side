import axiosClient from "./axiosClient";


const userApi = {
    getAllUserInTeam(params) {
        const url = '/user/getuser-inteam';
        return axiosClient.get(url, params);
    },
    searchUser(params) {
        const url = `/user/search-user`;
        return axiosClient.get(url, params);
    },
    searchAddUserChatExists(params) {
        const url = '/user/search-user-add-chat';
        return axiosClient.get(url, params);
    },
    getById(userId) {
        const url = `/user/${userId}`;
        return axiosClient.get(url);
    }
};

export default userApi;