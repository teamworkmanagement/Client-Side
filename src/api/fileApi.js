import axiosClient from "./axiosClient";

const fileApi = {
    addFile(payload) {
        const url = `/file`;
        return axiosClient.post(url, payload);
    },
    getFile(payload) {
        const url = `/file`;
        return axiosClient.get(url, payload);
    },
    getAll(payload) {
        const url = `/file/get-all`;
        return axiosClient.get(url, payload);
    },
    copyFile(payload) {
        const url = '/file/copy-file';
        return axiosClient.post(url, payload);
    }
};

export default fileApi;