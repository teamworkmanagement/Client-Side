import axiosClient from "./axiosClient";


const testApi = {
    getTest() {
        const url = '/test';
        return axiosClient.get(url);
    },
};

export default testApi;