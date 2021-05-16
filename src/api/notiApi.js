import axiosClient from "./axiosClient";


const notiApi = {
    getNoti(params) {
        const url = '/notification';
        return axiosClient.get(url, params);
    }
};

export default notiApi;