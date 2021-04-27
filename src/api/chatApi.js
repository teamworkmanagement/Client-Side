import axiosClient from "./axiosClient";


const chatApi = {
    getAllGroupChatForUser(userId) {
        const url = `/GroupChat/byuserid/${userId}`;
        return axiosClient.get(url);
    },
    sendMes(payload) {
        const url = `chat/messages`;
        return axiosClient.post(url,payload);
    },
};

export default chatApi;