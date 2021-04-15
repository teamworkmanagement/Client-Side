import axiosClient from "./axiosClient";


const messageApi = {
    getPagination(params) {
        const url = '/message';
        return axiosClient.get(url, params);
    },
};

export default messageApi;