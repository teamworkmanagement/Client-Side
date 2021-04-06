import axiosClient from "./axiosClient";


const postApi = {
    getAllForUser() {
        const url = '/post/allforuser?userId=8650b7fe-2952-4b03-983c-660dddda9029';
        return axiosClient.get(url);
    },
    getPagination(param) {
        const url = `/post?PageNumber=${param.pageNumber}&PageSize=${param.pageSize}`;
        return axiosClient.get(url);
    }
};

export default postApi;