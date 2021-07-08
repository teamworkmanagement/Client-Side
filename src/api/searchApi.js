import axiosClient from "./axiosClient";

const searchApi = {
    searchBoards(params) {
        const url = "/search/boards";
        return axiosClient.get(url, params);
    },

    searchTasks(params) {
        const url = "/search/tasks";
        return axiosClient.get(url, params);
    },
    searchTeams(params) {
        const url = "/search/teams";
        return axiosClient.get(url, params);
    },
    searchChats(params) {
        const url = "/search/chats";
        return axiosClient.get(url, params);
    }
};

export default searchApi;