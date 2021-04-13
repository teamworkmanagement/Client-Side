import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../../utils/auth/index';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
    const status = useSelector(state => state.auth.loginStatus);
    return (
        <Route {...rest} render={props => (
            status && restricted ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
    );
};

export default PublicRoute;