import axiosClient from "./axiosClient";


const chatApi = {
    getGroupChatForUser(params) {
        const url = `/GroupChat/byuserid`;
        return axiosClient.get(url, params);
    },
    sendMes(payload) {
        const url = `chat/messages`;
        return axiosClient.post(url, payload);
    },
};

export default chatApi;