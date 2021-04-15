import axiosClient from "./axiosClient";


const chatApi = {
    getAllGroupChatForUser(userId) {
        const url = `/GroupChat/byuserid/${userId}`;
        return axiosClient.get(url);
    },
};

export default chatApi;