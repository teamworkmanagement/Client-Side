import axiosClient from "./axiosClient";


const userApi = {
    getAllUserInTeam(params) {
        const url = '/user/getuser-inteam';
        return axiosClient.get(url, params);
    },
};

export default userApi;