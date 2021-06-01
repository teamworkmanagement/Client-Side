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
    },
    changePassword(payload) {
        const url = '/account/change-password';
        return axiosClient.post(url, payload);
    },
    updateUserInfo(payload) {
        const url = '/account/update-info';
        return axiosClient.patch(url, payload);
    },
    forgotPassword(payload) {
        const url = '/account/forgot-password';
        return axiosClient.post(url, payload);
    },
    resetPassword(payload) {
        const url = '/account/reset-password';
        return axiosClient.post(url, payload);
    }
};

export default authApi;