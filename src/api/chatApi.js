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
    checkDoubleExists(payload) {
        const url = `groupchat/check-double-exists`;
        return axiosClient.post(url, payload);
    },
    addChatWithMembers(payload) {
        const url = 'groupchat/add-with-members';
        return axiosClient.post(url, payload);
    }
};

export default chatApi;