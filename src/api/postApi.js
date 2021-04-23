import axiosClient from "./axiosClient";


const postApi = {
    getAllForUser() {
        const url = '/post/allforuser?userId=8650b7fe-2952-4b03-983c-660dddda9029';
        return axiosClient.get(url);
    },
    getPagination(params) {
        const url = `/post/paging-multi`;
        return axiosClient.get(url, params);
    },
    reactPost(params) {
        const url = '/post/add-react';
        return axiosClient.post(url, params);
    },
    deleteReactPost(params) {
        const url = '/post/delete-react';
        return axiosClient.delete(url, params);
    }
};

export default postApi;