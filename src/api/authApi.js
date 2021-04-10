import axiosClient from "./axiosClient";


const authApi = {
    socialLogin(data) {
        const url = '/account/social-login';
        return axiosClient.post(url, data);
    },
    register(data) {
        const url = '/account/register';
        return axiosClient.post(url, data);
    }
    ,
    login(data) {
        const url = '/account/authenticate';
        return axiosClient.post(url, data);
    },
    isLogin() {
        const url = '/account/is-login';
        return axiosClient.get(url);
    }
};

export default authApi;