import axiosClient from "src/api/axiosClient";
const TOKEN_KEY = 'access_token';


export const login = () => {
    localStorage.setItem(TOKEN_KEY, 'TestLogin');
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

export const isLogin = () => {

    return false;
}

export const refreshTokenFunc = () => {
    return axiosClient.post("/account/refresh").then(function (response) {
        return response;
    });
}

export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export const delete_cookie = (name) => {
    document.cookie = name + "=; Domain='ezteam.engineer'; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}