import axiosClient from "./axiosClient";


const notiApi = {
    getNoti(params) {
        const url = '/notification';
        return axiosClient.get(url, params);
    },
    readNoti(payload) {
        const url = '/notification/read-noti';
        return axiosClient.post(url, payload);
    }
};

export default notiApi;