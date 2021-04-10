import { Redirect } from "react-router";
import authApi from "src/api/authApi";
import { setAuth } from "src/shared_components/views/pages/login/authSlice";
import store from '../../app/store';
import { createBrowserHistory as createHistory } from "history";

import axios from 'axios';
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

export const refreshToken = () => {
    fetch('https://localhost:9001/api/account/refresh', {
        method: 'POST',
        credentials: 'include',
    }).then(res => res.json())
        .then(json => {
            console.log('data khi  refresh là : ', json);
            if (json.data !== null)
                return true;
            if (!json.Succeeded) {
                store.dispatch(setAuth());
                //const history = createHistory();
                //history.push('/login');
                return false;
            }

        }).catch((error) => {
            store.dispatch(setAuth());
            return false;
            //const history = createHistory();
            //history.push('/login');
        });
        return false;
}

export const refreshTokenFunc = () => {
    return axiosClient.post("https://localhost:9001/api/account/refresh").then(function (response) {
        return response;
    });
}

/*export const refreshFunc = new Promise((resolve, reject) => {
    fetch('https://localhost:9001/api/account/refresh', {
        method: 'POST',
        credentials: 'include',
    }).then(res => res.json())
        .then(json => {
            console.log('data khi  refresh là : ', json);
            if (json.data !== null)
                return;
            if (!json.Succeeded) {
                store.dispatch(setAuth());
                return;
                //const history = createHistory();
                //history.push('/login');
            }
            resolve(true);
        }).catch((error) => {
            store.dispatch(setAuth());
            reject(error);
            //const history = createHistory();
            //history.push('/login');
        });
});*/