import { Redirect } from "react-router";
import authApi from "src/api/authApi";
import { setAuth } from "src/shared_components/views/pages/login/authSlice";
import store from '../../app/store';
import { createBrowserHistory as createHistory } from "history";
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
                return;
            if (!json.Succeeded) {
                store.dispatch(setAuth());
                //const history = createHistory();
                //history.push('/login');
            }

        }).catch((error) => {
            store.dispatch(setAuth());
            //const history = createHistory();
            //history.push('/login');
        });
}